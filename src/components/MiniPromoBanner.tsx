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
      <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 overflow-hidden">
        <CardContent className="p-4 relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="relative text-center">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              <h4 className="text-lg font-bold">🔥 FLASH SALE!</h4>
            </div>
            <p className="text-white/90 text-sm mb-3">
              Up to 40% OFF selected items
            </p>
            <Button size="sm" className="bg-white text-red-600 hover:bg-white/90 text-xs">
              Shop Now
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === 'shipping') {
    return (
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Gift className="w-5 h-5 mr-2" />
            <h4 className="text-lg font-bold">FREE SHIPPING</h4>
          </div>
          <p className="text-white/90 text-sm mb-2">
            On orders over $299
          </p>
          <p className="text-white/70 text-xs">
            📞 Call: 416-919-4434
          </p>
        </CardContent>
      </Card>
    );
  }

  if (type === 'guarantee') {
    return (
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="w-5 h-5 mr-2" />
            <h4 className="text-lg font-bold">QUALITY PROMISE</h4>
          </div>
          <p className="text-white/90 text-sm mb-2">
            Built to last with premium materials
          </p>
          <p className="text-white/70 text-xs">
            ⭐ 5-Star Customer Reviews
          </p>
        </CardContent>
      </Card>
    );
  }

  // Category type
  const otherCategories = [
    { name: 'Bunk Beds', path: '/bunk-beds', icon: '🏢' },
    { name: 'Loft Beds', path: '/loft-beds', icon: '🏗️' },
    { name: 'Single Beds', path: '/single-beds', icon: '🛏️' },
    { name: 'Dressers & Storage', path: '/dressers-storage', icon: '📦' }
  ].filter(cat => cat.name !== currentCategory);

  const randomCategory = otherCategories[Math.floor(Math.random() * otherCategories.length)];

  return (
    <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-0 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap className="w-4 h-4 mr-2" />
            <h4 className="text-sm font-bold">EXPLORE MORE</h4>
          </div>
          <div className="mb-3">
            <span className="text-2xl">{randomCategory.icon}</span>
            <p className="text-white/90 text-sm mt-1">
              Check out our {randomCategory.name}
            </p>
          </div>
          <Button
            asChild
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 text-xs"
          >
            <Link to={randomCategory.path} className="flex items-center">
              View Collection
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};