
import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Select } from '../components/Layout';
import { Map as MapIcon, RotateCcw, ArrowRight, Eye, Leaf, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockApi } from '../services/mockApiService';
import { DeliveryRecord, RouteSegment, SpeedDataPoint } from '../types';

// --- Dynamic Re-Routing Page ---
export function ReRouting() {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
       <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Dynamic Re-Routing</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Left Map View */}
        <div className="lg:col-span-2 bg-gray-200 rounded-xl overflow-hidden relative shadow-inner min-h-[400px]">
           <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <MapIcon size={64} className="text-gray-300" />
              <p className="absolute mt-24 text-gray-400 font-medium">Interactive Route Map Visualization</p>
           </div>
           {/* Overlay Route Line Placeholder */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <polyline points="100,100 200,300 400,250 600,400" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
           </svg>
        </div>

        {/* Right Controls */}
        <Card title="Route Adjustment Controls" className="h-fit">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Origin</label>
              <Input defaultValue="Seattle, WA" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Destination</label>
              <Input defaultValue="Portland, OR" />
            </div>
            <div>
               <label className="text-xs font-semibold text-gray-500 uppercase">Delivery Date/Time</label>
               <Input type="datetime-local" />
            </div>
             <div>
               <label className="text-xs font-semibold text-gray-500 uppercase">Max Tolerance (miles)</label>
               <div className="flex gap-2 items-center">
                  <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 w-12 text-right">15 mi</span>
               </div>
            </div>

            <div className="space-y-2 pt-2">
               <label className="text-xs font-semibold text-gray-500 uppercase">Risk Factors</label>
               <div className="flex flex-wrap gap-2">
                  {['Rain', 'Snow', 'Fog', 'Ice'].map(weather => (
                     <label key={weather} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 cursor-pointer hover:bg-gray-100">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                        {weather}
                     </label>
                  ))}
               </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
               <Button className="w-full justify-center">Generate Optimized Route</Button>
               <button className="text-sm text-gray-500 hover:text-gray-700 underline text-center">Clear Route</button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// --- Delivery History Page ---
export function History() {
   const [history, setHistory] = useState<DeliveryRecord[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      mockApi.getDeliveryHistory().then(data => {
         setHistory(data);
         setLoading(false);
      });
   }, []);

   const getStatusStyle = (status: string) => {
      switch(status) {
         case 'Completed': return 'bg-green-100 text-green-700';
         case 'In Progress': return 'bg-blue-100 text-blue-700';
         case 'Delayed': return 'bg-red-100 text-red-700';
         default: return 'bg-gray-100 text-gray-700';
      }
   };

   return (
      <div className="space-y-6">
         <h2 className="text-2xl font-bold text-gray-800">Delivery History</h2>
         <Card className="overflow-hidden !p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-gray-50 border-b border-gray-100">
                        {['Date', 'Time', 'Route ID', 'Origin', 'Destination', 'Weather', 'Dist.', 'Status', 'Actions'].map(h => (
                           <th key={h} className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {loading ? (
                        <tr><td colSpan={9} className="text-center py-8 text-gray-500">Loading records...</td></tr>
                     ) : history.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{row.date}</td>
                           <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{row.time}</td>
                           <td className="px-6 py-4 text-sm font-mono text-gray-600 font-medium">{row.id}</td>
                           <td className="px-6 py-4 text-sm text-gray-700">{row.origin}</td>
                           <td className="px-6 py-4 text-sm text-gray-700">{row.destination}</td>
                           <td className="px-6 py-4 text-sm text-gray-700 flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${['Sunny', 'Clear'].includes(row.weather) ? 'bg-yellow-400' : 'bg-blue-400'}`}></span>
                              {row.weather}
                           </td>
                           <td className="px-6 py-4 text-sm text-gray-700">{row.distance}</td>
                           <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusStyle(row.status)}`}>
                                 {row.status}
                              </span>
                           </td>
                           <td className="px-6 py-4">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="bg-blue-50 px-6 py-3 flex justify-between items-center border-t border-blue-100">
               <button className="text-sm text-blue-600 font-medium disabled:opacity-50">Previous</button>
               <span className="text-xs font-medium text-blue-800">Page 1 of 5</span>
               <button className="text-sm text-blue-600 font-medium">Next</button>
            </div>
         </Card>
      </div>
   );
}

// --- Adaptive Speed Page ---
export function AdaptiveSpeed() {
   const [segments, setSegments] = useState<RouteSegment[]>([]);
   const [trendData, setTrendData] = useState<SpeedDataPoint[]>([]);
   const [currentRec, setCurrentRec] = useState(0);
   const [impact, setImpact] = useState<any>({});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      mockApi.getSpeedAnalytics().then(data => {
         setSegments(data.segments);
         setTrendData(data.trend);
         setCurrentRec(data.currentRec);
         setImpact(data.impact);
         setLoading(false);
      });
   }, []);

   return (
      <div className="space-y-6">
         <h2 className="text-2xl font-bold text-gray-800">Adaptive Speed Recommendations</h2>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Route Segment Speed Details" className="flex flex-col">
               <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="text-xs text-gray-500 uppercase border-b border-gray-100">
                           <th className="pb-3 pl-2">Segment</th>
                           <th className="pb-3">Type</th>
                           <th className="pb-3">Current</th>
                           <th className="pb-3">Rec.</th>
                           <th className="pb-3 text-right pr-2">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {loading ? (
                           <tr><td colSpan={5} className="text-center py-4">Loading segments...</td></tr>
                        ) : segments.map(seg => (
                           <tr key={seg.id} className="text-sm hover:bg-gray-50">
                              <td className="py-3 pl-2 font-medium text-gray-800">{seg.name}</td>
                              <td className="py-3 text-gray-600">{seg.roadType}</td>
                              <td className="py-3 text-gray-600">{seg.currentSpeed} mph</td>
                              <td className="py-3 font-bold text-blue-600">{seg.recommendedSpeed} mph</td>
                              <td className="py-3 text-right pr-2">
                                 <button className="text-gray-400 hover:text-blue-600"><Eye size={16}/></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </Card>

            <div className="flex flex-col gap-6">
               <Card className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500 text-white relative overflow-hidden">
                  <div className="absolute right-[-20px] top-[-20px] bg-white/10 w-32 h-32 rounded-full"></div>
                  <div className="z-10">
                     <p className="text-blue-100 text-sm font-medium mb-1">Current Recommended Speed</p>
                     <h3 className="text-5xl font-bold flex items-baseline gap-2">
                        {loading ? '--' : currentRec} <span className="text-2xl font-normal opacity-80">mph</span>
                     </h3>
                     <p className="text-xs text-blue-200 mt-2 flex items-center gap-1">
                        <AlertCircle size={12} /> Optimization active due to rain
                     </p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm z-10">
                     <RotateCcw size={32} className="text-white" />
                  </div>
               </Card>

               <Card title="Environmental Impact Score">
                  {loading ? (
                     <div className="h-24 animate-pulse bg-gray-100 rounded"></div>
                  ) : (
                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                              <Leaf size={20} />
                           </div>
                           <div>
                              <p className="text-sm text-gray-500">Fuel Saved</p>
                              <p className="text-lg font-bold text-gray-800">{impact.fuelSaved} Gallons</p>
                           </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                           <div className="bg-green-500 h-2 rounded-full w-[70%]"></div>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                           <li>CO₂ emissions reduced by {impact.co2Reduced}%</li>
                           <li>Engine strain reduced by {impact.engineStrain}%</li>
                        </ul>
                     </div>
                  )}
               </Card>
            </div>
         </div>

         <Card title="Speed Adjustment Trend (Last 24h)">
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                     <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} unit=" mph"/>
                     <Tooltip 
                        contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                        labelStyle={{fontWeight: 'bold', color: '#374151'}}
                     />
                     <Legend wrapperStyle={{paddingTop: '20px'}}/>
                     <Line name="Actual Speed" type="monotone" dataKey="speed" stroke="#9ca3af" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                     <Line name="Optimized Speed" type="monotone" dataKey="optimized" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </Card>
      </div>
   );
}
