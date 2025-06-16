import { AmText } from '@/atoms';
import { useFavorites } from '@/hooks/useFavorites';
import AppHeader from '@/molecules/AppHeader';
import EmptyResult from '@/molecules/EmptyResult';
import { FavoriteItem } from '@/state/context/FavoritesContext';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const { favorites, removeFavorite } = useFavorites();
  const router = useRouter();

  
  return (
    <SafeAreaView
      // style={{ height: insets.top }}
      className="flex-1 bg-gray-100"
    >
      <AppHeader />
      <View className="px-4 py-2 flex-row items-center justify-start bg-[#f7f7f7]">
        <TouchableOpacity activeOpacity={0.4} onPress={() => router.back()} style={{ flexDirection: 'row', marginRight: 10 }}>
          <AntDesign name="left" size={18} color="#1f2937" className='text-gray-800 font-bold' />
        </TouchableOpacity>
        <AmText variant="titleLarge" className="text-gray-800 font-bold">Favorites</AmText>
      </View>
      {/* if no favorites, show “empty” UI otherwise, render a two column grid of favorites */}
      {favorites.length === 0 ? (
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 justify-center items-center px-4">
            <EmptyResult iconName='heart-off-outline' iconSize={80} title='No favorites yet!' text='Browse products and tap the heart icon to add them here.' />
          </View>
        </SafeAreaView>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <FavoriteCard item={item} />}
        />
      )}
    </SafeAreaView>
  );
}


//  a two column card for each favorite item. 
const FavoriteCard = ({ item }: { item: FavoriteItem }) => {
  const { removeFavorite } = useFavorites();
  const router = useRouter();

  return (
    <TouchableOpacity 
    onPress={() => {
      router.push(`/product/${item.id}`);
    }} 
    className="w-[48%] mb-4 bg-white rounded-lg shadow-md"
    activeOpacity={0.3}
    >
      {/* Image Container */}
      <View className="bg-gray-100 rounded-t-lg h-40 justify-center items-center overflow-hidden">
        <Image
          source={item.image}
          className="w-full h-full"
          resizeMode="contain"
        />
        {/* Remove‐favorite button (heart icon) */}
        <TouchableOpacity
          onPress={() => removeFavorite(item.id)}
          className="absolute justify-center items-center w-12 h-12 top-2 right-2 bg-gray-50 p-1 rounded-full"
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons name="heart" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* details */}
      <View className="px-2 py-2">
        <AmText
          variant="bodyMedium"
          className="text-gray-800 font-semibold"
          numberOfLines={2}
        >
          {item.name}
        </AmText>
        <AmText variant="titleSmall" className="text-blue-500 font-bold mt-1">
          ${item.price.toFixed(2)}
        </AmText>
      </View>
    </TouchableOpacity>
  );
}
