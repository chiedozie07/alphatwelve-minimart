import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Platform, TextInput, View } from "react-native";

export default function SearchBar({placeholder}: { placeholder: string; }) {
  return (
    <View className={`flex-row items-center bg-gray-100 rounded-lg px-3 ${Platform.OS === 'ios' ? 'py-3' : 'py-2'} mt-2 mb-5`}>
      <MaterialCommunityIcons
        name="magnify"
        size={22}
        color="#94a3b8"
        style={{ marginRight: 8 }}
      />
      <TextInput
        className="flex-1 text-gray-700 border-0 border-gray-100 border-collapse"
        placeholder={placeholder}
        placeholderTextColor="#a1a1aa"
      />
    </View>
  );
};
