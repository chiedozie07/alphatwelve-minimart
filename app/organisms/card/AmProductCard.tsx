import { Product } from "@/app/constants/dtos/common";
import AmCard from "@/app/molecules/AmCard";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  product: Product;
};

const AmProductCard: React.FC<Props> = ({ product }) => {
  // const router = useRouter();

  return (
    <TouchableOpacity activeOpacity={0.5}
    className="bg-white mb-4 shadow-sm"
    style={{ width: "48%", borderRadius: 16 }}
    // onPress={() => {
    //   router.push(`/product/${product.id}`);
    // }} 
    >
      <AmCard>
        <View className="bg-gray-100 rounded-lg justify-center items-center h-40 overflow-hidden">
          <Image
            source={product.image}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <View className="p-2">
          <Text variant="titleSmall" className="mt-2 text-gray-500 font-medium">
            {product.name}
          </Text>
          <Text variant="titleMedium" className="text-black font-bold mt-1">
            ${product.price.toFixed(2)}
          </Text>
        </View>
      </AmCard>
    </TouchableOpacity>
  );
};

export default AmProductCard;

const styles = StyleSheet.create({
  cardWrapper: {
    width: "48%",
    padding: 8,
  },
  imageContainer: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  productPrice: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
});