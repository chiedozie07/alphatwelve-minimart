import { AppProviders } from '@/state/context/AppProviders';
import {
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useNavigation, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import "global.css";
import React, { useEffect, useState } from 'react';
import { MD3LightTheme as PaperDefaultTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreenComponent from './splash';


// Keep the splash visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')});
  const [showSplash, setShowSplash] = useState(true);
  const navigation = useNavigation();
  const router = useRouter();
  

  // hide native splash when fonts load
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (showSplash) {
    return (
      <>
        <StatusBar style="light" />
        <SplashScreenComponent onFinish={() => setShowSplash(false)} />
      </>
    );
  }

  // finally render the main app
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
            <StatusBar style="light" />
              <Slot />
          </ThemeProvider>
        </AppProviders>
      </SafeAreaProvider>
    </PaperProvider>
  );
};
