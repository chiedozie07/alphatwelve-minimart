import React from "react";
import {
  StatusBar,
  Text,
  View
} from "react-native";
// import SearchBar from "../components/SearchBar";
// import ProductCard from "../components/ProductCard";
// import { products } from "../data/products";
import "@/global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }} className="px-4 ">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <Header />
      {/* Search Bar */}
      <View className="px-4 mt-2">
        <SearchBar placeholder="Search..." />
      </View>

      {/* SEARCH BAR, CATEGORY, SUBHEADING, PRODUCT GRID, etc. */}
      <Text>Welcome to AlphaTwelve MiniMart eCommerce App!!ff!</Text>
    </SafeAreaView>
  );
}

