import "@/global.css";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { FlatList, StatusBar, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AmText } from "../atoms";
import { products } from "../constants/data/products";
import AppHeader from "../molecules/AppHeader";
import SearchBar from "../molecules/SearchBar";
import AmProductCard from "../organisms/card/AmProductCard";


export default function HomeScreen() {
  // filter prooducts by "Technology" category
  const techProducts = products.filter((p) => p.category === "Technology");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }} className="px-4 ">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <AppHeader />
      {/* search bar */}
      <View className="px-4 mt-2">
        <SearchBar placeholder="Search..." />
      </View>
      {/* category header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity activeOpacity={0.7} className="flex-row items-center">
          <AntDesign name="arrowleft" size={20} color="#1f2937" />
          <AmText variant='bodyMedium' className="ml-2 text-2xl font-bold text-gray-800">
            Technology
          </AmText>
        </TouchableOpacity>
      </View>
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
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 80 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AmProductCard product={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

