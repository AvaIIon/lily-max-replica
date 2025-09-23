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
}

// Parse CSV data with proper comma handling
export const parseProductData = (csvContent: string): Product[] => {
  const lines = csvContent.split('\n');
  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Split by comma but handle quoted values
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current);
    
    if (values.length >= 9) {
      const imageUrls = values[7] ? values[7].split('|').map(url => url.trim()) : [];
      
      products.push({
        title: values[0] || '',
        category: values[1] || '',
        price: values[2] || '',
        salePrice: values[3] || '',
        sku: values[4] || '',
        availability: values[5] || '',
        options: values[6] || '',
        imageUrls,
        productUrl: values[8] || ''
      });
    }
  }

  return products;
};

// Load real Bedsmart products from CSV
let cachedProducts: Product[] | null = null;

export const loadBedsmartProducts = async (): Promise<Product[]> => {
  if (cachedProducts) return cachedProducts;
  
  try {
    const response = await fetch('/bedsmart_products.csv');
    const csvContent = await response.text();
    cachedProducts = parseProductData(csvContent);
    return cachedProducts;
  } catch (error) {
    console.error('Error loading Bedsmart products:', error);
    return sampleProducts; // Fallback
  }
};

// Sample data from CSV for immediate use
export const sampleProducts: Product[] = [
  {
    title: "Max & Lily 1 Drawer Night Stand with Shelf",
    category: "Bunk Beds",
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
    productUrl: "https://bedsmart.ca/product/1-drawer-night-stand-with-shelf/"
  },
  {
    title: "Maxtrix Twin Low Basic Bed",
    category: "Bunk Beds",
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
    title: "Maxtrix Twin Medium Basic Bed",
    category: "Bunk Beds",
    price: "",
    salePrice: "$886.00",
    sku: "",
    availability: "In stock",
    options: "",
    imageUrls: [
      "https://bedsmart.ca/wp-content/uploads/2016/11/1000_20wp__6_1024x1024_2x-1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/11/1000_20cp__1_1024x1024_2x.jpg"
    ],
    productUrl: "https://bedsmart.ca/product/1040-maxtrix-twin-medium-basic-bed-solid-wood/"
  },
  {
    title: "Maxtrix Twin High Basic Bed",
    category: "Bunk Beds",
    price: "",
    salePrice: "$924.00",
    sku: "",
    availability: "In stock",
    options: "",
    imageUrls: [
      "https://bedsmart.ca/wp-content/uploads/2016/11/1060_20ns__1_900x.webp",
      "https://bedsmart.ca/wp-content/uploads/2016/11/1060_20cp__1_900x.webp"
    ],
    productUrl: "https://bedsmart.ca/product/1060-maxtrix-twin-high-basic-bed/"
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
    title: "Max & Lily 2 Over 3 Dresser with Crown",
    category: "Dressers",
    price: "",
    salePrice: "$908.00",
    sku: "",
    availability: "",
    options: "attribute_pa_finish=Espresso/Grey/White/Blue",
    imageUrls: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/2901.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/2898.jpg"
    ],
    productUrl: "https://bedsmart.ca/product/2-over-3-dresser/"
  }
];

// Get products by category
export const getProductsByCategory = (products: Product[], category: string): Product[] => {
  return products.filter(product => 
    product.category.toLowerCase().includes(category.toLowerCase()) ||
    product.title.toLowerCase().includes(category.toLowerCase())
  );
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