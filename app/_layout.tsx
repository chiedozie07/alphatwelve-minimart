import { DefaultTheme as NavigationDefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme as PaperDefaultTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProviders } from './context/AppProviders';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null; // optionally show a SplashScreen or loader
  }

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
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="product/[id]" />
            </Stack>
          </ThemeProvider>
        </AppProviders>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
