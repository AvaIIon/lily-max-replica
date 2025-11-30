import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { MiniPromoBanner } from '@/components/MiniPromoBanner';
import singleBedsImage from '@/assets/single-beds.jpg';
import { loadBedsmartProducts, getFormattedPrice, generateHandle, getProductsByCategory } from '@/data/productData';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { 
  ShoppingCart, 
  Star, 
  Grid, 
  List, 
  Filter, 
  SortAsc, 
  Heart,
  Eye,
  CheckCircle,
  Truck,
  Shield,
  Award,
  Zap
} from 'lucide-react';

export const SingleBeds = () => {
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
        const singleBedProducts = getProductsByCategory(allProducts, 'Single Beds');
        console.log('Sample single bed product:', singleBedProducts[0]);
        console.log('Sample imageUrls:', singleBedProducts[0]?.imageUrls);
        setProducts(singleBedProducts);
        setFilteredProducts(singleBedProducts);
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

    // Filter by price range
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

    // Sort products
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

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
      toast({
        title: "Removed from favorites",
        description: "Product removed from your favorites.",
      });
    } else {
      newFavorites.add(productId);
      toast({
        title: "Added to favorites",
        description: "Product added to your favorites.",
      });
    }
    setFavorites(newFavorites);
  };

  const features = [
    {
      icon: CheckCircle,
      title: "Quality Tested",
      description: "All our single beds undergo rigorous quality testing"
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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-300/30 rounded-full blur-2xl animate-pulse"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 text-white">
              <Zap className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Premium Single Beds Collection</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Sleep in <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Style</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
              Discover our exceptional collection of single beds designed for comfort, style, and durability. 
              Perfect for kids, teens, and adults who value quality sleep in compact spaces.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 font-semibold px-8 py-4 text-lg">
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
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
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Single Beds</span>
          </nav>

          {/* Filters & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Single Beds
                <span className="text-lg font-normal text-gray-500 ml-2">
                  ({filteredProducts.length} products)
                </span>
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
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

              {/* Price Filter */}
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

              {/* Sort Options */}
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
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading amazing beds for you...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
              : "space-y-6"
            }>
              {filteredProducts.map((product, index) => {
                const shouldShowPromo = viewMode === 'grid' && (index + 1) % 8 === 0;
                const promoType = ['sale', 'shipping', 'guarantee', 'category'][index % 4] as 'sale' | 'shipping' | 'guarantee' | 'category';
                const pricing = getFormattedPrice(product);
                const productHandle = product.handle || generateHandle(product.title);
                const isFavorite = favorites.has(productHandle);
                
                return (
                  <React.Fragment key={productHandle}>
                    {shouldShowPromo && (
                      <div className="col-span-1">
                        <MiniPromoBanner type={promoType} currentCategory="Single Beds" />
                      </div>
                    )}
                    
                    <Card className={`group overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 border-2 hover:border-indigo-300 bg-white ${
                      viewMode === 'list' ? 'flex flex-row h-48' : ''
                    }`}>
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-64'}`}>
                        <img
                          src={product.imageUrls?.[0] || singleBedsImage}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = singleBedsImage;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.salePrice && product.price && (
                            <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg animate-pulse">
                              🔥 Sale
                            </Badge>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-10 h-10 p-0 bg-white/90 hover:bg-white"
                            onClick={() => toggleFavorite(productHandle)}
                          >
                            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-10 h-10 p-0 bg-white/90 hover:bg-white"
                            asChild
                          >
                            <Link to={`/product/${productHandle}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent className={`${viewMode === 'list' ? 'flex-1 p-6 flex flex-col justify-between' : 'p-6'}`}>
                        <div>
                          <Link to={`/product/${productHandle}`}>
                            <h3 className="font-bold text-lg text-gray-900 mb-3 hover:text-indigo-600 transition-colors line-clamp-2 group-hover:text-indigo-600">
                              {product.title}
                            </h3>
                          </Link>
                          
                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                          </div>
                          
                          <div className="flex items-center space-x-3 mb-4">
                            <span className="text-2xl font-bold text-indigo-600">{pricing.current}</span>
                            {pricing.original && (
                              <span className="text-lg text-gray-400 line-through">
                                {pricing.original}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  </React.Fragment>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No beds found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any single beds matching your current filters. Try adjusting your search criteria.
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