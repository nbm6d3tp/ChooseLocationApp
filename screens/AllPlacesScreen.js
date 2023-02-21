import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const AllPlacesScreen = () => {
  const route = useRoute();
  console.log(route.params?.place);
  return (
    <View>
      <Text>{route.params?.place.title}</Text>
      <Text>{route.params?.place.imageUri}</Text>
      <Text>{route.params?.place.location.lat}</Text>
      <Text>{route.params?.place.location.lon}</Text>
    </View>
  );
};

export default AllPlacesScreen;

const styles = StyleSheet.create({});
