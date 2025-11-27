
import React, { useState } from 'react';
import { Card, Button, Input, Select } from '../components/Layout';
import { User, Bell, Shield, Globe, Smartphone, Mail, Save, Lock, Truck } from 'lucide-react';

export default function Settings() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
           <p className="text-white/90 sm:text-gray-500 text-sm">Manage your profile and application preferences.</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="shadow-lg shadow-blue-900/20 w-full sm:w-auto">
           <Save size={18} />
           {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Profile */}
        <div className="space-y-6">
          <Card title="Profile Information">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 border-4 border-white shadow-sm relative">
                <User size={40} />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 border-2 border-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </button>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Alex Driver</h3>
              <p className="text-sm text-gray-500">Senior Logistics Operator</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                <Input defaultValue="Alex Driver" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                <div className="relative">
                   <Mail className="absolute left-3 top-2.5 text-gray-400" size={16} />
                   <Input defaultValue="alex.driver@climaroute.com" className="pl-10" />
                </div>
              </div>
               <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                <div className="relative">
                   <Smartphone className="absolute left-3 top-2.5 text-gray-400" size={16} />
                   <Input defaultValue="+1 (555) 123-4567" className="pl-10" />
                </div>
              </div>
            </div>
          </Card>

          <Card title="Fleet Details">
             <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                   <Truck size={24} />
                </div>
                <div>
                   <p className="text-xs text-gray-500 uppercase font-bold">Current Vehicle</p>
                   <p className="font-semibold text-gray-800">Volvo VNL 860 (2023)</p>
                   <p className="text-sm text-gray-500 mt-1">ID: #FLT-8834</p>
                </div>
             </div>
             <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-600">License Status</span>
                   <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Active</span>
                </div>
             </div>
          </Card>
        </div>

        {/* Right Column: Settings */}
        <div className="lg:col-span-2 space-y-6">
          
          <Card title="General Preferences" className="relative overflow-hidden">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Globe size={16} /> Language
                   </label>
                   <Select>
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                   </Select>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                   <Select>
                      <option>Pacific Time (PT)</option>
                      <option>Eastern Time (ET)</option>
                      <option>UTC</option>
                   </Select>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Distance Units</label>
                   <div className="flex bg-gray-100 p-1 rounded-lg">
                      <button className="flex-1 py-1.5 text-sm font-medium rounded bg-white shadow-sm text-blue-600 transition-all">Miles</button>
                      <button className="flex-1 py-1.5 text-sm font-medium rounded text-gray-500 hover:bg-gray-200 transition-all">Km</button>
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Temperature</label>
                   <div className="flex bg-gray-100 p-1 rounded-lg">
                      <button className="flex-1 py-1.5 text-sm font-medium rounded bg-white shadow-sm text-blue-600 transition-all">°F Fahrenheit</button>
                      <button className="flex-1 py-1.5 text-sm font-medium rounded text-gray-500 hover:bg-gray-200 transition-all">°C Celsius</button>
                   </div>
                </div>
             </div>
          </Card>

          <Card title="Notifications" action={<Bell size={20} className="text-gray-400"/>}>
             <div className="space-y-4">
                {[
                   { title: 'Critical Weather Alerts', desc: 'Get immediate alerts for severe weather conditions on your route.', checked: true },
                   { title: 'Route Deviations', desc: 'Notify when re-routing suggestions are available.', checked: true },
                   { title: 'Rest Stop Reminders', desc: 'Reminders to take breaks based on driving hours.', checked: true },
                   { title: 'Marketing Updates', desc: 'News about ClimaRoute features and updates.', checked: false },
                ].map((item, idx) => (
                   <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div className="pr-4">
                         <p className="font-medium text-gray-800">{item.title}</p>
                         <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                   </div>
                ))}
             </div>
          </Card>

          <Card title="Security" action={<Shield size={20} className="text-gray-400"/>}>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-md shadow-sm">
                         <Lock className="text-gray-500" size={18} />
                      </div>
                      <div>
                         <p className="text-sm font-medium text-gray-700">Password</p>
                         <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                      </div>
                   </div>
                   <Button variant="secondary" className="text-sm py-1 h-8">Update</Button>
                </div>
                
                 <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-md shadow-sm">
                         <Smartphone className="text-gray-500" size={18} />
                      </div>
                      <div>
                         <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                         <p className="text-xs text-gray-500">Currently disabled</p>
                      </div>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
             </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
