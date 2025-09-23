import { Search, User, Heart, HelpCircle, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">
            <span className="text-max-blue">Max</span>
            <span className="text-lily-pink">&</span>
            <span className="text-lily-pink">Lily</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="What are you looking for?" 
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-max-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="max-w-7xl mx-auto mt-4">
        <div className="flex space-x-8">
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            Bunk Beds ↓
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            Beds ↓
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            Loft Beds ↓
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            Mattresses
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            Storage & Accessories ↓
          </Button>
          <Button variant="ghost" className="text-lily-pink hover:text-lily-pink/80 font-medium">
            Sale
          </Button>
          <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
            Learn ↓
          </Button>
        </div>
      </nav>
    </header>
  );
};