import "@/global.css";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StatusBar, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AmText } from "../atoms";
import { products } from "../constants/data/products";
import AmLoader from "../molecules/AmLoader";
import AppHeader from "../molecules/AppHeader";
import EmptyResult from "../molecules/EmptyResult";
import SearchBar from "../molecules/SearchBar";
import AmProductCard from "../organisms/card/AmProductCard";


export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const timerRef = useRef<number | null>(null);

  // filter prooducts by "Technology" category
  const techProducts = products.filter((p) => p.category === "Technology");

  // simulate product loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
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

  const refreshProductList = () => {
    setRefreshing(true);

    timerRef.current = setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }} className="px-4 ">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      {isLoading ? (
        <AmLoader visible={isLoading} text="Loading..." />
      ) : (
        <>
          <AppHeader />
          {/* search bar */}
          <View className="px-4 mt-2">
            <SearchBar placeholder="Search..." />
          </View>
          {/* category header */}
          <View className="flex-row items-center justify-between px-4 py-3">
            <TouchableOpacity activeOpacity={0.7} className="flex-row items-center">
              <AntDesign name="arrowleft" size={20} color="#1f2937" />
              <AmText variant='bodyMedium' className="ml-2 text-2xl text-gray-800" style={{ fontWeight: 'bold' }}>
                Technology
              </AmText>
            </TouchableOpacity>
          </View>
          {!techProducts ? (
            <EmptyResult text={'Sorry, No product available for the category at the moment! '} />
          ) : (
            <>
              {/* subheading */}
              <View className="px-4">
                <AmText variant="bodyMedium" className="text-base text-gray-700 mb-4">
                  Smartphones, Laptops & Accessories
                </AmText>
              </View>
              {/* product grid */}
              <FlatList
                data={techProducts}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 16 }}
                // contentContainerStyle={{ paddingTop: 8, paddingBottom: 80 }}
                contentContainerStyle={
                  !isLoading && !techProducts
                    ? { flexGrow: 1, justifyContent: 'center' }
                    : null
                }
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <AmProductCard product={item} />}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={refreshProductList}
              />
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};
