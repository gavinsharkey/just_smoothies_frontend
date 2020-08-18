import React, { useEffect } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import SmoothiesContainer from './SmoothiesContainer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  headerText: {
    fontWeight: '700',
    fontSize: 55,
    color: '#222'
  }
})

const HomeScreen = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Add" onPress={() => {
        navigation.navigate('SmoothieForm')
      }} />,
      headerRightContainerStyle: { marginRight: 20}
    })
  })

  console.log(route.params.newPost)

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Smoothies</Text>
      <SmoothiesContainer newPost={route.params.newPost} navigation={navigation} />
    </View>
  )
}

export default HomeScreen