import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchSmoothies } from './actions/smoothieActions'
import BACKEND_URL from './constants/BACKEND_URL'
import SmoothieItem from './SmoothieItem'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const SmoothiesContainer = ({ navigation, smoothies, isRefreshing, fetchSmoothies }) => {
  
  useEffect(() => {
    fetchSmoothies()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={isRefreshing}
        onRefresh={() => fetchSmoothies()}
        keyExtractor={item => String(item.id)}
        data={smoothies}
        renderItem={({item}) => (
          <SmoothieItem smoothie={item} navigation={navigation} />
        )}
      />
    </View>
  )
}

const mapStateToProps = state => {
  return {
    smoothies: state.smoothiesState.smoothies,
    isRefreshing: state.smoothiesState.isRefreshing
  }
}

export default connect(mapStateToProps, { fetchSmoothies })(SmoothiesContainer)
