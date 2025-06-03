import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Header = () => {

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", marginVertical: 15 }} edges={["top", "left", "right"]}>
      <View className="flex-row items-center justify-between px-4 py-3 bg-white" style={{ borderBottomWidth: 0.3, borderBottomColor: "#E5E7EB" }}>
        <Image source={require('@/assets/images/logo/alphatwelve-minimart-logo.png')} style={{ width: 60, height: 50, borderRadius: 50 }} resizeMode="contain" className="justify-start ml-0 pl-0" />
        <View className="items-center">
          <Text className="text-sm font-bold text-gray-800">
            DELIVERY ADDRESS
          </Text>
          <Text className="text-[10px] text-gray-600 mt-0.5">
            Umuezike Road, Oyo State
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color="#374151"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;
