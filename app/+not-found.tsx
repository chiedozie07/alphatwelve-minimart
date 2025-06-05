import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AmText } from './atoms';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '😢 Oops!' }} />
      <View style={styles.container}>
        <AmText variant='headlineMedium'>This screen does not exist.</AmText>
        <Link href="/" style={styles.link} className="flex-row h-auto w-auto bg-blue-100 rounded-md justify-center items-center py-3 px-3">
          <AmText variant='labelMedium' className="text-blue-600 font-bold text-center">Go to home screen!</AmText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
