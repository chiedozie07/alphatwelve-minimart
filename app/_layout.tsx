import {
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { MD3LightTheme as PaperDefaultTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreenComponent from './splash';
import { AppProviders } from './state/context/AppProviders';

// Keep the splash visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')});
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleSplashFinish = () => {
    setShowSplash(false);
      // router.replace('/(tabs)');
  };

  if (!fontsLoaded) return null;

  if (showSplash) {
    return (
      <>
        <StatusBar style="dark" />
        <SplashScreenComponent onFinish={handleSplashFinish} />
      </>
    );
  }

  // 3) After 2s, render the actual app
  const paperTheme = {
    ...PaperDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: '#0f172a',
      secondary: '#60B5FF',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#0f172a',
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <AppProviders>
          <ThemeProvider value={NavigationDefaultTheme}>
            <StatusBar style="dark" />
            <Stack screenOptions={{headerShown: false}}>
              <Slot />
            </Stack>
          </ThemeProvider>
        </AppProviders>
      </SafeAreaProvider>
    </PaperProvider>
  );
};
