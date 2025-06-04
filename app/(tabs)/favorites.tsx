import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AmText } from '../atoms';

const Favorites = () => {
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center',}}>
      <AmText  style={{fontWeight: 'bold'}}>Favorites</AmText>
    </SafeAreaView>
  )
};

export default Favorites;

const styles = StyleSheet.create({})