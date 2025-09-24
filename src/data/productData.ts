export interface Product {
  title: string;
  category: string;
  price: string;
  salePrice: string;
  sku: string;
  availability: string;
  options: string;
  imageUrls: string[];
  productUrl: string;
  handle?: string; // Generated from title for routing
  description?: string; // Optional description
}

// Enhanced product categorization based on title and content
export const categorizeProduct = (product: Product): string => {
  const title = product.title.toLowerCase();
  
  // Loft beds - look for loft bed keywords
  if (title.includes('loft') || title.includes('ultra low') || title.includes('ultra high')) {
    return 'Loft Beds';
  }
  
  // Single beds - look for single/twin bed keywords (excluding bunk beds and loft beds)
  if ((title.includes('twin') || title.includes('single')) && 
      !title.includes('bunk') && 
      !title.includes('loft') && 
      !title.includes('over') &&
      (title.includes('basic bed') || title.includes('traditional bed') || title.includes('platform bed'))) {
    return 'Single Beds';
  }
  
  // Dressers & Storage - look for storage keywords
  if (title.includes('dresser') || 
      title.includes('drawer') || 
      title.includes('storage') || 
      title.includes('bookcase') || 
      title.includes('nightstand') || 
      title.includes('night stand') ||
      title.includes('chest')) {
    return 'Dressers & Storage';
  }
  
  // Default to Bunk Beds for everything else
  return 'Bunk Beds';
};

// Parse CSV data with proper comma handling
export const parseProductData = (csvContent: string): Product[] => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const products: Product[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    if (values.length >= headers.length) {
      const product: Product = {
        title: values[0] || '',
        category: values[1] || '',
        price: values[2] || '',
        salePrice: values[3] || '',
        sku: values[4] || '',
        availability: values[5] || '',
        options: values[6] || '',
        imageUrls: values[7] ? values[7].split('|').filter(url => url.trim()) : [],
        productUrl: values[8] || '',
        handle: generateHandle(values[0] || ''),
        description: ''
      };
      products.push(product);
    }
  }
  
  return products;
};

// Generate a URL-friendly handle from title
export const generateHandle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Load products with enhanced categorization
let cachedProducts: Product[] | null = null;

export const loadBedsmartProducts = async (): Promise<Product[]> => {
  if (cachedProducts) {
    return cachedProducts;
  }
  
  try {
    const response = await fetch('/src/data/bedsmart_products.csv');
    if (!response.ok) {
      console.log('CSV file not found, using sample data');
      return sampleProducts;
    }
    
    const csvContent = await response.text();
    const products = parseProductData(csvContent);
    
    // Add enhanced categorization to each product
    const categorizedProducts = products.map(product => ({
      ...product,
      category: categorizeProduct(product)
    }));
    
    cachedProducts = categorizedProducts;
    return categorizedProducts;
  } catch (error) {
    console.error('Error loading CSV:', error);
    return sampleProducts;
  }
};

// Sample data from CSV for immediate use (fallback)
export const sampleProducts: Product[] = [
  {
    title: "Max & Lily 1 Drawer Night Stand with Shelf",
    category: "Dressers & Storage",
    price: "",
    salePrice: "$338.00",
    sku: "",
    availability: "",
    options: "attribute_pa_finish=Espresso/Grey/Natural/White",
    imageUrls: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/1434.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/1438.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/1436.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/258.jpg"
    ],
    productUrl: "https://bedsmart.ca/product/1-drawer-night-stand-with-shelf/",
    handle: generateHandle("Max & Lily 1 Drawer Night Stand with Shelf")
  },
  {
    title: "Maxtrix Twin Low Basic Bed",
    category: "Single Beds",
    price: "",
    salePrice: "$788.00",
    sku: "",
    availability: "In stock",
    options: "",
    imageUrls: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/567.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/569.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/570.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/572.jpg"
    ],
    productUrl: "https://bedsmart.ca/product/1000-maxtrix-twin-low-basic-bed/"
  },
  {
    title: "Awesome Maxtrix Twin Size Mid Loft Bed",
    category: "Loft Beds",
    price: "",
    salePrice: "$2,119.00",
    sku: "",
    availability: "In stock",
    options: "",
    imageUrls: [
      "https://bedsmart.ca/wp-content/uploads/2016/10/awesome-cs__2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/10/awesome-ns__6.jpg"
    ],
    productUrl: "https://bedsmart.ca/product/awesome-maxtrix-twin-size-mid-loft-bed/"
  },
  {
    title: "GETIT Twin Medium Bunk Bed with Ladder",
    category: "Bunk Beds",
    price: "",
    salePrice: "$2,092.00",
    sku: "",
    availability: "In stock",
    options: "",
    imageUrls: [
      "https://bedsmart.ca/wp-content/uploads/2024/08/getit-ws__2.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/109.jpg"
    ],
    productUrl: "https://bedsmart.ca/product/getit-twin-medium-bunk-bed-with-ladder/"
  }
];

// Filter products by category - enhanced filtering
export const getProductsByCategory = (products: Product[], category: string): Product[] => {
  return products.filter(product => {
    const productCategory = categorizeProduct(product);
    
    if (category === 'Loft Beds') {
      return productCategory === 'Loft Beds';
    } else if (category === 'Single Beds') {
      return productCategory === 'Single Beds';
    } else if (category === 'Dressers & Storage') {
      return productCategory === 'Dressers & Storage';
    } else if (category === 'Bunk Beds') {
      return productCategory === 'Bunk Beds';
    }
    
    // Fallback to title search if category doesn't match
    return product.title.toLowerCase().includes(category.toLowerCase());
  });
};

// Get formatted price
export const getFormattedPrice = (product: Product): { current: string; original?: string } => {
  if (product.salePrice && product.price) {
    return {
      current: product.salePrice,
      original: product.price
    };
  } else if (product.salePrice) {
    return {
      current: product.salePrice
    };
  } else if (product.price) {
    return {
      current: product.price
    };
  }
  return { current: 'Call for Price' };
};