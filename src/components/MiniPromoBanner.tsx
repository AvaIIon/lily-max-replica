import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Sparkles, Gift, ArrowRight, Star, Zap } from 'lucide-react';

interface MiniPromoBannerProps {
  type: 'sale' | 'category' | 'shipping' | 'guarantee';
  currentCategory?: string;
}

export const MiniPromoBanner = ({ type, currentCategory }: MiniPromoBannerProps) => {
  if (type === 'sale') {
    return (
      <Card className="group h-full hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 border-2 hover:border-red-300 bg-gradient-to-br from-red-500 to-pink-600 text-white overflow-hidden">
        <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-to-br from-red-400 to-pink-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🔥</div>
              <div className="text-2xl font-bold">FLASH SALE!</div>
            </div>
          </div>
          <div className="absolute top-3 left-3 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
            LIMITED TIME
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-4 h-[calc(100%-12rem)]">
          <h3 className="font-semibold text-white mb-2 text-lg">
            Up to 40% OFF
          </h3>
          <p className="text-white/90 text-sm mb-3 line-clamp-2">
            Don't miss out on amazing savings across all furniture collections!
          </p>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-white">SAVE BIG</span>
            </div>
          </div>
          <Button
            size="sm"
            className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Shop Sale Now
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (type === 'shipping') {
    return (
      <Card className="group h-full hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 border-2 hover:border-green-300 bg-gradient-to-br from-green-500 to-emerald-600 text-white overflow-hidden">
        <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-to-br from-green-400 to-emerald-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🚚</div>
              <div className="text-2xl font-bold">FREE SHIPPING</div>
            </div>
          </div>
          <div className="absolute top-3 left-3 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
            ON ORDERS $299+
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-4 h-[calc(100%-12rem)]">
          <h3 className="font-semibold text-white mb-2 text-lg">
            Fast & Free Delivery
          </h3>
          <p className="text-white/90 text-sm mb-3 line-clamp-2">
            Get your furniture delivered right to your door with no extra charge!
          </p>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-white">📞 416-919-4434</span>
            </div>
          </div>
          <Button
            size="sm"
            className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
          >
            <Gift className="w-4 h-4 mr-1" />
            Learn More
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (type === 'guarantee') {
    return (
      <Card className="group h-full hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border-2 hover:border-blue-300 bg-gradient-to-br from-blue-500 to-indigo-600 text-white overflow-hidden">
        <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-to-br from-blue-400 to-indigo-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">⭐</div>
              <div className="text-2xl font-bold">QUALITY PROMISE</div>
            </div>
          </div>
          <div className="absolute top-3 left-3 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
            PREMIUM QUALITY
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-4 h-[calc(100%-12rem)]">
          <h3 className="font-semibold text-white mb-2 text-lg">
            Built to Last
          </h3>
          <p className="text-white/90 text-sm mb-3 line-clamp-2">
            Premium materials and construction with 5-star customer reviews!
          </p>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-white">5-STAR RATED</span>
            </div>
          </div>
          <Button
            size="sm"
            className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
          >
            <Star className="w-4 h-4 mr-1" />
            Read Reviews
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Category type
  const otherCategories = [
    { name: 'Bunk Beds', path: '/bunk-beds', icon: '🏢', color: 'from-blue-500 to-cyan-600' },
    { name: 'Loft Beds', path: '/loft-beds', icon: '🏗️', color: 'from-green-500 to-emerald-600' },
    { name: 'Single Beds', path: '/single-beds', icon: '🛏️', color: 'from-purple-500 to-pink-600' },
    { name: 'Dressers & Storage', path: '/dressers-storage', icon: '📦', color: 'from-orange-500 to-red-600' }
  ].filter(cat => cat.name !== currentCategory);

  const randomCategory = otherCategories[Math.floor(Math.random() * otherCategories.length)];

  return (
    <Card className={`group h-full hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border-2 hover:border-purple-300 bg-gradient-to-br ${randomCategory.color} text-white overflow-hidden`}>
      <div className={`relative overflow-hidden rounded-t-lg h-48 bg-gradient-to-br ${randomCategory.color}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">{randomCategory.icon}</div>
            <div className="text-xl font-bold">EXPLORE MORE</div>
          </div>
        </div>
        <div className="absolute top-3 left-3 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
          NEW COLLECTION
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <CardContent className="p-4 h-[calc(100%-12rem)]">
        <h3 className="font-semibold text-white mb-2 text-lg">
          {randomCategory.name}
        </h3>
        <p className="text-white/90 text-sm mb-3 line-clamp-2">
          Discover our amazing {randomCategory.name.toLowerCase()} collection with unique designs!
        </p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-white">VIEW ALL</span>
          </div>
        </div>
        <Button
          asChild
          size="sm"
          className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
        >
          <Link to={randomCategory.path} className="flex items-center justify-center">
            <Zap className="w-4 h-4 mr-1" />
            Shop Collection
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};