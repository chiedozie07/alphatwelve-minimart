import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";
import { AmText } from "../../src/atoms";

const AppHeader = () => {
  const router = useRouter();

  return (
    // <SafeAreaView
    //   edges={["top", "left", "right"]}
    //   style={{ backgroundColor: "#FFFFFF" }}
    // >
      <View
        className="flex-row items-center justify-between pr-4 py-3 bg-gray-100"
        style={{ borderBottomWidth: 0.3, borderBottomColor: "#E5E7EB" }}
      >
        {/* app logo */}
        <TouchableOpacity
          className={`flex items-center justify-center ${
            Platform.OS === "web" ? "ml-5" : ""
          }`}
          onPress={() => router.push("/")}
        >
          <Image
            source={require("assets/images/logo/alphatwelve-minimart-logo.png")}
            style={{
              width: 55,
              height: 45,
              // borderRadius: 50,
            }}
            resizeMode="contain"
            className="justify-start ml-0 pl-0"
          />
          {Platform.OS === "web" ? (
            <AmText
              variant="labelMedium"
              className="text-[10px] text-gray-800 mt-0.5"
            >
              AlphaTwelve Minimart
            </AmText>
          ) : null}
        </TouchableOpacity>

        {/* delivery address */}
        <View className="items-center">
          <AmText
            variant="labelMedium"
            className="text-sm font-bold text-gray-800"
          >
            DELIVERY ADDRESS
          </AmText>
          <AmText
            variant="labelSmall"
            className="text-[10px] text-gray-600 mt-0.5"
          >
            Umuezike Road, Oyo State
          </AmText>
        </View>

        {/* notification icon */}
        <TouchableOpacity activeOpacity={0.5}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color="#374151"
          />
        </TouchableOpacity>
      </View>
    // </SafeAreaView>
  );
};

export default AppHeader;
