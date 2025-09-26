import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Sparkles, Gift, ArrowRight } from 'lucide-react';

interface PromotionalBannerProps {
  currentCategory?: string;
}

export const PromotionalBanner = ({ currentCategory }: PromotionalBannerProps) => {
  const otherCategories = [
    { name: 'Bunk Beds', path: '/bunk-beds', icon: '🏢' },
    { name: 'Loft Beds', path: '/loft-beds', icon: '🏗️' },
    { name: 'Single Beds', path: '/single-beds', icon: '🛏️' },
    { name: 'Dressers & Storage', path: '/dressers-storage', icon: '📦' }
  ].filter(cat => cat.name !== currentCategory);

  return (
    <div className="space-y-6 my-12">
      {/* Sale Banner */}
      <Card className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white border-0 overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 mr-2 animate-pulse" />
              <h3 className="text-2xl font-bold">MEGA SALE HAPPENING NOW! 🎉</h3>
              <Sparkles className="w-6 h-6 ml-2 animate-pulse" />
            </div>
            <p className="text-lg mb-4 text-white/90">
              Save up to 40% on all furniture! Limited time offer - Don't miss out!
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <Gift className="w-4 h-4 mr-1" />
                <span>FREE Shipping over $299</span>
              </div>
              <span>•</span>
              <span>📞 Call: 416-919-4434</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Categories Banner */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Explore Our Other Collections 🌟
            </h3>
            <p className="text-muted-foreground">
              Complete your bedroom with our full range of furniture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherCategories.map((category) => (
              <Button
                key={category.path}
                asChild
                variant="outline"
                className="h-auto p-4 border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 group"
              >
                <Link to={category.path} className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
