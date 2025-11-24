import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { PRODUCTS, STORES } from '../services/mockData';
import { Price } from '../types';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [alertSet, setAlertSet] = useState(false);

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  // Prepare data for Recharts
  const chartData = product.prices.map(price => {
    const store = STORES.find(s => s.id === price.storeId);
    return {
      name: store?.name || 'Unknown',
      price: price.amount,
      color: store?.color || '#000'
    };
  });

  const lowestPrice = product.prices.reduce((min, p) => p.amount < min.amount ? p : min, product.prices[0]);

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image & Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-80 object-contain"
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{product.category}</span>
               <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{product.unit}</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>
            <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
          </div>
        </div>

        {/* Right Column: Comparison Logic */}
        <div className="space-y-6">
          {/* Best Price Card */}
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
             <div>
               <p className="text-primary-800 font-medium mb-1">Best Deal Available</p>
               <div className="flex items-baseline gap-2">
                 <h2 className="text-4xl font-bold text-primary-700">${lowestPrice.amount.toFixed(2)}</h2>
                 <span className="text-primary-600">at {STORES.find(s => s.id === lowestPrice.storeId)?.name}</span>
               </div>
             </div>
             <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-primary-200 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
               <ShoppingCart size={20} /> Add to List
             </button>
          </div>

          {/* Price Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 text-lg">Price Comparison</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12}} 
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="price" radius={[8, 8, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Store List */}
          <div className="space-y-3">
             <h3 className="font-bold text-slate-800 text-lg">Store Details</h3>
             {product.prices.map((price, idx) => {
               const store = STORES.find(s => s.id === price.storeId);
               const isBest = price.amount === lowestPrice.amount;
               
               return (
                 <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between ${isBest ? 'bg-green-50 border-green-200' : 'bg-white border-slate-100'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{backgroundColor: store?.color}}>
                        {store?.logo}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{store?.name}</p>
                        <div className="flex items-center gap-1 text-xs">
                          {price.inStock ? (
                            <span className="text-green-600 flex items-center gap-0.5"><CheckCircle size={10} /> In Stock</span>
                          ) : (
                             <span className="text-red-500 flex items-center gap-0.5"><AlertCircle size={10} /> Out of Stock</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${isBest ? 'text-green-700' : 'text-slate-700'}`}>${price.amount.toFixed(2)}</p>
                      {isBest && <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Lowest Price</p>}
                    </div>
                 </div>
               );
             })}
          </div>

          {/* Alert Button */}
          <button 
            onClick={() => setAlertSet(!alertSet)}
            className={`w-full py-4 rounded-xl font-medium border flex items-center justify-center gap-2 transition-all ${alertSet ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-white text-primary-600 border-primary-200 hover:bg-primary-50'}`}
          >
            <Bell size={20} className={alertSet ? 'fill-slate-400 text-slate-400' : ''} />
            {alertSet ? 'Price Alert Active' : 'Set Price Alert'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;