import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AmText } from "../../src/atoms";
import { ICartItem } from "../constants/dtos/common";
import { useCart } from "../hooks/useCart";

interface CartProductListProps {
  item: ICartItem;
}

const CartProductList: React.FC<CartProductListProps> = ({ item }) => {    
  const { increment, decrement, remove } = useCart();

   return (
  <View style={styles.cartItemContainer}>
    {/* Product Image */}
    <Image
      source={item.image}
      style={styles.cartItemImage}
      // className="w-28 h-28"
      resizeMode="contain"
    />

    {/* Details */}
    <View style={styles.cartItemDetails}>
      <AmText variant="labelSmall" style={styles.cartItemName}>
        {item.name}
      </AmText>
      <AmText variant="bodyLarge" style={styles.cartItemPrice}>
        ${item.price.toFixed(2)}
      </AmText>
      <AmText variant="bodySmall" style={styles.inStockText}>
        In stock
      </AmText>

      {/* Quantity Controls */}
      <View style={styles.quantityRow}>
        <View className='flex-row flex-1 items-center justify-around'>
          <TouchableOpacity
            onPress={() => decrement(item.id)}
            style={[styles.quantityButton, { backgroundColor: '#E2EAF0' }]}
          >
            <AmText variant='labelLarge' style={[styles.quantityButtonText, { fontSize: 20 }]}>−</AmText>
          </TouchableOpacity>
          <AmText variant='labelSmall' style={[styles.quantityText, { fontSize: 13, fontWeight: 400 }]}>
            {item.quantity}
          </AmText>
          <TouchableOpacity
            onPress={() => increment(item.id)}
            style={[styles.quantityButton, { backgroundColor: '#FFFFFF' }]}
          >
            <AmText variant='bodyLarge' style={[styles.quantityButtonText, { fontSize: 20 }]}>+</AmText>
          </TouchableOpacity>
        </View>

        {/* Delete Icon */}
        <TouchableOpacity
          onPress={() => remove(item.id)}
          activeOpacity={0.5}
          style={{ borderWidth: 1, borderColor: '#D1D5DB' }}
          className='items-center justify-center w-11 h-11 bg-[#FFFFFF] rounded-full ml-16'
        >
          <Image
            source={require('assets/images/icons/delete_vector.png')}
            className="w-4 h-4"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  </View>
)
};

export default CartProductList;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, marginTop: 12, backgroundColor: '#FFFFFF', },
  title: { marginBottom: 12, color: '#1F2937', fontWeight: '700' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F5F8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  cartItemName: { fontSize: 12, fontWeight: '600', color: '#3C4856' },
  inStockText: { fontSize: 12, color: '#10B981', marginTop: 4 },
  cartItemPrice: { fontSize: 16, fontWeight: '600', color: '#000', marginTop: 8 },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 38,
    height: 38,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#374151',
    lineHeight: 18,
  },
  quantityText: { marginHorizontal: 12, fontSize: 14, fontWeight: '600', color: '#374151' },
  });
