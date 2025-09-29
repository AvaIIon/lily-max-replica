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
      <Card className="group h-full hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 border-2 hover:border-pink-300 bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 overflow-hidden">
        <div className="relative overflow-hidden rounded-t-lg h-48">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2 animate-bounce-slow">🔥</div>
              <div className="text-2xl font-bold drop-shadow-lg text-white">FLASH SALE!</div>
            </div>
          </div>
          <div className="absolute top-3 left-3 bg-yellow-400/90 text-black rounded-full px-3 py-1 text-xs font-bold shadow-lg border border-yellow-300">
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
      <Card className="group h-full hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 border-2 hover:border-emerald-300 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 overflow-hidden">
        <div className="relative overflow-hidden rounded-t-lg h-48">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2 animate-bounce-slow">🚚</div>
              <div className="text-2xl font-bold drop-shadow-lg text-white">FREE SHIPPING</div>
            </div>
          </div>
          <div className="absolute top-3 left-3 bg-lime-400/90 text-black rounded-full px-3 py-1 text-xs font-bold shadow-lg border border-lime-300">
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
      <Card className="group h-full hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 border-2 hover:border-violet-300 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 overflow-hidden">
        <div className="relative overflow-hidden rounded-t-lg h-48">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2 animate-bounce-slow">⭐</div>
              <div className="text-2xl font-bold drop-shadow-lg text-white">QUALITY PROMISE</div>
            </div>
          </div>
          <div className="absolute top-3 left-3 bg-cyan-400/90 text-black rounded-full px-3 py-1 text-xs font-bold shadow-lg border border-cyan-300">
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
    <Card className="group h-full hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 border-2 hover:border-indigo-300 bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-500 overflow-hidden">
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2 animate-bounce-slow">{randomCategory.icon}</div>
            <div className="text-xl font-bold drop-shadow-lg text-white">EXPLORE MORE</div>
          </div>
        </div>
        <div className="absolute top-3 left-3 bg-rose-400/90 text-black rounded-full px-3 py-1 text-xs font-bold shadow-lg border border-rose-300">
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