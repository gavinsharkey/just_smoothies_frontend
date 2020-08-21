import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import BACKEND_URL from './constants/BACKEND_URL'

const SmoothieScreen = ({ smoothie }) => {

  return (
    <View style={{flex: 1}}>
      <Image style={styles.image} source={{uri: `${BACKEND_URL}${smoothie.picture_url}`}} />
      <View style={styles.container}>
        <Text style={styles.headerText}>{smoothie.name}</Text>
        <Text style={styles.text}>{smoothie.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: '#eee',
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  headerText: {
    fontWeight: '700',
    fontSize: 30,
    color: '#222'
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#222',
    fontStyle: 'italic'
  },
  image: {
    height: 300,
    width: '100%',
    resizeMode: 'cover',
    overflow: 'hidden',
    zIndex: 1
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    smoothie: state.smoothiesState.smoothies.find(smoothie => smoothie.id === ownProps.route.params.id)
  }
}

export default connect(mapStateToProps)(SmoothieScreen)
