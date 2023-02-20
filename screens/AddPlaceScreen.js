import {StyleSheet, Text, TextInput, View, Image, Button} from 'react-native';
import React, {useState} from 'react';
import OutlineButton from '../components/OutlineButton';
import Colors from '../constants/colors';
import * as ImagePicker from 'expo-image-picker';

const AddPlaceScreen = () => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
      <TextInput cursorColor={Colors.gray700} style={styles.textInput} />
      <View style={styles.imageContainer}>
        <Text style={styles.fallbackText}>No image taken yet.</Text>
        <Image style={styles.image} />
      </View>
      <OutlineButton icon="camera" style={styles.button}>
        Take Image
      </OutlineButton>
      <View style={styles.imageContainer}>
        <Text style={styles.fallbackText}>No location taken yet.</Text>
        <Image style={styles.image} />
      </View>
      <View style={styles.buttonsContainer}>
        <OutlineButton icon="location" style={styles.smallButton}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" style={styles.smallButton}>
          Pick on Map
        </OutlineButton>
      </View>
      <Button style={styles.button} title="Add Place" />
    </View>
  );
};

export default AddPlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    color: Colors.primary400,
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: Colors.primary100,
    borderRadius: 5,
    height: 35,
    marginBottom: 15,
    padding: 5,
  },
  imageContainer: {
    backgroundColor: Colors.primary100,
    height: 190,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {color: Colors.gray700},
  image: {},
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  smallButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  button: {
    marginBottom: 15,
  },
});
