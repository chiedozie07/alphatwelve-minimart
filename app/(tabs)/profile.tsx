import { useUser } from '@/hooks/useUser';
import AppHeader from '@/molecules/AppHeader';
import React from 'react';
import { SafeAreaView, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AmCustomButton, AmText } from '../../src/atoms';

export default function ProfileScreen() {
  const { user, setUser, isLoggedIn } = useUser();
  const {height, width} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
     <SafeAreaView
          style={{ paddingTop: insets.top }}
          className="flex-1 bg-gray-100"
        >
      <AppHeader />
      <View className='px-4'>
        {isLoggedIn ? (
          <View className='items-center justify-center mt-10'>
            <AmText variant="titleMedium">Hello, {user?.name}!</AmText>
            <AmText variant="bodyLarge">Profile screen, coming soon...</AmText>
          </View>
        ) : (
          <View className='items-center justify-center mt-10'>
            <AmCustomButton
              title="Login"
              onPress={() =>
                setUser({ id: 'u1', name: 'Guest', email: 'jane@example.com' })
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};