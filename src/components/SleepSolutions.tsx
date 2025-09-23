import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import bunkBedsImg from '@/assets/bunk-beds.jpg';
import singleBedsImg from '@/assets/single-beds.jpg';
import loftBedsImg from '@/assets/loft-beds.jpg';
import floorBedsImg from '@/assets/floor-beds.jpg';

const categories = [
  {
    title: "Bunk Beds",
    image: bunkBedsImg,
    icon: "🛏️"
  },
  {
    title: "Single Beds", 
    image: singleBedsImg,
    icon: "⭐"
  },
  {
    title: "Loft Beds",
    image: loftBedsImg,
    icon: "🏠"
  },
  {
    title: "Floor Beds",
    image: floorBedsImg,
    icon: "🌙"
  }
];

export const SleepSolutions = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Sleep Solutions You've Been Searching For!
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3]">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 text-2xl bg-white rounded-full p-2 shadow-lg">
                  {category.icon}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">{category.title}</h3>
                <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};