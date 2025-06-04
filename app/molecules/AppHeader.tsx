import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { AmText } from "../atoms";


const AppHeader = () => {

  return (
    <View style={{ backgroundColor: "#FFFFFF", marginBottom: 10 }} edges={["top", "left", "right"]}>
      <View className="flex-row items-center justify-between pr-4 py-3 bg-white" style={{ borderBottomWidth: 0.3, borderBottomColor: "#E5E7EB" }}>
        <Image source={require('@/assets/images/logo/alphatwelve-minimart-logo.png')} style={{ width: 55, height: 45, borderRadius: 50 }} resizeMode="contain" className="justify-start ml-0 pl-0" />
        <View className="items-center">
          <AmText variant="labelMedium" className="text-sm font-bold text-gray-800">
            DELIVERY ADDRESS
          </AmText>
          <AmText variant="labelSmall" className="text-[10px] text-gray-600 mt-0.5">
            Umuezike Road, Oyo State
          </AmText>
        </View>
        <TouchableOpacity activeOpacity={0.5}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color="#374151"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;
