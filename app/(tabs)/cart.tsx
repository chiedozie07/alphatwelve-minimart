import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { AmText } from '../atoms';
import AmCustomButton from '../atoms/buttons/AmCustomButton';
import { useCart } from '../hooks/useCart';
import AppHeader from '../molecules/AppHeader';
import CartProductList from '../molecules/CartProductList';
import EmptyResult from '../molecules/EmptyResult';


export default function CartScreen() {
  const [isProccessing, setIsProccessing] = useState(false);
  const { cart } = useCart();
  const router = useRouter();
  const { height, width } = useWindowDimensions();

  // calculate subtotal
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const shipping = cart.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  // handle checkout
  const handleProductsCheckout = () => {
    setIsProccessing(true)
    console.log('Checking out products...');
    return;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC', width: width, height: height }}>
      <AppHeader />

      {/* back and title row */}
      <View style={styles.backRow}>
        <TouchableOpacity activeOpacity={0.4} onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="left" size={18} color="#1f2937" />
        </TouchableOpacity>
        <AmText variant='titleLarge' style={[styles.title, { fontSize: 19 }]}>Your Cart </AmText>
      </View>

      <View style={styles.container}>
        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <EmptyResult text='Your cart is empty. Please select your preferred product(s) to buy.' />
          </View>
        ) : (
          <>
            {/* cart Items List */}
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <CartProductList item={item} />}
              contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 12, paddingBottom: 8 }}
            />

            {/* order info & checkout */}
            <View style={styles.orderInfoContainer}>
              {/* order in title */}
              <AmText variant='labelMedium' style={[styles.title, { fontSize: 15, fontWeight: 700 }]}>
                Other info
              </AmText>
              <View style={styles.orderRow}>
                <AmText variant="bodyMedium">Subtotal</AmText>
                <AmText variant="bodyMedium">${subtotal.toFixed(2)}</AmText>
              </View>
              <View style={styles.orderRow}>
                <AmText variant="bodyMedium">Shipping</AmText>
                <AmText variant="bodyMedium">${shipping.toFixed(2)}</AmText>
              </View>
              <View style={styles.orderRow}>
                <AmText variant="titleMedium">Total</AmText>
                <AmText variant="titleMedium">${total.toFixed(2)}</AmText>
              </View>
              <View style={{ elevation: 3, shadowOpacity: 3, marginBottom: 5 }} />

              {/* <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
                <AmText variant="labelLarge" style={styles.checkoutButtonText}>
                  Checkout (${total.toFixed(2)})
                </AmText>
              </TouchableOpacity> */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <AmCustomButton
                  title={!isProccessing ? `Checkout ($${total.toFixed(2)})` : 'Please wait...'}
                  onPress={handleProductsCheckout}
                  loading={isProccessing}
                  disabled={isProccessing}
                  style={styles.checkoutButton}
                  textStyle={styles.checkoutButtonText}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, marginTop: 12, backgroundColor: '#FFFFFF', },
  title: { marginBottom: 12, color: '#1F2937', fontWeight: '700' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cartItemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  orderInfoContainer: {
    backgroundColor: '#FBFBFB',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  checkoutButton: {
    width: '100%',
    backgroundColor: '#60B5FF',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  backButton: { flexDirection: 'row', alignItems: 'flex-start', marginRight: 10 },
});
