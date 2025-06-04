import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { AmText } from '../atoms'

const Profile = () => {
  return (
    <SafeAreaView className='flex: 1, items-center'>
      <AmText style={{fontWeight: 'bold'}}>Profile</AmText>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})