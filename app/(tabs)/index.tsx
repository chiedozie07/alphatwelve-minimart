import AmLoader from "@/molecules/AmLoader";
import AppHeader from "@/molecules/AppHeader";
import EmptyResult from "@/molecules/EmptyResult";
import SearchBar from "@/molecules/SearchBar";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, BackHandler, FlatList, StatusBar, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AmText } from "../../src/atoms";
import { products } from "../../src/constants/data/products";
import AmProductCard from "../../src/organisms/card/AmProductCard";
// import { Dropdown } from 'react-native-paper-dropdown';



export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const navigation = useNavigation();
    const router = useRouter();

  // filter prooducts by "Technology" category
  const techProducts = products.filter((p) => p.category === "Technology");

  // simulate product loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  //refresh product list
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // exit the App on back button press
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit AlphaTwelve Minimart',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', style: 'cancel', onPress: () => {} },
            { text: 'Yes, Exit', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true;
      };
      const unscubscribe = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => unscubscribe.remove();
    }, []));

  // filtered list,, memoized for performance
  const filteredProducts = useMemo(() => {
    const lower = searchQuery.trim().toLowerCase();
    if (lower === '') return techProducts;
    return techProducts.filter((p) => p.name.toLowerCase().includes(lower));
  }, [techProducts, searchQuery]);

  // handler for debounced search result
  const handleSearchChange = (text: string) => {
    setIsSearching(true);
    setSearchQuery(text);
    // filtering is synchronous, so we can immediately turn off the spinner:
    setIsSearching(false);
  };

  // refresh product list
  const refreshProductList = () => {
    setRefreshing(true);
    timerRef.current = setTimeout(() => {
      setRefreshing(false);
      setIsSearching(false);
    }, 3000);
  };

  // product category options
  const OPTIONS = [
    { label: 'Technology', value: 'technology' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      {isLoading ? (
        <AmLoader visible={isLoading} text="Loading..." />
      ) : (
        <>
          <AppHeader />
          {/* search bar */}
          <View className="px-4 mt-2">
            <SearchBar isSearching={isSearching} placeholder="Search..." value={searchQuery} onSearchChange={handleSearchChange} />
          </View>
          {/* category header */}
          <View className="flex-row items-center justify-between px-4 py-3">
            <TouchableOpacity activeOpacity={0.7} className="flex-row items-center">
              <AntDesign name="left" size={20} color="#1f2937" />
              <AmText variant='bodyMedium' className="ml-2 text-2xl text-gray-800" style={{ fontWeight: 'bold' }}>
                Technology
              </AmText>
            </TouchableOpacity>
            {/* TODO: add the drop down item selection feature later to filter and render products based on the selected category */}
           {/* <Dropdown
              // label="Category"
              placeholder="Select Category"
              options={OPTIONS}
              value={category}
              onSelect={setCategory}
              hideMenuHeader={true}
              statusBarHeight={55}
              menuContentStyle={{ maxHeight: 30, paddingVertical: 0, paddingHorizontal: 0}}
            /> */}
          </View>
          {!techProducts ? (
            <EmptyResult text={'Sorry, No product available for the category at the moment! '} />
          ) : (
            <>
              {/* subheading */}
              <View className="px-4">
                <AmText variant="bodyMedium" className="text-base text-gray-700 mb-4">Smartphones, Laptops & Accessories</AmText>
              </View>

              {/* If no results */}
              {filteredProducts.length === 0 ? (
                <View className="my-0 px-0">
                  <EmptyResult iconName="layers-search" text={`😢 Opss! no products match "${searchQuery}"`} iconSize={60} />
                </View>
              ) : (
                <FlatList
                  data={filteredProducts}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={2}
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    marginTop: 8,
                  }}
                  contentContainerStyle={
                    !isLoading && !techProducts
                      ? { flexGrow: 1, justifyContent: 'center' }
                      : null
                  }
                  renderItem={({ item }) => <AmProductCard product={item} />}
                  showsVerticalScrollIndicator={false}
                  refreshing={refreshing}
                  onRefresh={refreshProductList}
                />
              )}
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};
