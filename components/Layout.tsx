import React from 'react';
import { Home, ShoppingBag, User, Bell, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-primary-600' : 'text-slate-400 hover:text-slate-600';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
           <span className="font-bold text-slate-800 text-lg">GrocerWise</span>
        </div>
        <button className="text-slate-600"><Menu size={24} /></button>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3">
           <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
           <span className="font-bold text-slate-800 text-xl">GrocerWise</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname === '/' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Home size={20} />
            Home
          </Link>
          <Link to="/alerts" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname === '/alerts' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Bell size={20} />
            Price Alerts
          </Link>
          <Link to="/account" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname === '/account' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`}>
            <User size={20} />
            Account
          </Link>
        </nav>

        <div className="p-6 border-t border-slate-100">
           <div className="bg-slate-900 rounded-xl p-4 text-white">
              <h3 className="font-semibold text-sm">Premium Plan</h3>
              <p className="text-xs text-slate-400 mt-1">Get unlimited price alerts.</p>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-auto md:h-screen">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-3 px-2 z-50 safe-area-bottom">
        <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/')}`}>
          <Home size={24} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link to="/alerts" className={`flex flex-col items-center gap-1 ${isActive('/alerts')}`}>
          <Bell size={24} />
          <span className="text-[10px] font-medium">Alerts</span>
        </Link>
        <Link to="/account" className={`flex flex-col items-center gap-1 ${isActive('/account')}`}>
          <User size={24} />
          <span className="text-[10px] font-medium">Account</span>
        </Link>
      </div>
    </div>
  );
};

export default Layout;