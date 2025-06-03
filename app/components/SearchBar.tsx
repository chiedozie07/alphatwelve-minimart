import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

export default function SearchBar({placeholder}: { placeholder: string; }) {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mt-2 mb-10">
      <MaterialCommunityIcons
        name="magnify"
        size={20}
        color="#94a3b8"
        style={{ marginRight: 8 }}
      />
      <TextInput
        className="flex-1 text-gray-700"
        placeholder={placeholder}
        placeholderTextColor="#a1a1aa"
      />
    </View>
  );
};
