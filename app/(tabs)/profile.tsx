import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { AmText } from '../atoms';
import AppHeader from '../molecules/AppHeader';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <AppHeader />
      <View style={styles.center}>
        <AmText variant="bodyLarge">Profile screen, coming soon...</AmText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center' 
  },
});
