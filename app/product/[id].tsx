import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useHaptic } from '@/hooks/useHaptic';
import AmLoader from '@/molecules/AmLoader';
import AmSnackbar from '@/molecules/AmSnackbar';
import AppHeader from '@/molecules/AppHeader';
import EmptyResult from '@/molecules/EmptyResult';
import { ALERT_ACTIONS } from '@/state/actions/alertActions';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Platform,
  // SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  // useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AmCustomButton, AmText } from '../../src/atoms';
import { products } from '../../src/constants/data/products';
import { ProductProps, SnackbarState } from '../../src/constants/dtos/common';


export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [proccessing, setProccessing] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    visible: false,
    message: '',
    status: '',
    iconName: ''
  });

  const product: ProductProps | undefined = products.find((p) => p.id === id);
  const { addToCart, cart } = useCart();
  const { favorites, addFavorites, removeFavorite } = useFavorites();
  const haptic = useHaptic();


  // get device window size
  // const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // track whether the component is still mounted
  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // make product user's favorite
  useEffect(() => {
    if (product) {
      setIsFavorited(favorites.some(item => item.id === product.id));
    }
  }, [favorites, product]);

  const makeFavorites = () => {
    if (!product) return;
    const isAlreadyFavorited = favorites.some(item => item.id === product.id);
    // favorite button haptic feedback
    haptic({ style: ALERT_ACTIONS.HAPTIC.STYLE.IMPACT, type: ALERT_ACTIONS.HAPTIC.TYPE.LIGHT });
    if (!isAlreadyFavorited) {
      setIsFavorited(true);
      addFavorites(product); // use the current product
    } else {
      setIsFavorited(false);
      removeFavorite(product.id);
    }
  };


  if (!product) {
    return (
      <View style={styles.center}>
        <EmptyResult text='Product not found' />
      </View>
    );
  };

  // add the selected product tocart
  const handleAddToCart = async (productId: string) => {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      // check if item already in cart
      setSnackbar({ visible: true, message: 'Oppss... Item is already in cart!', status: 'info', iconName: 'information-outline' });
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          setSnackbar({ visible: false, message: '' });
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
    // if item is not in cart, add it
    setLoading(true);
    setProccessing(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (isMountedRef.current) {
        addToCart(product);
        setSnackbar({ visible: true, message: 'Item has been added to cart!', status: 'success' });
        const timer = setTimeout(() => {
          if (isMountedRef.current) {
            setSnackbar({ visible: false, message: '' });
          }
        }, 3000);
        return () => clearTimeout(timer);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        setProccessing(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      {/* loader */}
      <AmLoader visible={loading} />
      {/* unified snackbar with status to show that product is been added to the cart */}
      {snackbar.visible && (
        <View style={{ position: 'absolute', top: Platform.OS === 'web' ? 70 : insets.top + 98, left: 0, right: 0, zIndex: 100 }}>
          <AmSnackbar
            visible={snackbar.visible}
            onDismiss={() => setSnackbar({ visible: false, message: '' })}
            message={snackbar.message}
            status={snackbar.status?.includes('info') ? 'info' : 'success'}
            iconName={snackbar.iconName?.includes('information-outline') && snackbar.iconName}
          />
        </View>
      )}
      {/* header */}
      <AppHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* back and title row */}
        <View style={styles.backRow}>
          <TouchableOpacity activeOpacity={0.4} onPress={() => router.back()} style={styles.backButton}>
            <AntDesign name="left" size={20} color="#1f2937" />
            <AmText variant="bodyMedium" style={{ marginLeft: 8, fontSize: 16, fontWeight: 'bold' }}>
              Go back
            </AmText>
          </TouchableOpacity>
        </View>
        {/* product image */}
        <View style={styles.productImageContainer}>
          <TouchableOpacity activeOpacity={0.3}
            className='flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 self-end absolute top-0 z-50 mt-2 mr-2'
            // onPress={() => setIsFavorited(!isFavorited)}
            onPress={makeFavorites}
          >
            {!isFavorited ? (
              <Image
                source={require('assets/images/icons/hugeicons_favourite.png')}
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AmCustomButton
              title={proccessing ? 'Adding to cart...' : 'Add to cart'}
              onPress={() => handleAddToCart(product.id)}
              loading={proccessing}
              disabled={proccessing}
              style={styles.addToCartButton}
              textStyle={styles.buttonText}
            />
          </View>
          {/* <AmButton title='Add to cart' 
            type='regular' mode='contained' 
            onPress={() => handleAddToCart(product.id)}
            style={styles.addToCartButton}
          /> */}
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
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 10
  },
  backButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  productImageContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#F6F5F8',
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
  productName: { fontSize: 16, fontWeight: '400' },
  productPrice: { color: '#1F2937', fontWeight: '600', marginTop: 8 },
  sectionTitle: { color: '#1F2937', fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  descriptionText: { color: '#4B5563', lineHeight: 20, marginBottom: 8 },
  addToCartButton: {
    backgroundColor: '#60B5FF',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
});
