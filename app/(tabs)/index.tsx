import "@/global.css";
import React from "react";
import {
  StatusBar,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }} className="px-4 ">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <Header />
      <View className="px-4 mt-2">
        <SearchBar placeholder="Search..." />
      </View>

      <Text>Welcome to AlphaTwelve MiniMart eCommerce App!!ff!</Text>
    </SafeAreaView>
  );
}

