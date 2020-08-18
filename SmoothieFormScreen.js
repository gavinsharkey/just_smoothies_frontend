import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, TouchableHighlight, Text, Image, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { checkPermissions } from './actions/permissionsActions'
import { addSmoothie } from './actions/smoothieActions'
import BACKEND_URL from './constants/BACKEND_URL'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  formGroup: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  inputGroup: {
    flex: 1,
    marginVertical: 10,
  }, 
  headerText: {
    fontWeight: '700',
    fontSize: 30,
    color: '#222'
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
    color: '#222'
  },
  button: {
    padding: 10,
    backfaceVisibility: 'hidden',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#222'
  },
  buttonText: {
    fontSize: 20,
    color: '#222',
    textAlign: 'center'
  },
  formInput: {
    padding: 5,
    borderColor: '#222',
    borderBottomWidth: 1
  },
  textArea: {
    padding: 5,
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 5,
    height: 100
  }
})

const SmoothieFormScreen = ({ navigation, checkPermissions, addSmoothie, granted, status }) => {
  const [image, setImage] = useState({})
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const nameInput = useRef()
  const descriptionInput = useRef()

  useEffect(() => {
    checkPermissions()
  }, [])

  useEffect(() => {
    if (status !== 'pending' && granted === false) {
      navigation.goBack()
    }
  }, [granted])

  const getImage = () => {
    ImagePicker.launchImageLibraryAsync()
    .then(resp => {
      if (!resp.cancelled) {
        setImage(resp)
      }
    })
  }

  const blurInputs = () => {
    nameInput.current.blur()
    descriptionInput.current.blur()
  }

  const submitSmoothie = () => {
    const [fileName, fileType] = image.uri.split('.')

    const data = new FormData()
    data.append('name', name)
    data.append('description', description)
    data.append('picture', {
      uri: image.uri,
      name: `picture.${fileName}`,
      type: `image/${fileType}`,
    })
    fetch(`${BACKEND_URL}/api/v1/smoothies`, {
      method: 'POST',
      body: data
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.status !== 'error') {
        addSmoothie(json)
        navigation.navigate('Home', {
          newPost: true
        })
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Smoothie</Text>
      <ScrollView style={styles.formGroup} onScroll={blurInputs}>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>Name:</Text>
          <TextInput 
            value={name}
            onChangeText={text => setName(text)} 
            style={styles.formInput}
            ref={nameInput} 
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>Description:</Text>
          <TextInput
            value={description}
            onChangeText={text => setDescription(text)}
            style={styles.textArea}
            multiline
            ref={descriptionInput}
          />
        </View>
        <View style={styles.inputGroup}>
          <TouchableHighlight onPress={getImage}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add An Image</Text>
            </View>
          </TouchableHighlight>
          { image.uri ? (
            <View style={{flex: 1}}>
              <Image width={100} height={100} resizeMode="cover" source={{uri: image.uri}} />
            </View>
          ) : null }
        </View>
        <View style={styles.inputGroup}>
        <TouchableHighlight onPress={submitSmoothie}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = state => {
  return {
    granted: state.permissions.granted,
    status: state.permissions.status
  }
}

export default connect(mapStateToProps, { checkPermissions, addSmoothie })(SmoothieFormScreen)
