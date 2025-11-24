import React from 'react';
import { MOCK_USER, MOCK_ORDERS, PRODUCTS } from '../services/mockData';
import { Package, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';

const Account: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Profile Header */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          {MOCK_USER.name.charAt(0)}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-slate-900">{MOCK_USER.name}</h1>
          <p className="text-slate-500">{MOCK_USER.email}</p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-3">
            {MOCK_USER.preferences.map(pref => (
              <span key={pref} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                {pref}
              </span>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-2 text-red-500 font-medium px-4 py-2 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut size={18} /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Quick Actions */}
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <MapPin size={20} />
            </div>
            <h3 className="font-bold text-slate-800">Saved Addresses</h3>
            <p className="text-sm text-slate-500 mt-1">Manage delivery locations</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
              <CreditCard size={20} />
            </div>
            <h3 className="font-bold text-slate-800">Payment Methods</h3>
            <p className="text-sm text-slate-500 mt-1">Update cards & billing</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-4">
              <Settings size={20} />
            </div>
            <h3 className="font-bold text-slate-800">Settings</h3>
            <p className="text-sm text-slate-500 mt-1">Notifications & privacy</p>
         </div>
      </div>

      {/* Order History */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {MOCK_ORDERS.map(order => (
            <div key={order.id} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 mb-4">
                <div>
                   <p className="font-bold text-slate-800">Order #{order.id}</p>
                   <p className="text-sm text-slate-500">{order.date}</p>
                </div>
                <div className="mt-2 sm:mt-0 flex items-center gap-3">
                   <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">{order.status}</span>
                   <p className="font-bold text-slate-900">${order.total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {order.items.map((item, idx) => {
                  const product = PRODUCTS.find(p => p.id === item.productId);
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                         <Package size={20} className="text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{product?.name || 'Unknown Product'}</p>
                        <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-50 text-right">
                 <button className="text-primary-600 text-sm font-medium hover:text-primary-700">View Invoice</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;