import React, { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Map as MapIcon,
  History,
  Gauge,
  CloudRain,
  Bell,
  Calculator,
  Coffee,
  AlertTriangle,
  Settings,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';

// --- Reusable UI Primitives ---

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
}

export const Card = ({ children, className = '', title, action, ...props }: CardProps) => (
  <div 
    className={`bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 p-6 ${className}`}
    {...props}
  >
    {(title || action) && (
      <div className="flex justify-between items-center mb-4">
        {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
        {action && <div>{action}</div>}
      </div>
    )}
    {children}
  </div>
);

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  disabled 
}: { 
  children: ReactNode; 
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'; 
  className?: string; 
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 shadow-md",
    secondary: "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-red-200 shadow-md",
    outline: "border border-gray-300 text-gray-600 hover:bg-gray-50"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all ${props.className}`}
  />
);

export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="relative">
    <select
      {...props}
      className={`w-full px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none appearance-none transition-all ${props.className}`}
    >
      {props.children}
    </select>
    <div className="absolute right-3 top-3 pointer-events-none text-gray-400">
      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
    </div>
  </div>
);

// --- Layout ---

const SidebarItem = ({ to, icon: Icon, label, onClick }: { to: string; icon: any; label: string; onClick?: () => void }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-6 py-3 transition-colors duration-200 relative group rounded-r-full mr-4 lg:mr-0 lg:rounded-r-none lg:rounded-l-none
      ${isActive 
        ? 'text-blue-700 bg-blue-50 font-semibold' 
        : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
      }`
    }
  >
    {({ isActive }) => (
      <>
        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-md" />}
        <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600 transition-colors'} />
        <span>{label}</span>
      </>
    )}
  </NavLink>
);

export const Layout = ({ children }: { children: ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  // Hide layout on login page
  if (location.pathname === '/') return <>{children}</>;

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/re-routing', label: 'Dynamic Re-Routing', icon: MapIcon },
    { to: '/history', label: 'History', icon: History },
    { to: '/adaptive-speed', label: 'Adaptive Speed', icon: Gauge },
    { to: '/weather', label: 'Weather Prediction', icon: CloudRain },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/eta', label: 'ETA Calculation', icon: Calculator },
    { to: '/rest-point', label: 'Rest Point Alert', icon: Coffee },
    { to: '/sos', label: 'SOS Alert', icon: AlertTriangle },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:translate-x-0 overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <h1 className="text-xl font-bold text-gray-800">Menu</h1>
        </div>
        
        <nav className="mt-2 flex flex-col gap-1 pb-20">
          {navItems.map((item) => (
            <SidebarItem key={item.to} {...item} onClick={() => setIsMobileMenuOpen(false)} />
          ))}
          <div className="my-4 border-t border-gray-100 mx-6"></div>
          <SidebarItem to="/settings" label="Settings" icon={Settings} />
          <SidebarItem to="/" label="Log Out" icon={LogOut} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#56CCF2]">
        {/* Header */}
        <header className="bg-transparent sticky top-0 z-30 px-6 py-4 flex justify-between items-center lg:shadow-none">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-white drop-shadow-md">
            <Menu />
          </button>
          
          <div className="flex-1 lg:flex-none"></div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/20">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white drop-shadow-sm">Alex Driver</p>
                <p className="text-xs text-white/80">Fleet ID: #8834</p>
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-md cursor-pointer border-2 border-white/30">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Wrapper */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};