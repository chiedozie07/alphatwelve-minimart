import { useUser } from '@/hooks/useUser';
import AppHeader from '@/molecules/AppHeader';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { AmCustomButton, AmText } from '../../src/atoms';

export default function ProfileScreen() {
  const { user, setUser, isLoggedIn } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] px-10">
      <AppHeader />
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
    </SafeAreaView>
  );
};