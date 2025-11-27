
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { ReRouting, History, AdaptiveSpeed } from './pages/Operations';
import { Weather, Notifications, ETACalculator, RestPoint, SOS } from './pages/Utility';
import Settings from './pages/Settings';

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/re-routing" element={<ReRouting />} />
          <Route path="/history" element={<History />} />
          <Route path="/adaptive-speed" element={<AdaptiveSpeed />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/eta" element={<ETACalculator />} />
          <Route path="/rest-point" element={<RestPoint />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
