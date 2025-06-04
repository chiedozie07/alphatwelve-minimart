export type ProductProps = {
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
    subcategory: string;
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