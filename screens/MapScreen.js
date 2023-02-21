import {Alert, StyleSheet} from 'react-native';
import React, {useState, useLayoutEffect, useCallback} from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import IconButton from '../components/IconButton';

const MapScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });

  const clickOnMapHandler = event => {
    setLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lon: event.nativeEvent.coordinate.longitude,
    });
  };
  const saveHandler = useCallback(() => {
    if (location.lat && location.lon) {
      navigation.navigate('AddPlaceScreen', {location: location});
    } else {
      Alert.alert('You have to choose a location before saving!');
      return;
    }
  }, [navigation, location]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: ({tintColor}) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={saveHandler}
        />
      ),
    });
  }, [navigation, saveHandler]);
  return (
    <MapView
      onPress={clickOnMapHandler}
      initialRegion={{
        latitude: 48.864717,
        longitude: 2.3528163,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={styles.map}>
      {location.lat && location.lon ? (
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lon,
          }}
        />
      ) : null}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {flex: 1},
});
