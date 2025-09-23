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

// Parse CSV data - in production you'd want to load this dynamically
export const parseProductData = (csvContent: string): Product[] => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle CSV parsing with potential commas in values
    const values = line.split(',');
    if (values.length >= 9) {
      const imageUrls = values[7] ? values[7].split('|') : [];
      
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

// Sample product data from the CSV
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
    title: "Maxtrix Twin Platform Bed",
    category: "Bunk Beds",
    price: "",
    salePrice: "$607.00",
    sku: "",
    availability: "",
    options: "attribute_pa_finish=Espresso/Natural/White",
    imageUrls: [
      "https://bedsmart.ca/wp-content/uploads/2016/11/1000_20wp__6_1024x1024_2x-1.jpg",
      "https://bedsmart.ca/wp-content/uploads/2016/11/1075_20001__1_900x.webp"
    ],
    productUrl: "https://bedsmart.ca/product/1075-maxtrix-twin-platform-bed/"
  },
  {
    title: "Max & Lily 2 Over 3 Dresser with Crown",
    category: "Bunk Beds",
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
  },
  {
    title: "Maxtrix Full Low Basic Bed",
    category: "Bunk Beds",
    price: "",
    salePrice: "$1,044.00",
    sku: "",
    availability: "",
    options: "attribute_pa_bed-end-style=Panel/Slat | attribute_pa_finish=Espresso/Natural/White",
    imageUrls: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/574.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/573.jpg"
    ],
    productUrl: "https://bedsmart.ca/product/2000-maxtrix-full-low-basic-bed-solid-wood/"
  },
  {
    title: "Max & Lily 3 Drawer Dresser",
    category: "Bunk Beds",
    price: "",
    salePrice: "$794.00",
    sku: "",
    availability: "",
    options: "attribute_pa_finish=Espresso/Grey/White/Blue",
    imageUrls: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/2887.jpg",
      "https://bedsmart.ca/wp-content/uploads/2022/06/1401.jpg"
    ],
    productUrl: "https://bedsmart.ca/product/3-drawer-dresser-with-crown/"
  },
  {
    title: "Amazing Maxtrix Full Size Low Loft Bed",
    category: "Bunk Beds",
    price: "",
    salePrice: "$2,077.00",
    sku: "",
    availability: "In stock",
    options: "",
    imageUrls: [
      "https://bedsmart.ca/wp-content/uploads/2022/06/24.jpg"
    ],
    productUrl: "https://bedsmart.ca/product/amazing-maxtrix-full-size-low-loft-bed/"
  },
  {
    title: "Awesome Maxtrix Twin Size Mid Loft Bed",
    category: "Bunk Beds",
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
  }
];

// Get products by category
export const getProductsByCategory = (products: Product[], category: string): Product[] => {
  return products.filter(product => 
    product.category.toLowerCase().includes(category.toLowerCase())
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