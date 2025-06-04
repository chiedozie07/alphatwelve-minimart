import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { AmText } from '../atoms'

const Cart = () => {
  return (
    <SafeAreaView className='flex-1 items-center'>
      <AmText style={{fontWeight: 'bold'}}>Cart Tab</AmText>
    </SafeAreaView>
  )
}

export default Cart;

const styles = StyleSheet.create({})