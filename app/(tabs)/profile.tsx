import React from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { AmText } from '../atoms';
import { useUser } from '../hooks/useUser';
import AppHeader from '../molecules/AppHeader';

export default function ProfileScreen() {
  const { user, setUser, isLoggedIn } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <AppHeader />
      {isLoggedIn ? (
        <View className='items-center justify-center'>
          <AmText variant="titleMedium">Hello, {user?.name}!</AmText>
          <AmText variant="bodyLarge">Profile screen, coming soon...</AmText>
        </View>
      ) : (
        <Button
          title="Log In"
          onPress={() =>
            setUser({ id: 'u1', name: 'Guest', email: 'jane@example.com' })
          }
        />
      )}
    </SafeAreaView>
  );
};