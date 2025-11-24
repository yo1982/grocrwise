import React, { useState } from 'react';
import { Bell, Trash2, TrendingDown, TrendingUp, Minus, Sparkles, Loader } from 'lucide-react';
import { PRODUCTS, STORES } from '../services/mockData';
import { Link } from 'react-router-dom';
import { getMarketForecasts } from '../services/geminiService';

interface Forecast {
  advice: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
}

const Alerts: React.FC = () => {
  // Simulating active alerts
  const watchedProducts = [PRODUCTS[0], PRODUCTS[3]];
  
  const [forecasts, setForecasts] = useState<Record<string, Forecast>>({});
  const [loading, setLoading] = useState(false);
  const [forecastEnabled, setForecastEnabled] = useState(false);

  const handleSmartForecast = async () => {
    setLoading(true);
    // Artificial delay for better UX if API is too fast, or to simulate work
    try {
      const results = await getMarketForecasts(watchedProducts);
      const newForecasts: Record<string, Forecast> = {};
      results.forEach((f: any) => {
        newForecasts[f.productId] = { advice: f.advice, trend: f.trend };
      });
      setForecasts(newForecasts);
      setForecastEnabled(true);
    } catch (error) {
      console.error("Failed to get forecast");
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'DOWN': return <TrendingDown size={16} className="text-emerald-500" />;
      case 'UP': return <TrendingUp size={16} className="text-red-500" />;
      default: return <Minus size={16} className="text-slate-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'DOWN': return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'UP': return 'text-red-700 bg-red-50 border-red-100';
      default: return 'text-slate-700 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Price Alerts</h1>
        <p className="text-slate-500 mt-2">We'll notify you when prices drop for these items.</p>
      </div>

      <div className="space-y-4">
        {watchedProducts.map(product => {
           const lowestPrice = product.prices.reduce((min, p) => p.amount < min.amount ? p : min, product.prices[0]);
           const store = STORES.find(s => s.id === lowestPrice.storeId);
           const forecast = forecasts[product.id];
           
           return (
             <div key={product.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
               <div className="flex flex-col sm:flex-row items-center gap-4">
                 <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                 
                 <div className="flex-1 text-center sm:text-left">
                   <Link to={`/product/${product.id}`} className="font-bold text-slate-800 hover:text-primary-600 text-lg">{product.name}</Link>
                   <p className="text-sm text-slate-500">Target Price: <span className="font-medium">$5.00</span></p>
                 </div>

                 <div className="bg-emerald-50 px-4 py-2 rounded-lg text-center min-w-[120px]">
                   <div className="flex items-center justify-center gap-1 text-emerald-700 font-bold">
                      <TrendingDown size={16} />
                      ${lowestPrice.amount}
                   </div>
                   <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-wide">Current Low</p>
                 </div>

                 <div className="flex gap-2">
                   <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                     <Trash2 size={20} />
                   </button>
                   <button className="p-2 text-primary-600 bg-primary-50 rounded-lg">
                     <Bell size={20} className="fill-primary-600" />
                   </button>
                 </div>
               </div>

               {/* Forecast Section */}
               {forecast && (
                 <div className={`mt-4 pt-3 border-t border-slate-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-500`}>
                    <div className="p-2 bg-indigo-50 rounded-full">
                      <Sparkles size={16} className="text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-indigo-900 uppercase tracking-wide">Smart Forecast</span>
                        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border ${getTrendColor(forecast.trend)}`}>
                           {getTrendIcon(forecast.trend)}
                           {forecast.trend === 'DOWN' ? 'Price Dropping' : forecast.trend === 'UP' ? 'Price Rising' : 'Price Stable'}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">{forecast.advice}</p>
                    </div>
                 </div>
               )}
             </div>
           );
        })}
      </div>
      
      {!forecastEnabled ? (
        <div className="mt-8 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-8 text-white text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold text-2xl mb-2">Want smarter alerts?</h3>
            <p className="text-indigo-100 mb-6 max-w-lg mx-auto">Let our Gemini AI analyze global market trends, seasonality, and supply chain data to predict the best time to buy.</p>
            
            <button 
              onClick={handleSmartForecast}
              disabled={loading}
              className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 mx-auto shadow-xl"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Analyzing Markets...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Enable Smart Forecast
                </>
              )}
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
        </div>
      ) : (
        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>Forecasts are based on AI analysis of market trends and are estimates only.</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;
