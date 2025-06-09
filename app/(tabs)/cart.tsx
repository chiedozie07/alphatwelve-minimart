import { useCart } from '@/hooks/useCart';
import AmSnackbar from '@/molecules/AmSnackbar';
import AppHeader from '@/molecules/AppHeader';
import CartProductList from '@/molecules/CartProductList';
import EmptyResult from '@/molecules/EmptyResult';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AmCustomButton, AmText } from '../../src/atoms';
import { SnackbarState } from '../../src/constants/dtos/common';


export default function CartScreen() {
  const [isProccessing, setIsProccessing] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    visible: false,
    message: '',
    status: '',
    iconName: '',
    duration: undefined
  });
  const { cart } = useCart();
  const router = useRouter();
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // track whether the component is still mounted
  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // calculate subtotal
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const shipping = cart.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  // handle checkout
  const handleProductsCheckout = () => {
    console.log('Checking out products...');
    if (!isProccessing) {
      setIsProccessing(true);
      setTimeout(() => {
        setIsProccessing(false);
        setSnackbar({
          visible: true,
          message: "The checkout feature is currently unavailable and coming soon. Our software engineer \"Chiedozie\" is actively working to put that in place as soon as possible. Please try again later!",
          status: 'info',
          iconName: 'information-outline',
          duration: 7000,
        });
        setTimeout(() => {
          if (isMountedRef.current) {
            setSnackbar({
              visible: false,
              message: '',
              status: '',
              iconName: '',
              duration: undefined,
            });
          }
        }, 7000);
      }, 10000);
    }
  };
  


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC', width: width, height: height }}>
      <View style={{ position: 'absolute', top: Platform.OS === 'web' ? 70 : insets.top + 190, left: 0, right: 0, zIndex: 100 }}>
        <AmSnackbar
          visible={snackbar.visible}
          onDismiss={() => setSnackbar({ visible: false, message: '' })}
          message={snackbar.message}
          iconName={snackbar.iconName}
          status={snackbar.status?.includes('info') ? 'info' : 'success'}
          duration={snackbar.duration && snackbar.duration}
        />
      </View>
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
            <EmptyResult iconName='cart-off' iconSize={80} title='No item in cart yet!' text='Your cart is empty. Please select your preferred product(s) to buy.' />
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
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <AmCustomButton
                  title={!isProccessing ? `Checkout ($${total.toFixed(2)})` : 'Checking out...'}
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
  title: { color: '#1F2937', fontWeight: '700' },
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
  backButton: { flexDirection: 'row', textAlign: 'center', marginRight: 10 },
});
