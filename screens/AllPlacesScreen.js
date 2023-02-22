import {Alert, FlatList, StyleSheet, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import PlaceItem from '../components/PlaceItem';
import {fetchPlaces} from '../util/database';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {init} from '../util/database';
import Colors from '../constants/colors';
const AllPlacesScreen = () => {
  const navigation = useNavigation();
  const [listPlaces, setListPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    try {
      init();
    } catch (error) {
      Alert.alert('There was an error');
    }
    const loadPlaces = async () => {
      try {
        const places = await fetchPlaces();
        setListPlaces(places);
      } catch (error) {
        Alert.alert("There's an error");
      }
    };
    if (isFocused) {
      try {
        loadPlaces();
      } catch (error) {
        Alert.alert("There's an error");
      }
    }
  }, [isFocused]);

  const selectPlaceHandler = id => {
    navigation.navigate('DetailScreen', {id: id});
  };

  if (!listPlaces || listPlaces.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={listPlaces}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <PlaceItem onSelect={selectPlaceHandler} place={itemData.item} />
        )}
      />
    </View>
  );
};

export default AllPlacesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
