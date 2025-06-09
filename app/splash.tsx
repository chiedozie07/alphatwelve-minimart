import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AmText } from '../src/atoms';


interface Props {
  onFinish: () => void;
};

const SplashScreenComponent: React.FC<Props> = ({ onFinish }) => {
  // animated values for logo, name, and slogan
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const nameOpacity = useRef(new Animated.Value(0)).current;
  const sloganOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(nameOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(sloganOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start(async () => {
          // wait additional 5 seconds after all animations &  notify the parent layout to hide splash
          setTimeout(() => {
            onFinish();
          }, 5000);
        });
      });
    });
  }, [logoOpacity, logoScale, nameOpacity, sloganOpacity, onFinish]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* overlay the animated splash UI on top of everything */}
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Image
            source={require('../assets/images/logo/alphatwelve-minimart-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.View style={[styles.textWrapper, { opacity: nameOpacity }]}>
          <Text style={styles.brandName}>AlphaTwelve Minimart</Text>
        </Animated.View>
        <Animated.View style={[styles.textWrapper, { opacity: sloganOpacity }]}>
          <AmText variant='titleSmall' style={styles.slogan}>
            ...discover, shop and smile.
          </AmText>
        </Animated.View>
        <ActivityIndicator
          size="large"
          color="#00A58C"
          style={styles.spinner}
        />
      </SafeAreaView>
    </View>
  );
};

export default SplashScreenComponent;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  logoWrapper: {
    width: 128,
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 128,
    height: 128,
  },
  textWrapper: {
    marginTop: 8,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  slogan: {
    fontSize: 16,
    fontWeight: '400',
    color: '#374151',
    textAlign: 'center',
    marginTop: 4,
  },
  spinner: {
    marginTop: 24,
  },
});
