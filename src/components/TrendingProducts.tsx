import { useState } from 'react';
import { Button } from '@/components/ui/button';

const tabs = [
  "Going Fast",
  "New Arrivals", 
  "Award Winning",
  "Bunk Beds"
];

const products = [
  { name: "Twin Over Twin Bunk Bed", price: "$749.49", originalPrice: "$909", image: "https://via.placeholder.com/300x200" },
  { name: "Loft Bed with Desk", price: "$599.99", originalPrice: "$729", image: "https://via.placeholder.com/300x200" },
  { name: "Storage Platform Bed", price: "$449.99", originalPrice: "$549", image: "https://via.placeholder.com/300x200" },
  { name: "Trundle Daybed", price: "$399.99", originalPrice: "$499", image: "https://via.placeholder.com/300x200" },
  { name: "Full Size Bunk Bed", price: "$899.99", originalPrice: "$1099", image: "https://via.placeholder.com/300x200" },
  { name: "Study Loft Bed", price: "$679.99", originalPrice: "$799", image: "https://via.placeholder.com/300x200" },
  { name: "Twin Bed Frame", price: "$299.99", originalPrice: "$399", image: "https://via.placeholder.com/300x200" },
  { name: "Bookcase Headboard Bed", price: "$529.99", originalPrice: "$649", image: "https://via.placeholder.com/300x200" },
  { name: "L-Shaped Bunk Bed", price: "$799.99", originalPrice: "$949", image: "https://via.placeholder.com/300x200" },
  { name: "Captain's Bed", price: "$549.99", originalPrice: "$679", image: "https://via.placeholder.com/300x200" }
];

export const TrendingProducts = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Trending for Bigs & Littles
        </h2>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {tabs.map((tab, index) => (
              <Button
                key={index}
                variant={activeTab === index ? "default" : "ghost"}
                onClick={() => setActiveTab(index)}
                className={`rounded-md ${activeTab === index ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-2 text-sm">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            View More
          </Button>
        </div>
      </div>
    </section>
  );
};