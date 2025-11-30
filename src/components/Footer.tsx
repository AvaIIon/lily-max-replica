import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange to-teal py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            📧 Stay in the Loop!
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Get exclusive deals, new arrivals, and design tips delivered straight to your inbox!
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70"
            />
            <Button className="bg-white text-teal hover:bg-white/90 font-semibold">
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-orange to-teal bg-clip-text text-transparent">
                🛏️ BedSmart
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Creating magical spaces for children to sleep, play, and grow. Quality furniture that grows with your family.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Shop</h4>
            <div className="space-y-2">
              <Link to="/bunk-beds" className="block text-gray-300 hover:text-white transition-colors">
                🏢 Bunk Beds
              </Link>
              <Link to="/loft-beds" className="block text-gray-300 hover:text-white transition-colors">
                🏗️ Loft Beds
              </Link>
              <Link to="/single-beds" className="block text-gray-300 hover:text-white transition-colors">
                🛏️ Single Beds
              </Link>
              <Link to="/dressers-storage" className="block text-gray-300 hover:text-white transition-colors">
                📦 Dressers & Storage
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Customer Service</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                📞 Contact Us
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                📋 Size Guide
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                🚚 Shipping Info
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                🔄 Returns & Exchanges
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                ❓ FAQ
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>416-919-4434</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>hello@bedsmart.ca</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                <span>Toronto, Ontario<br />Canada</span>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="pt-4 border-t border-gray-700">
              <h5 className="font-semibold text-white mb-2">Business Hours</h5>
              <div className="text-gray-300 text-sm space-y-1">
                <div>Mon-Fri: 9AM - 6PM</div>
                <div>Saturday: 10AM - 4PM</div>
                <div>Sunday: Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-black/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 BedSmart. All rights reserved. Made with ❤️ in Canada
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};