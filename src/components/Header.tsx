import { Menu, Search, X, ShoppingCart, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const navLinks = [
    { name: "Bunk Beds", path: "/bunk-beds" },
    { name: "Loft Beds", path: "/loft-beds" },
    { name: "Single Beds", path: "/single-beds" },
    { name: "Dressers & Storage", path: "/dressers-storage" },
    { name: "Shop By Age", path: "#" },
    { name: "Outlet", path: "#" },
    { name: "Gift Guide", path: "#", highlight: true },
    { name: "New Arrivals", path: "#", highlight: true },
  ];

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Pink promotional banner */}
      <div className="bg-[#d6006f] text-white text-center py-2 text-sm font-medium">
        Free shipping over $75 for indoor items!
      </div>

      {/* Main header row */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Left - Search */}
          <div className="flex-1 hidden md:block">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 max-w-[280px]">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search our store"
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
                Forgali
              </h1>
              <p className="text-[10px] text-gray-500 text-center tracking-widest uppercase">
                Made for Make Believe
              </p>
            </Link>
          </div>

          {/* Right - Country, User, Cart */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            <div className="hidden md:flex items-center space-x-1 text-sm text-gray-600">
              <span>Country:</span>
              <span className="flex items-center">
                🇨🇦 CAD <ChevronDown className="h-3 w-3 ml-1" />
              </span>
            </div>
            
            <button className="text-gray-600 hover:text-gray-900">
              <User className="h-5 w-5" />
            </button>
            
            <Link to="/cart" className="relative text-gray-600 hover:text-gray-900">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#d6006f] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <button
              className="lg:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="hidden lg:flex items-center justify-center space-x-8 py-3 border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium hover:text-[#d6006f] transition-colors ${
                link.highlight ? "text-[#d6006f]" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4 md:hidden">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search our store"
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium ${
                    link.highlight ? "text-[#d6006f]" : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};