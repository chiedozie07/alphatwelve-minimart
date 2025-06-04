import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { AmText } from '../atoms';
import { products } from '../constants/data/products';
import { ProductProps } from '../constants/dtos/common';
import { useCart } from '../context/CartContext';
import AmLoader from '../molecules/AmLoader';
import AmSnackbar from '../molecules/AmSnackbar';
import AppHeader from '../molecules/AppHeader';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const product: ProductProps | undefined = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <View style={styles.center}>
        <AmText variant="bodyLarge">Product not found.</AmText>
      </View>
    );
  }

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      // simulate a network/request delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      addToCart(product);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      {/* loader */}
      <AmLoader visible={loading} />

      {/* snackbar to show that product is been added to the cart */}
      {snackbarVisible && (
        <View style={styles.snackbarWrapper}>
          <AmSnackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            message="Item has been added to cart!"
          />
        </View>
      )}
      {/* header */}
      <AppHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* back and title row */}
        <View style={styles.backRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <AntDesign name="stepbackward" size={20} color="#1f2937" />
            {/* <Image
              source={require('../../assets/arrow-left.png')}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            /> */}
            <AmText variant="bodyMedium" style={{ marginLeft: 8, fontWeight: '600' }}>
              Go back
            </AmText>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={require('@/assets/images/icons/hugeicons_favourite.png')}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* product image */}
        <View style={styles.productImageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        {/* name & price */}
        <View style={styles.detailsContainer}>
          <AmText variant="headlineSmall" style={styles.productName}>
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
            <AmText variant="bodyMedium" style={styles.descriptionText}>
              {product.description ||
                'This pre-owned product is not Apple certified, but has been professionally inspected, tested and cleaned by Amazon-qualified suppliers.'}
            </AmText>
            <AmText variant="bodyMedium" style={styles.descriptionText}>
              There will be minor cosmetic imperfections which may include a scratch or two, but the item will function as new.
            </AmText>
          </View>

          {/* add to cart button */}
          <TouchableOpacity
            style={styles.addToCartButton}
            activeOpacity={0.8}
            onPress={handleAddToCart}
          >
            <AmText variant="labelLarge" style={styles.buttonText}>
              Add to cart
            </AmText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  snackbarWrapper: {
    position: 'absolute',
    top: 60,
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
    backgroundColor: '#FFFFFF',
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
  detailsContainer: { marginHorizontal: 16, marginTop: 20 },
  productName: { color: '#1F2937', fontWeight: '700' },
  productPrice: { color: '#60B5FF', fontWeight: '600', marginTop: 8 },
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
