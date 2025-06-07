import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { SearchBarProps } from '../constants/dtos/common';


export default function SearchBar({ value, onSearchChange, placeholder, debounceDelay = 250, style, isSearching = false, ...rest }: SearchBarProps) {
  const [internalText, setInternalText] = useState(value);

  // whenever parent’s value changes (e.g. reset), update internal
  useEffect(() => {
    setInternalText(value);
  }, [value]);

  // debounce effect: wait debounce delay ms after last keystroke
  useEffect(() => {
    const handler = setTimeout(() => {
      if (internalText !== value) {
        onSearchChange(internalText);
      }
    }, debounceDelay);
    return () => clearTimeout(handler);
  }, [internalText, onSearchChange, debounceDelay, value]);

  return (
    <View style={[styles.container, Platform.OS === 'ios' ? styles.iosPadding : styles.androidPadding, style as ViewStyle]}>
      <MaterialCommunityIcons
        name="magnify"
        size={22}
        color="#94a3b8"
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#a1a1aa"
        value={internalText}
        onChangeText={setInternalText}
        autoCorrect={false}
        returnKeyType="search"
        {...rest}
      />
      {isSearching && <ActivityIndicator size={'small'} 
      color={'#888'} 
      // color="#94a3b8"
      style={styles.spinner}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB'
  },
  iosPadding: {
    paddingVertical: 12,
  },
  androidPadding: {
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    padding: 0,
  },
  spinner: {
    marginLeft: 8,
  },
});
