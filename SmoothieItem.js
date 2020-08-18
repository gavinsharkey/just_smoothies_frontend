import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import BACKEND_URL from './constants/BACKEND_URL'

export default function SmoothieItem({ navigation, smoothie }) {
  const handlePress = () => {
    navigation.navigate('Smoothie', {
      id: smoothie.id
    })
  }

  return (
    <TouchableOpacity style={{marginVertical: 10}} onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: `${BACKEND_URL}${smoothie.picture_url}`}} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{smoothie.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    overflow: 'hidden'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: '500',
    color: '#222',
    fontSize: 25
  },
  imageContainer: {
    height: '80%',
    width: '100%',
    shadowOpacity: 1,
    shadowOffset: { height: 2, width: 2},
    shadowColor: '#999',
    shadowRadius:  5
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  }
})
