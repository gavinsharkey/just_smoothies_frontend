import { StatusBar } from 'expo-status-bar';
import * as Permissions from 'expo-permissions'
import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import reducer from './reducers/rootReducer'
import HomeScreen from './HomeScreen'
import SmoothieScreen from './SmoothieScreen'
import SmoothieFormScreen from './SmoothieFormScreen'

const store = createStore(reducer, applyMiddleware(thunk))

const Stack = createStackNavigator()

export default function App() {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} initialParams={{ newPost: false }} />
            <Stack.Screen name="Smoothie" component={SmoothieScreen} options={{headerShown: false}} />
            <Stack.Screen name="SmoothieForm" component={SmoothieFormScreen} options={{title: 'Add Smoothie'}} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
      <StatusBar />
    </Provider>
    );
}
