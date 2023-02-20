import {Pressable} from 'react-native';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
const IconButton = ({icon, size, color, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => (pressed ? {opacity: 0.6} : null)}
      onPress={onPress}>
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
