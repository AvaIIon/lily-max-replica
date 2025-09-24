import { Button } from "@/components/ui/button";
import { Menu, Search, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100">
          <div className="hidden md:flex items-center space-x-6 text-gray-600">
            <span>📞 416-919-4434</span>
            <span>✉️ info@bedsmart.ca</span>
            <span>📍 5000 Dufferin Street, North York</span>
          </div>
          
          <div className="ml-auto">
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
              💬 Questions? Chat with our support agent!
            </Button>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bedsmart
              </h1>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/bunk-beds" className="text-gray-700 hover:text-primary font-medium">Bunk Beds</Link>
            <Link to="/loft-beds" className="text-gray-700 hover:text-primary font-medium">Loft Beds</Link>
            <Link to="/single-beds" className="text-gray-700 hover:text-primary font-medium">Single Beds</Link>
            <Link to="/dressers-storage" className="text-gray-700 hover:text-primary font-medium">Dressers & Storage</Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>
            
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/bunk-beds" className="text-gray-700 hover:text-primary font-medium">Bunk Beds</Link>
              <Link to="/loft-beds" className="text-gray-700 hover:text-primary font-medium">Loft Beds</Link>
              <Link to="/single-beds" className="text-gray-700 hover:text-primary font-medium">Single Beds</Link>
              <Link to="/dressers-storage" className="text-gray-700 hover:text-primary font-medium">Dressers & Storage</Link>
              
              <div className="md:hidden flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 mt-4">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none text-sm flex-1"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};