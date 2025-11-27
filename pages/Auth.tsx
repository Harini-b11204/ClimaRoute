import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card } from '../components/Layout';
import { Truck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 md:p-12 space-y-8 relative overflow-hidden">
        {/* Decorative background element inside card */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-blue-600 mb-4">
             <Truck size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">ClimaRoute</h1>
          <p className="text-gray-500">Welcome to ClimaRoute System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email or Username</label>
              <Input type="text" placeholder="driver@climaroute.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input type="password" placeholder="••••••••" required />
            </div>
          </div>

          <div className="space-y-4">
            <Button className="w-full py-3 text-lg shadow-lg shadow-blue-200">
              Log In
            </Button>
            <div className="text-center">
              <span className="text-gray-500 text-sm">New to fleet? </span>
              <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">Sign Up</a>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
