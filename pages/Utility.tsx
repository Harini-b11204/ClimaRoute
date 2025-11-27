
import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Select } from '../components/Layout';
import { 
   Cloud, Sun, CloudRain, Wind, Droplets, MapPin, 
   Bell, AlertCircle, Info, CheckCircle, 
   Clock, Calculator, 
   Coffee, Anchor, Truck, 
   AlertTriangle, Phone, ShieldAlert, Wrench, Activity, CloudFog, CloudLightning
} from 'lucide-react';
import { getGeminiWeatherInsight } from '../services/geminiService';
import { mockApi } from '../services/mockApiService';
import { NotificationItem, RestPointItem } from '../types';

// --- Weather Prediction Page ---
export function Weather() {
   const [insight, setInsight] = useState<string>("");
   const [loadingInsight, setLoadingInsight] = useState(false);
   const [weatherData, setWeatherData] = useState<any>(null);

   useEffect(() => {
      mockApi.getWeatherForecast().then(setWeatherData);
   }, []);

   const handleGetInsight = async () => {
      if (!weatherData) return;
      setLoadingInsight(true);
      const conditions = `${weatherData.current.temp}°F, ${weatherData.current.condition}, ${weatherData.current.humidity}% Humidity`;
      const result = await getGeminiWeatherInsight("New York, USA", conditions);
      setInsight(result);
      setLoadingInsight(false);
   };

   const getWeatherIcon = (condition: string, size = 24, className = "") => {
      switch(condition) {
         case 'Sunny': return <Sun size={size} className={`text-yellow-500 ${className}`} />;
         case 'Rain': return <CloudRain size={size} className={`text-blue-500 ${className}`} />;
         case 'Storm': return <CloudLightning size={size} className={`text-purple-600 ${className}`} />;
         case 'Fog': return <CloudFog size={size} className={`text-gray-400 ${className}`} />;
         default: return <Cloud size={size} className={`text-gray-400 ${className}`} />;
      }
   };

   if (!weatherData) return <div className="p-8 text-center text-gray-500">Loading weather data...</div>;

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Weather Prediction</h2>
            <Select className="w-48 !py-1">
               <option>New York, USA</option>
               <option>London, UK</option>
               <option>Tokyo, JP</option>
            </Select>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="flex flex-col justify-between">
               <div className="flex justify-between items-start">
                  <div>
                     <h3 className="text-6xl font-bold text-gray-800">{weatherData.current.temp}°F</h3>
                     <p className="text-xl text-gray-500 mt-2">{weatherData.current.condition}</p>
                  </div>
                  {getWeatherIcon(weatherData.current.condition, 96)}
               </div>
               <div className="flex gap-6 mt-8">
                  <div className="flex items-center gap-2 text-gray-600">
                     <Droplets size={18} /> <span>{weatherData.current.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                     <Wind size={18} /> <span>{weatherData.current.wind} mph</span>
                  </div>
               </div>
               
               {/* Gemini Integration */}
               <div className="mt-6 pt-4 border-t border-gray-100">
                  <Button onClick={handleGetInsight} variant="outline" className="w-full text-xs mb-2">
                     {loadingInsight ? "Analyzing..." : "Analyze Risks with Gemini AI"}
                  </Button>
                  {insight && (
                     <div className="bg-purple-50 p-3 rounded-lg text-sm text-purple-800 border border-purple-100 animate-fade-in">
                        <strong>AI Insight:</strong> {insight}
                     </div>
                  )}
               </div>
            </Card>

            <div className="space-y-6">
               <Card title="Hourly Forecast">
                  <div className="flex justify-between overflow-x-auto pb-2 gap-4">
                     {weatherData.hourly.map((h: any, i: number) => (
                        <div key={i} className="flex flex-col items-center min-w-[60px]">
                           <span className="text-xs text-gray-500 mb-2">{h.time}</span>
                           {getWeatherIcon(h.condition, 24, "mb-2")}
                           <span className="font-bold text-gray-700">{h.temp}°</span>
                        </div>
                     ))}
                  </div>
               </Card>
               <Card title="Daily Forecast" className="!p-4">
                  <div className="space-y-3">
                     {weatherData.daily.map((d: any, i: number) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                           <span className="text-gray-600 w-12">{d.day}</span>
                           <div className="flex-1 px-4 flex items-center gap-2">
                              {getWeatherIcon(d.condition, 16)}
                              <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                 <div className="bg-gradient-to-r from-blue-300 to-yellow-300 w-full h-full" style={{width: '70%'}}></div>
                              </div>
                           </div>
                           <span className="font-medium text-gray-800 w-16 text-right">{d.min}° / {d.max}°</span>
                        </div>
                     ))}
                  </div>
               </Card>
            </div>
         </div>

         <Card className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <MapPin className="text-gray-400 mb-2 z-10" size={32} />
            <span className="text-gray-500 font-medium z-10">View Weather Map & Severe Alerts</span>
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
         </Card>
      </div>
   );
}

// --- Notification System Page ---
export function Notifications() {
   const [notifications, setNotifications] = useState<NotificationItem[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      mockApi.getNotifications().then(data => {
         setNotifications(data);
         setLoading(false);
      });
   }, []);

   const NotificationCard = ({ notif }: { notif: NotificationItem }) => {
      const styles: any = {
         Critical: "border-l-4 border-red-500 bg-red-50",
         Route: "border-l-4 border-blue-500 bg-blue-50",
         Status: "border-l-4 border-green-500 bg-green-50",
         System: "border-l-4 border-gray-400 bg-gray-50",
         General: "border-l-4 border-gray-200 bg-white"
      };
      const icons: any = {
         Critical: <AlertTriangle className="text-red-500" />,
         Route: <MapPin className="text-blue-500" />,
         Status: <CheckCircle className="text-green-500" />,
         System: <Wrench className="text-gray-500" />,
         General: <Bell className="text-gray-500" />
      };

      return (
         <div className={`p-4 rounded-lg shadow-sm mb-4 transition-all hover:shadow-md ${styles[notif.category] || styles.General} flex items-start gap-4`}>
            <div className="mt-1">{icons[notif.category] || icons.General}</div>
            <div className="flex-1">
               <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-800">{notif.title}</h4>
                  <span className="text-xs text-gray-500">{notif.timestamp}</span>
               </div>
               <p className="text-sm text-gray-600 mt-1">{notif.description}</p>
               <button className="text-xs font-semibold uppercase mt-2 hover:underline text-gray-500 hover:text-gray-800">View Details</button>
            </div>
         </div>
      );
   };

   return (
      <div className="max-w-3xl">
         <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification System</h2>
         
         {loading ? (
            <div className="text-gray-500">Loading notifications...</div>
         ) : (
            <div className="space-y-6">
               {/* Group by category for display structure from prompt */}
               {['Critical', 'Route', 'Status', 'System', 'General'].map(cat => {
                  const items = notifications.filter(n => n.category === cat);
                  if (items.length === 0) return null;
                  return (
                     <div key={cat}>
                        <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">{cat} Alerts</h3>
                        {items.map(n => <NotificationCard key={n.id} notif={n} />)}
                     </div>
                  )
               })}
            </div>
         )}
      </div>
   );
}

// --- ETA Calculation Page ---
export function ETACalculator() {
   return (
      <div className="space-y-6">
         <h2 className="text-2xl font-bold text-gray-800">Estimate Delivery Time</h2>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Route Details">
               <div className="space-y-4">
                  <Input placeholder="Origin Address" />
                  <Input placeholder="Destination Address" />
                  <div className="relative">
                     <Input placeholder="Distance" type="number" />
                     <span className="absolute right-3 top-2 text-gray-400 text-sm">miles</span>
                  </div>
               </div>
            </Card>

            <Card title="Vehicle & Load">
               <div className="space-y-4">
                  <Select>
                     <option>Heavy Truck (Class 8)</option>
                     <option>Van</option>
                  </Select>
                  <div className="relative">
                     <Input placeholder="Avg Speed" />
                     <span className="absolute right-3 top-2 text-gray-400 text-sm">mph</span>
                  </div>
                  <Input placeholder="Load Weight (lbs)" />
               </div>
            </Card>

            <Card title="Environmental Factors">
               <div className="space-y-4">
                  <Select>
                     <option>Clear Sky</option>
                     <option>Rain</option>
                     <option>Snow</option>
                     <option>Fog</option>
                  </Select>
                  <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
                     Note: Weather conditions automatically adjust the ETA buffer by up to 25%.
                  </p>
               </div>
            </Card>
         </div>

         <div className="flex justify-center pt-8">
            <Button className="px-12 py-3 text-lg font-bold shadow-xl shadow-blue-200">
               Calculate Estimated Time
            </Button>
         </div>
      </div>
   );
}

// --- Rest Point Alert Page ---
export function RestPoint() {
   const [results, setResults] = useState<RestPointItem[]>([]);
   const [loading, setLoading] = useState(false);
   const [hasSearched, setHasSearched] = useState(false);

   const handleSearch = async () => {
      setLoading(true);
      setHasSearched(true);
      const data = await mockApi.searchRestPoints({});
      setResults(data);
      setLoading(false);
   };

   return (
      <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
         <h2 className="text-2xl font-bold text-gray-800">Weather-Aware Rest Point Alert</h2>
         
         <div className="h-64 bg-gray-200 rounded-xl relative overflow-hidden shadow-inner group shrink-0">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-20"></div>
             {/* Fake Map Pins */}
            <div className="absolute top-1/2 left-1/3 text-blue-600 animate-bounce"><MapPin size={32} fill="currentColor" /></div>
            <div className="absolute top-1/3 left-1/2 text-gray-400"><Coffee size={24} /></div>
            <div className="absolute bottom-1/3 right-1/4 text-gray-400"><Coffee size={24} /></div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
            <Card className="lg:col-span-1 h-fit">
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Filter Location</label>
                     <Select><option>Current Location</option><option>Along Route</option></Select>
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Safety Rating</label>
                     <Select><option>High Safety</option><option>Medium</option></Select>
                  </div>

                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Facilities</label>
                      <div className="flex flex-col gap-1">
                         {['Restrooms', 'Parking', 'Food', 'Fuel'].map(f => (
                            <label key={f} className="flex items-center gap-2 text-sm text-gray-600">
                               <input type="checkbox" className="rounded text-blue-600" defaultChecked /> {f}
                            </label>
                         ))}
                      </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Recommendations</label>
                     <div className="space-y-2">
                        <label className="flex items-center gap-2 p-2 rounded border border-blue-200 bg-blue-50 cursor-pointer">
                           <input type="radio" name="area" defaultChecked />
                           <span className="text-sm font-medium text-blue-800">Area A (Nearest)</span>
                        </label>
                        <label className="flex items-center gap-2 p-2 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer">
                           <input type="radio" name="area" />
                           <span className="text-sm font-medium text-gray-700">Area B (Safest)</span>
                        </label>
                     </div>
                  </div>

                  <Button className="w-full mt-4" onClick={handleSearch} disabled={loading}>
                     {loading ? 'Finding...' : 'Find Break Area'}
                  </Button>
               </div>
            </Card>

            {/* Results List */}
            <div className="lg:col-span-2 overflow-y-auto">
               {!hasSearched ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                     <Coffee size={48} className="mb-4 opacity-50" />
                     <p>Select filters and click Find Break Area</p>
                  </div>
               ) : (
                  <div className="space-y-4">
                     {results.map(spot => (
                        <Card key={spot.id} className="!p-4 flex flex-col md:flex-row gap-4 hover:border-blue-300 border border-transparent transition-all">
                           <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                              {spot.type.includes('Truck') ? <Truck size={32} /> : <Coffee size={32} />}
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between items-start">
                                 <div>
                                    <h4 className="font-bold text-gray-800 text-lg">{spot.name}</h4>
                                    <p className="text-sm text-gray-500">{spot.type} • {spot.distance} away</p>
                                 </div>
                                 <span className={`px-2 py-1 text-xs font-bold rounded ${spot.safetyRating === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {spot.safetyRating} Safety
                                 </span>
                              </div>
                              <div className="mt-3 flex flex-wrap gap-2">
                                 {spot.facilities.map(f => (
                                    <span key={f} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{f}</span>
                                 ))}
                              </div>
                           </div>
                           <div className="flex flex-col justify-center gap-2 min-w-[100px]">
                              <Button className="w-full text-sm py-1">Navigate</Button>
                              <Button variant="outline" className="w-full text-sm py-1">Details</Button>
                           </div>
                        </Card>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

// --- SOS Alert Page ---
export function SOS() {
   const [active, setActive] = useState(false);

   const SOSButton = ({ icon: Icon, label, desc }: any) => (
      <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-red-300 hover:bg-red-50 transition-all group h-full">
         <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
            <Icon size={32} />
         </div>
         <h3 className="text-lg font-bold text-gray-800 mb-1">{label}</h3>
         <p className="text-xs text-gray-500 text-center">{desc}</p>
      </button>
   );

   return (
      <div className="h-[calc(100vh-140px)] flex flex-col">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-red-100 rounded-lg text-red-600"><AlertTriangle /></div>
             <h2 className="text-2xl font-bold text-gray-800">SOS Alert for Emergency</h2>
          </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
            {/* Left Controls */}
            <Card className="lg:col-span-1 h-fit space-y-8 border-l-4 border-red-500">
               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Vehicle Stopped Time</label>
                  <div className="text-3xl font-mono text-gray-800 bg-gray-100 p-4 rounded text-center">
                     00:00:00
                  </div>
               </div>

               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-2">System Status</label>
                  <div className={`p-4 rounded-lg flex items-center gap-3 ${active ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                     <span className={`w-3 h-3 rounded-full ${active ? 'bg-red-600 animate-ping' : 'bg-green-600'}`}></span>
                     <span className="font-bold">{active ? 'EMERGENCY ACTIVE' : 'Monitoring Safe'}</span>
                  </div>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="font-medium text-gray-700">Break Mode</span>
                  <button 
                     onClick={() => setActive(!active)} 
                     className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${active ? 'bg-red-500' : 'bg-gray-300'}`}
                  >
                     <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
               </div>
            </Card>

            {/* Right Buttons Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
               <SOSButton icon={Activity} label="Health Issue" desc="Driver incapacitated or medical emergency." />
               <SOSButton icon={ShieldAlert} label="Theft / Security" desc="Cargo theft attempt or security breach." />
               <SOSButton icon={Wrench} label="Breakdown" desc="Engine failure, flat tire, or mechanical issue." />
               <SOSButton icon={Truck} label="Road Accident" desc="Collision or vehicle damage." />
            </div>
         </div>
      </div>
   );
}
