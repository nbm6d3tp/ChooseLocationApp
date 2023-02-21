import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllPlacesScreen from './screens/AllPlacesScreen';
import DetailScreen from './screens/DetailScreen';
import AddPlaceScreen from './screens/AddPlaceScreen';
import MapScreen from './screens/MapScreen';
import Colors from './constants/colors';
import IconButton from './components/IconButton';
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.gray700,
        headerStyle: {backgroundColor: Colors.primary400},
        contentStyle: {backgroundColor: Colors.gray700},
      }}>
      <Stack.Screen
        options={{
          title: 'Your Favortie Places',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: ({tintColor}) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate('AddPlaceScreen')}
            />
          ),
        }}
        name="AllPlacesScreen"
        component={AllPlacesScreen}
      />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen
        options={{
          title: 'Add a new place',
        }}
        name="AddPlaceScreen"
        component={AddPlaceScreen}
      />
      <Stack.Screen
        options={{
          title: 'Map',
        }}
        name="MapScreen"
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
