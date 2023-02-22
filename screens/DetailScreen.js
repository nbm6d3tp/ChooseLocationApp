import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ScrollView, Image, View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import OutlinedButton from '../components/OutlineButton';
import Colors from '../constants/colors';
import {fetchPlaceDetails} from '../util/database';

function PlaceDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const [fetchedPlace, setFetchedPlace] = useState();
  const idPlace = route.params?.id;
  useEffect(() => {
    fetchPlaceDetails(idPlace)
      .then(value => {
        setFetchedPlace(value);
        navigation.setOptions({
          title: value.title,
        });
      })
      .catch(() => {
        Alert.alert('There was an error');
      });
  }, [idPlace, navigation]);

  const showOnMapHandler = () => {
    navigation.navigate('MapScreen', {...fetchedPlace.location});
  };

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: fetchedPlace.imageUri}} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton
          style={styles.button}
          icon="map"
          onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 10,
  },
});
