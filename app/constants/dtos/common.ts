export type ProductProps = {
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
    subcategory: string;
    description?: string;
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
export interface CartItem extends ProductProps {
  quantity: number;
};
export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductProps) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
};
