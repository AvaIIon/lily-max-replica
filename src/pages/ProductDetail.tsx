import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { sampleProducts, getFormattedPrice, Product, generateHandle, loadBedsmartProducts } from '@/data/productData';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ShoppingCart, Star, Check } from 'lucide-react';

export const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      if (productId) {
        console.log('Looking for product with ID:', productId);
        const allProducts = await loadBedsmartProducts();
        setProducts(allProducts);
        
        console.log('Available products:', allProducts.map(p => ({ 
          title: p.title, 
          handle: p.handle, 
          generated: generateHandle(p.title) 
        })).slice(0, 5));
        
        const foundProduct = allProducts.find(p => 
          (p.handle && p.handle === productId) || 
          generateHandle(p.title) === productId
        );
        console.log('Found product:', foundProduct ? foundProduct.title : 'None');
        if (foundProduct) {
          console.log('Product options:', foundProduct.options);
          console.log('Product data:', foundProduct);
        }
        setProduct(foundProduct || null);
      }
    };
    
    fetchProducts();
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Button onClick={() => navigate('/')} variant="outline">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const pricing = getFormattedPrice(product);
  const images = product.imageUrls.length > 0 ? product.imageUrls : ["https://via.placeholder.com/600x400?text=Product+Image"];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOptions);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && 
      ((p.handle && p.handle !== product.handle) || 
       generateHandle(p.title) !== generateHandle(product.title)))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/bunk-beds" className="hover:text-foreground">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/600x400?text=Product+Image";
                }}
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.title}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(127 reviews)</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-primary">{pricing.current}</span>
                {pricing.original && (
                  <span className="text-xl text-muted-foreground line-through">{pricing.original}</span>
                )}
              </div>

              <Badge variant="secondary" className="bg-green-100 text-green-800">
                In Stock
              </Badge>
            </div>

            <div>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "High-quality furniture piece designed for comfort and durability. Perfect for any bedroom setting."}
              </p>
            </div>

            {/* Product Options */}
            {product.options && typeof product.options === 'string' && product.options.trim() && (
              <div className="space-y-4">
                {product.options.includes('=') ? (
                  // Handle attribute format like "attribute_pa_finish=Espresso/Grey/Natural/White"
                  product.options.split(',').map((optionPart, index) => {
                    const [fullKey, values] = optionPart.split('=');
                    if (!fullKey || !values) return null;
                    
                    // Clean up the key name (remove attribute_pa_ prefix)
                    const optionName = fullKey.replace(/attribute_pa_/g, '').replace(/_/g, ' ').trim();
                    const optionValues = values.split('/').filter(v => v.trim());
                    
                    if (optionValues.length === 0) return null;
                    
                    return (
                      <div key={index}>
                        <label className="block text-sm font-medium text-foreground mb-2 capitalize">
                          {optionName}:
                        </label>
                        <Select
                          value={selectedOptions[optionName] || ''}
                          onValueChange={(value) => 
                            setSelectedOptions(prev => ({ ...prev, [optionName]: value }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={`Select ${optionName.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {optionValues.map((value, valueIndex) => (
                              <SelectItem key={valueIndex} value={value.trim()}>
                                {value.trim()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  })
                ) : (
                  // Handle other formats like "Color: White, Gray; Size: Twin, Full"
                  product.options.split(';').map((optionGroup, index) => {
                    const [optionName, optionValues] = optionGroup.split(':').map(s => s?.trim());
                    if (!optionName || !optionValues) return null;
                    
                    return (
                      <div key={index}>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {optionName}:
                        </label>
                        <Select
                          value={selectedOptions[optionName] || ''}
                          onValueChange={(value) => 
                            setSelectedOptions(prev => ({ ...prev, [optionName]: value }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={`Select ${optionName.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {optionValues.split(',').map((value, valueIndex) => (
                              <SelectItem key={valueIndex} value={value.trim()}>
                                {value.trim()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantity:
                </label>
                <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Key Features */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Key Features:</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-muted-foreground">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  Solid wood construction
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  Easy assembly required
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  Safety tested and certified
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  Free shipping on orders over $500
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedPricing = getFormattedPrice(relatedProduct);
                return (
                  <Link
                    key={relatedProduct.handle}
                    to={`/product/${relatedProduct.handle || generateHandle(relatedProduct.title)}`}
                    className="bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square bg-muted">
                      <img
                        src={relatedProduct.imageUrls[0] || "https://via.placeholder.com/300x200"}
                        alt={relatedProduct.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/300x200?text=Product+Image";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-foreground mb-2 text-sm line-clamp-2">
                        {relatedProduct.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">{relatedPricing.current}</span>
                        {relatedPricing.original && (
                          <span className="text-sm text-muted-foreground line-through">
                            {relatedPricing.original}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Customer Reviews */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {/* Review 1 */}
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm font-medium">Sarah M. - 93</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Verified Purchase</p>
                </div>
                <span className="text-sm text-muted-foreground">2 weeks ago</span>
              </div>
              <p className="text-foreground">"Absolutely love this bed! Quality is fantastic and my kids are thrilled with it. Assembly was straightforward with clear instructions."</p>
            </div>

            {/* Review 2 */}
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm font-medium">Mike D. - 67</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Verified Purchase</p>
                </div>
                <span className="text-sm text-muted-foreground">1 month ago</span>
              </div>
              <p className="text-foreground">"Great value for money. Solid construction and exactly what we were looking for. Highly recommend!"</p>
            </div>

            {/* Review 3 */}
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                    <span className="ml-2 text-sm font-medium">Jessica L. - 41</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Verified Purchase</p>
                </div>
                <span className="text-sm text-muted-foreground">3 weeks ago</span>
              </div>
              <p className="text-foreground">"Nice quality bed, though assembly took longer than expected. Overall satisfied with the purchase."</p>
            </div>

            {/* Review 4 */}
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm font-medium">Robert K. - 108</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Verified Purchase</p>
                </div>
                <span className="text-sm text-muted-foreground">1 week ago</span>
              </div>
              <p className="text-foreground">"Excellent quality and design. My daughter absolutely loves her new bed. Would definitely buy from Max & Lily again!"</p>
            </div>

            {/* Review 5 */}
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm font-medium">Amanda R. - 29</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Verified Purchase</p>
                </div>
                <span className="text-sm text-muted-foreground">5 days ago</span>
              </div>
              <p className="text-foreground">"Perfect addition to our kids' room. Sturdy, well-made, and looks exactly like the pictures. Fast delivery too!"</p>
            </div>

            {/* Review 6 */}
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                    <span className="ml-2 text-sm font-medium">David B. - 74</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Verified Purchase</p>
                </div>
                <span className="text-sm text-muted-foreground">2 months ago</span>
              </div>
              <p className="text-foreground">"Good quality for the price. Instructions could be clearer but once assembled, it's very solid and safe."</p>
            </div>

            {/* Review 7 */}
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm font-medium">Lisa T. - 52</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Verified Purchase</p>
                </div>
                <span className="text-sm text-muted-foreground">3 days ago</span>
              </div>
              <p className="text-foreground">"Amazing bed! My twin boys love it and it's held up great. Customer service was also very helpful when I had questions."</p>
            </div>

            {/* Review 8 */}
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm font-medium">Kevin P. - 117</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Verified Purchase</p>
                </div>
                <span className="text-sm text-muted-foreground">1 month ago</span>
              </div>
              <p className="text-foreground">"Top-notch quality and beautiful design. Worth every penny! The bed is exactly what we wanted for our child's room."</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};