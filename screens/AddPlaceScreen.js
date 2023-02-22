import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OutlineButton from '../components/OutlineButton';
import Colors from '../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {Place} from '../models/place';
import {insertPlace} from '../util/database';
const AddPlaceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    setLocation({
      lat: route.params?.location.lat,
      lon: route.params?.location.lon,
    });
  }, [route.params?.location]);
  const [imagePickerStatus, requestImagePickerPermission] =
    ImagePicker.useCameraPermissions();
  const [getLocationStatus, requestGetLocationPermission] =
    Location.useForegroundPermissions();

  const [image, setImage] = useState();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });

  const addPlaceHandler = async () => {
    if (!getLocationStatus.granted) {
      try {
        const response = await requestGetLocationPermission();
        if (!response.granted) {
          Alert.alert(
            'You have to grant the permission to get access to all fonctionalities of the application!',
          );
          return;
        }
      } catch (error) {
        Alert.alert('An error occurred!');
        return;
      }
    }
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude: location.lat,
        longitude: location.lon,
      });
      const readableAddress = `${address[0].streetNumber} ${address[0].street}, ${address[0].city} ${address[0].postalCode}`;
      const locationObject = {
        ...location,
        address: readableAddress,
      };
      insertPlace({
        title: title,
        imageUri: image,
        ...locationObject,
      });
      navigation.navigate('AllPlacesScreen');
    } catch (error) {
      Alert.alert('An error occurred!');
    }
  };
  const takeImageHandler = async () => {
    if (!imagePickerStatus.granted) {
      try {
        const response = await requestImagePickerPermission();
        if (!response.granted) {
          Alert.alert(
            'You have to grant the permission to get access to all fonctionalities of the application!',
          );
          return;
        }
      } catch (error) {
        Alert.alert('An error occurred!');
        return;
      }
    }
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      setImage(result.assets[0].uri);
    } catch (error) {
      return;
    }
  };

  const getUserLocation = async () => {
    if (!getLocationStatus.granted) {
      try {
        const response = await requestGetLocationPermission();
        if (!response.granted) {
          Alert.alert(
            'You have to grant the permission to get access to all fonctionalities of the application!',
          );
          return;
        }
      } catch (error) {
        Alert.alert('An error occurred!');
        return;
      }
    }
    try {
      const result = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: result.coords.latitude,
        lon: result.coords.longitude,
      });
    } catch (error) {
      Alert.alert('An error occurred!');
      return;
    }
  };

  const pickOnMapHandler = async () => {
    navigation.navigate('MapScreen');
  };

  const changeTextHandler = changedText => {
    setTitle(changedText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
      <TextInput
        onChangeText={changeTextHandler}
        value={title}
        cursorColor={Colors.gray700}
        style={styles.textInput}
      />
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{uri: image}} style={styles.image} />
        ) : (
          <Text style={styles.fallbackText}>No image taken yet.</Text>
        )}
      </View>
      <OutlineButton
        onPress={takeImageHandler}
        icon="camera"
        style={styles.button}>
        Take Image
      </OutlineButton>
      <View style={styles.imageContainer}>
        {location.lat && location.lon ? (
          <MapView
            rotateEnabled={false}
            minZoomLevel={14}
            scrollEnabled={false}
            zoomEnabled={false}
            style={styles.image}
            region={{
              latitude: location.lat,
              longitude: location.lon,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}>
            <Marker
              coordinate={{
                latitude: location.lat,
                longitude: location.lon,
              }}
            />
          </MapView>
        ) : (
          <Text style={styles.fallbackText}>No location taken yet.</Text>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <OutlineButton
          onPress={getUserLocation}
          icon="location"
          style={styles.smallButton}>
          Locate User
        </OutlineButton>
        <OutlineButton
          onPress={pickOnMapHandler}
          icon="map"
          style={styles.smallButton}>
          Pick on Map
        </OutlineButton>
      </View>
      <Button
        onPress={addPlaceHandler}
        style={styles.button}
        title="Add Place"
      />
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
  image: {
    height: '100%',
    width: '100%',
  },
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
