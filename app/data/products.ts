export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  subcategory: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Apple iPhone 16 128GB | Teal",
    image: require('@/assets/images/product-imgs/iphone-16.png'),
    price: 700.0,
    category: "Technology",
    subcategory: "Smartphones, Laptops & Accessories",
  },
  {
    id: "2",
    name: "M4 MacBook Air 13″ 256GB | Sky blue",
    image:  require('@/assets/images/product-imgs/m4-macbook-pro.png'),
    price: 1000.0,
    category: "Technology",
    subcategory: "Smartphones, Laptops & Accessories",
  },
  {
    id: "3",
    name: "Google Pixel 9A 128GB | Iris",
    image: require('@/assets/images/product-imgs/google-pixel-9a.png'),
    price: 499.0,
    category: "Technology",
    subcategory: "Smartphones, Laptops & Accessories",
  },
  {
    id: "4",
    name: "Apple AirPods 4 Active Noise Cancellation",
    image:  require('@/assets/images/product-imgs/apple-airpods4.png'),
    price: 129.0,
    category: "Technology",
    subcategory: "Smartphones, Laptops & Accessories",
  },
];
