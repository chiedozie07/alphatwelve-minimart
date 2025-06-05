export type ProductProps = {
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
    subcategory: string;
    description?: string;
    description_subtitle?: string;
  };  

export type VariantType =
| 'displayLarge'
| 'displayMedium'
| 'displaySmall'
| 'headlineLarge'
| 'headlineMedium'
| 'headlineSmall'
| 'titleLarge'
| 'titleMedium'
| 'titleSmall'
| 'labelLarge'
| 'labelMedium'
| 'labelSmall'
| 'bodyLarge'
| 'bodyMedium'
| 'bodySmall';

// extend product with quantity
export interface ICartItem extends ProductProps {
  quantity: number;
};
export interface ICartContextType {
  cart: ICartItem[];
  addToCart: (product: ProductProps) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
};

// user props definition
export interface IUserProps {
  id: string;
  name: string;
  email: string;
};
export interface IUserContextType {
  user: IUserProps | null;
  setUser: (user: IUserProps | null) => void;
  isLoggedIn: boolean;
};
export interface IProductsContextType {
  products: ProductProps[];
  setProducts: (items: ProductProps[]) => void;
};

