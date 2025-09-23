import { Search, ShoppingCart, Menu, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gray-100 text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>416-919-4434</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>info@bedsmart.ca</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>5000 Dufferin Street, North York</span>
            </div>
          </div>
          <div>
            <Button variant="outline" size="sm" className="text-xs">
              <span className="mr-2">💬</span>
              Questions? Chat with our support agent!
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
          <div className="text-3xl font-bold">
            <span className="text-max-blue">Bed</span>
            <span className="text-lily-pink">smart</span>
          </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <div className="group relative">
                <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <span>Bunk Beds</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">Twin Over Twin Bunk Beds</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">Twin Over Full Bunk Beds</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">Full Over Full Bunk Beds</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">Queen Bunk & Loft Beds</a>
                </div>
              </div>
              
              <div className="group relative">
                <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <span>Loft Beds</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">Low & Mid Lofts</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">High & Ultra High Lofts</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">All in One Loft Beds</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">Corner Lofts</a>
                </div>
              </div>
              
              <a href="#" className="hover:text-primary transition-colors">Single Beds</a>
              
              <div className="group relative">
                <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <span>Dressers & Storage</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">Mattresses</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">Bookcases</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">Desks & Chairs</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">Dressers</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-50">Night Stands</a>
                </div>
              </div>
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="bg-transparent outline-none text-sm w-40 lg:w-60"
                />
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-cta-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
              
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};