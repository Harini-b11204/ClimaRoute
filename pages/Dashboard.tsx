
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Layout';
import { CloudRain, Navigation, Truck, AlertTriangle, Clock, Activity, MapPin, Bell } from 'lucide-react';
import { mockApi } from '../services/mockApiService';
import { DeliveryRecord, NotificationItem } from '../types';

export default function Dashboard() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [lastTrip, setLastTrip] = useState<DeliveryRecord | null>(null);

  useEffect(() => {
    // Load summary data
    const loadData = async () => {
      const notifs = await mockApi.getNotifications();
      const history = await mockApi.getDeliveryHistory();
      setNotifications(notifs.slice(0, 3)); // Top 3
      setLastTrip(history[0] || null);
    };
    loadData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500">Overview of your current route and status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Map Area */}
        <div className="md:col-span-8 space-y-6">
          <Card 
            onClick={() => navigate('/re-routing')} 
            className="h-[400px] relative overflow-hidden p-0 flex flex-col cursor-pointer hover:ring-4 hover:ring-blue-200"
          >
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm z-10 text-sm font-medium text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live Tracking
            </div>
            <div className="flex-1 bg-gray-100 flex items-center justify-center relative">
               {/* Simulated Map Visuals */}
               <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
               <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }}>
                  <path d="M 200 350 Q 300 250 450 300 T 700 200" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="10 5" className="animate-[dash_20s_linear_infinite]" />
                  <circle cx="200" cy="350" r="8" fill="#3b82f6" />
                  <circle cx="700" cy="200" r="8" fill="#ef4444" />
               </svg>
               <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center z-10">
                  <MapPin className="text-blue-500 mb-2" size={32} />
                  <span className="font-bold text-gray-700">En Route to Seattle</span>
               </div>
            </div>
          </Card>

          {/* SOS Alert Card (Bottom Left of Map Area context) */}
          <Card 
            onClick={() => navigate('/sos')} 
            className="bg-red-50 border-l-4 border-red-500 cursor-pointer hover:bg-red-100"
          >
             <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-full text-red-600">
                   <AlertTriangle size={24} />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-red-700">Emergency Status: Normal</h3>
                   <p className="text-red-600/80 text-sm mt-1">Vehicle monitoring active. Press here or SOS in sidebar for emergencies.</p>
                   <div className="mt-2 text-xs font-mono bg-red-100/50 inline-block px-2 py-1 rounded text-red-800">
                      Last Check: Just now
                   </div>
                </div>
             </div>
          </Card>
        </div>

        {/* Right Side Widgets */}
        <div className="md:col-span-4 space-y-6">
          
          <Card 
            title="Latest Notifications" 
            onClick={() => navigate('/notifications')} 
            className="cursor-pointer hover:bg-blue-50/50"
          >
             <div className="space-y-4">
               {notifications.length === 0 ? (
                 <p className="text-sm text-gray-400">Loading alerts...</p>
               ) : (
                 notifications.map((notif) => (
                   <div key={notif.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${notif.category === 'Critical' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                      <div>
                         <p className="text-sm font-medium text-gray-800 line-clamp-1">{notif.title}</p>
                         <p className="text-xs text-gray-500 mt-1">{notif.timestamp}</p>
                      </div>
                   </div>
                 ))
               )}
             </div>
          </Card>

          <Card 
            title="Last Delivery" 
            onClick={() => navigate('/history')}
            className="cursor-pointer hover:bg-blue-50/50"
          >
             {lastTrip ? (
               <>
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{lastTrip.id}</span>
                    <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">{lastTrip.status}</span>
                 </div>
                 <p className="font-medium text-gray-800 truncate">{lastTrip.destination}</p>
                 <p className="text-xs text-gray-400">{lastTrip.date}, {lastTrip.time}</p>
               </>
             ) : (
               <p className="text-sm text-gray-400">Loading history...</p>
             )}
          </Card>

          <Card 
            onClick={() => navigate('/adaptive-speed')} 
            className="cursor-pointer hover:bg-blue-50/50"
          >
            <div className="flex items-center gap-3 mb-3">
               <Activity className="text-purple-500" size={20} />
               <h3 className="font-semibold text-gray-700">Adaptive Speed</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900">45 <span className="text-base font-normal text-gray-500">mph</span></div>
            <p className="text-xs text-gray-500 mt-1">Reduced visibility due to fog.</p>
          </Card>

          <div className="grid grid-cols-2 gap-4">
             <Card 
               onClick={() => navigate('/eta')} 
               className="!p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 active:scale-95"
             >
                <Clock className="text-blue-500 mb-2" size={20} />
                <span className="text-xs text-gray-400 uppercase font-bold">ETA</span>
                <span className="font-bold text-gray-800">2h 15m</span>
             </Card>
             <Card 
               onClick={() => navigate('/weather')} 
               className="!p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 active:scale-95"
             >
                <CloudRain className="text-blue-500 mb-2" size={20} />
                <span className="text-xs text-gray-400 uppercase font-bold">Temp</span>
                <span className="font-bold text-gray-800">68°F</span>
             </Card>
          </div>

        </div>
      </div>
    </>
  );
}