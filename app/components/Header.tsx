import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Header = () => {

	return (
		<SafeAreaView style={{ backgroundColor: "#FFFFFF", marginVertical: 15 }} edges={["top", "left", "right"]}>
			<View className="flex-row items-center justify-between px-4 py-3 bg-white" style={{ borderBottomWidth: 0.3, borderBottomColor: "#E5E7EB" }}>
				{/* Left: Full Logo Placeholder */}
				<View className="h-8 w-24 bg-blue-100 rounded-sm justify-center items-center"
				// TODO: replace this box with: <Image source={require('../assets/your-logo.png')} style={{ width: 96, height: 32 }} resizeMode="contain" />
				>
					<Text className="text-blue-600 font-bold">Full Logo</Text>
				</View>

				{/* Center: DELIVERY ADDRESS + subtext */}
				<View className="items-center">
					<Text className="text-xs font-bold text-gray-800">
						DELIVERY ADDRESS
					</Text>
					<Text className="text-[10px] text-gray-600 mt-0.5">
						Umuezike Road, Oyo State
					</Text>
				</View>

				{/* Right: Bell Icon */}
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
