import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, STORES, MOCK_USER } from '../services/mockData';
import { getPersonalizedRecommendations } from '../services/geminiService';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoadingRecs(true);
      // Simulate network delay for realistic feel
      setTimeout(async () => {
         const recs = await getPersonalizedRecommendations(MOCK_USER);
         setRecommendations(recs);
         setLoadingRecs(false);
      }, 1000);
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Discover Products</h1>
          <p className="text-slate-500 mt-1">Compare prices across your favorite supermarkets.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search milk, eggs, bread..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>
      </div>

      {/* AI Recommendations Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-yellow-300 animate-pulse" />
            <h2 className="text-xl font-bold">Recommended For You</h2>
          </div>
          
          {loadingRecs ? (
            <div className="flex gap-4 animate-pulse">
               {[1,2,3].map(i => <div key={i} className="h-24 w-1/3 bg-white/20 rounded-lg"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                  <span className="text-xs font-medium text-indigo-100 uppercase tracking-wide bg-indigo-800/50 px-2 py-0.5 rounded-full">{rec.category}</span>
                  <h3 className="font-bold text-lg mt-2">{rec.productName}</h3>
                  <p className="text-sm text-indigo-100 mt-1 opacity-90 line-clamp-2">{rec.reason}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Decorative Background Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
      </div>

      {/* Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
           <h2 className="text-xl font-bold text-slate-800">Trending Items</h2>
           <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600">
             <Filter size={16} /> Filter
           </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} stores={STORES} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">No products found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;