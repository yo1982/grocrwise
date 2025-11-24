import React from 'react';
import { Product, Store } from '../types';
import { ArrowRight, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  stores: Store[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product, stores }) => {
  // Find lowest price
  const lowestPrice = product.prices.reduce((min, p) => p.amount < min.amount ? p : min, product.prices[0]);
  const bestStore = stores.find(s => s.id === lowestPrice.storeId);

  return (
    <Link to={`/product/${product.id}`} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-primary-700 flex items-center gap-1 shadow-sm">
           <TrendingDown size={12} />
           Best Deal
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
             <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{product.category}</p>
             <h3 className="font-bold text-slate-800 text-lg leading-tight mt-1">{product.name}</h3>
          </div>
        </div>
        
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-500">Best price at <span className="font-medium text-slate-700">{bestStore?.name}</span></p>
            <p className="text-2xl font-bold text-primary-600">${lowestPrice.amount.toFixed(2)}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;