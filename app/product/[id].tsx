import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AmText } from '../atoms';
import { products } from '../constants/data/products';
import { ProductProps } from '../constants/dtos/common';
import { useCart } from '../hooks/useCart';
import AmLoader from '../molecules/AmLoader';
import AmSnackbar from '../molecules/AmSnackbar';
import AppHeader from '../molecules/AppHeader';
import EmptyResult from '../molecules/EmptyResult';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isItemInCart, setIsItemInCart] = useState(false);
  // track whether the component is still mounted
  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const product: ProductProps | undefined = products.find((p) => p.id === id);
  const { addToCart, cart } = useCart();

  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  if (!product) {
    return (
      <View style={styles.center}>
        <EmptyResult text='Product not found' />
      </View>
    );
  };

  // const handleAddToCart = async (id: string) => {
  //   setLoading(true);
  //   try {
  //     // check if product already exist in cart
  //     const cartItem = cart.map((item) => item.id === id);
  //     if (cartItem) {
  //       setIsItemInCart(true);
  //       setTimeout(() => setIsItemInCart(false), 3000)
  //     } else {
  //     // simulate a network/request delay
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     addToCart(product);
  //     setSnackbarVisible(true);
  //     };
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAddToCart = async (productId: string) => {
    // check if item already in cart
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      // show “already in cart” message
      setIsItemInCart(true);
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          setIsItemInCart(false);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
    // otherwise, simulate loading and add
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (isMountedRef.current) {
        addToCart(product);
        setSnackbarVisible(true);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      {/* loader */}
      <AmLoader visible={loading} />

      {/* snackbar to show that product is been added to the cart */}
      {snackbarVisible && (
        <View style={{ position: 'absolute', top: Platform.OS === 'web' ? 70 : insets.top + 98, left: 0, right: 0, zIndex: 100 }}>
          <AmSnackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            message={isItemInCart ? 'Item has been added to cart!' : 'Oopss... Item is already in cart!'}
          />
        </View>
      )}
      {/* header */}
      <AppHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* back and title row */}
        <View style={styles.backRow}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()} style={styles.backButton}>
            <AntDesign name="left" size={20} color="#1f2937" />
            <AmText variant="bodyMedium" style={{ marginLeft: 8, fontWeight: '600' }}>
              Go back
            </AmText>
          </TouchableOpacity>
        </View>
        {/* product image */}
        <View style={styles.productImageContainer}>
          <TouchableOpacity activeOpacity={0.3}
            className='flex items-center justify-center w-16 h-16 rounded-full bg-[#fff] self-end absolute top-0 z-50 mt-2 ml-3'
            onPress={() => setFavorite(!favorite)}
          >
            {!favorite ? (
              <Image
                source={require('@/assets/images/icons/hugeicons_favourite.png')}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            ) : (
              <MaterialCommunityIcons name={'heart'} size={24} color={'#FF2D55'} />
            )}
          </TouchableOpacity>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        {/* name & price */}
        <View style={styles.detailsContainer}>
          <AmText variant="labelMedium" style={styles.productName}>
            {product.name}
          </AmText>
          <AmText variant="headlineMedium" style={styles.productPrice}>
            ${product.price.toFixed(2)}
          </AmText>
          {/* product description */}
          <View style={{ marginTop: 16 }}>
            <AmText variant="bodySmall" style={styles.sectionTitle}>
              About this item
            </AmText>
            <AmText variant="bodyMedium" style={styles.descriptionText}>{product.description}</AmText>
            <AmText variant="bodyMedium" style={styles.descriptionText}>{product.description}</AmText>
          </View>

          {/* add to cart button */}
          <TouchableOpacity
            style={styles.addToCartButton}
            activeOpacity={0.8}
            onPress={() => handleAddToCart(product.id)}
          >
            <AmText variant="labelLarge" style={styles.buttonText}>
              Add to cart
            </AmText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  snackbarWrapper: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  productImageContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#F6F5F8', //'#60B5FF',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  productImage: { width: '80%', height: '80%' },
  detailsContainer: { marginHorizontal: 16, marginTop: 20, backgroundColor: '#FBFBFB' },
  productName: { fontSize: 16, fontWeight: '500' },
  productPrice: { color: '#1F2937', fontWeight: '600', marginTop: 8 },
  sectionTitle: { color: '#1F2937', fontWeight: '600', marginBottom: 4 },
  descriptionText: { color: '#4B5563', lineHeight: 20, marginBottom: 8 },
  addToCartButton: {
    backgroundColor: '#60B5FF',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
});
