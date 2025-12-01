import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/Header';
import { MiniPromoBanner } from '@/components/MiniPromoBanner';
import { loadBedsmartProducts, getFormattedPrice, generateHandle, getProductsByCategory } from '@/data/productData';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { 
  ShoppingCart, 
  Grid, 
  List, 
  Filter, 
  SortAsc, 
  CheckCircle,
  Truck,
  Shield,
  Award,
  Zap
} from 'lucide-react';

export const DressersStorage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await loadBedsmartProducts();
        const dresserProducts = getProductsByCategory(allProducts, 'Dressers');
        setProducts(dresserProducts);
        setFilteredProducts(dresserProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price?.replace(/[$,]/g, '') || '0');
        switch (priceRange) {
          case 'under-200':
            return price < 200;
          case '200-500':
            return price >= 200 && price <= 500;
          case '500-1000':
            return price >= 500 && price <= 1000;
          case 'over-1000':
            return price > 1000;
          default:
            return true;
        }
      });
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace(/[$,]/g, '') || '0');
          const priceB = parseFloat(b.price?.replace(/[$,]/g, '') || '0');
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace(/[$,]/g, '') || '0');
          const priceB = parseFloat(b.price?.replace(/[$,]/g, '') || '0');
          return priceB - priceA;
        });
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, sortBy, priceRange]);

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const features = [
    {
      icon: CheckCircle,
      title: "Quality Tested",
      description: "All our storage solutions undergo rigorous quality testing"
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free shipping on orders over $299"
    },
    {
      icon: Shield,
      title: "5-Year Warranty",
      description: "Comprehensive warranty coverage"
    },
    {
      icon: Award,
      title: "Top Rated",
      description: "Highly rated by customers nationwide"
    }
  ];

  return (
    <div className="min-h-screen bg-sky-candy">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange to-teal"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange/20 rounded-full blur-2xl animate-pulse"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 text-white">
              <Zap className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Premium Dressers & Storage Collection</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              🏠 Dressers & Storage <span className="bg-gradient-to-r from-white to-baby-blue bg-clip-text text-transparent">Collection</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
              Organize your space with our stylish dressers, drawers, and storage solutions. Keep everything tidy and accessible with furniture that's as beautiful as it is functional!
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-orange to-teal text-white hover:opacity-90 font-semibold px-8 py-4 text-lg">
                Shop Collection
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg">
                View Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-baby-blue">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange to-teal rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb & Filters */}
      <section className="bg-baby-blue border-b">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Dressers & Storage</span>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Dressers & Storage
                <span className="text-lg font-normal text-gray-500 ml-2">
                  ({filteredProducts.length} products)
                </span>
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-200">Under $200</SelectItem>
                  <SelectItem value="200-500">$200 - $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="over-1000">Over $1,000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-gradient-to-r from-orange to-teal rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading amazing products for you...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
            : "space-y-6"
          }>
            {filteredProducts.map((product, index) => {
              const shouldShowPromo = viewMode === 'grid' && (index + 1) % 8 === 0;
              const promoType = ['sale', 'shipping', 'guarantee', 'category'][index % 4] as 'sale' | 'shipping' | 'guarantee' | 'category';
              const productHandle = product.handle || generateHandle(product.title);
              
              return (
                <React.Fragment key={productHandle}>
                  {shouldShowPromo && (
                    <div className="col-span-1">
                      <MiniPromoBanner type={promoType} currentCategory="Dressers & Storage" />
                    </div>
                  )}
                  
                  <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200">
                    <div className="relative overflow-hidden bg-gray-50 flex items-center justify-center" style={{ height: '280px' }}>
                      {product.salePrice && product.price && (
                        <Badge className="absolute top-4 right-4 bg-black text-white text-xs px-2 py-1">
                          -{Math.round(((parseFloat(product.price.replace(/[$,]/g, '')) - parseFloat(product.salePrice.replace(/[$,]/g, ''))) / parseFloat(product.price.replace(/[$,]/g, ''))) * 100)}%
                        </Badge>
                      )}
                      <img
                        src={product.imageUrls?.[0]}
                        alt={product.title}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    
                    <CardContent className="p-6 text-center flex flex-col min-h-[240px]">
                      <div className="flex-grow">
                        <Link to={`/product/${productHandle}`}>
                          <h3 className="font-bold text-sm uppercase tracking-wide text-gray-900 mb-1 hover:text-gray-600 transition-colors">
                            {product.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
                          {product.category}
                        </p>
                        
                        <div className="mb-3">
                          {product.price && product.salePrice ? (
                            <>
                              <div className="flex items-center justify-center gap-2 mb-1">
                                <span className="text-sm text-gray-500 line-through">
                                  Starting at {product.price}
                                </span>
                                <span className="text-lg font-bold text-red-600">
                                  {product.salePrice}
                                </span>
                              </div>
                              <p className="text-xs text-red-600">
                                You save {Math.round(((parseFloat(product.price.replace(/[$,]/g, '')) - parseFloat(product.salePrice.replace(/[$,]/g, ''))) / parseFloat(product.price.replace(/[$,]/g, ''))) * 100)}%
                              </p>
                            </>
                          ) : (
                            <div className="text-lg font-bold text-gray-900">
                              {product.salePrice || product.price || 'Contact for price'}
                            </div>
                          )}
                        </div>
                        
                        <p className="text-xs text-green-600 mb-3 uppercase tracking-wide font-semibold">
                          IN STOCK
                        </p>
                      </div>
                      
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
                        size="sm"
                      >
                        ADD TO CART
                      </Button>
                    </CardContent>
                  </Card>
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any storage products matching your current filters. Try adjusting your search criteria.
            </p>
            <Button onClick={() => {
              setPriceRange('all');
              setSortBy('featured');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};
