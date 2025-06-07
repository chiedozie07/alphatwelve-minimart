import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageSourcePropType, StyleProp, TextInputProps, ViewStyle } from "react-native";

// explicitly allow type only valid icon names from MaterialCommunityIcons:
export type TabIconName = keyof typeof MaterialCommunityIcons.glyphMap;
export interface TabItem {
  name: string;
  title: string;
  icon: TabIconName;
  tabBarBadge?: string | number | undefined;
};

export type ProductProps = {
    id: string;
    name: string;
    image: ImageSourcePropType;
    price: number;
    category: string;
    subcategory: string;
    description?: string;
    description_subtitle?: string;
    isInStock?: boolean;
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

export type ButtonMode =
  | 'text'
  | 'outlined'
  | 'contained'
  | 'elevated'
  | 'contained-tonal';
export interface IAmButtonProps {
  type?: 'regular' | 'rounded';
  onPress?: () => void;
  title: string;
  mode?: ButtonMode;
  icon?: string;
  transparent?: boolean;
  buttonColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
};

export type AmSnackbarProps = {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  duration?: number | undefined;
  status?: 'success' | 'info' | 'warning' | 'error';
  /** 
   * Override the default icon for this status. 
   * Must be a valid name from MaterialCommunityIcons.glyphMap 
   */
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
};


export type SnackbarState = {
  visible: boolean;
  message: string;
  status?: string;
  iconName?: any;
  duration?: number | undefined
};
export interface SearchBarProps extends TextInputProps {
  value: string;
  onSearchChange: (text: string) => void;
  placeholder?: string;
  debounceDelay?: number;
  style?: any;
  isSearching?: boolean;
};

