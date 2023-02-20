import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import Colors from '../constants/colors';
import {Ionicons} from '@expo/vector-icons';

const OutlineButton = ({icon, children, style}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        style,
        pressed ? {opacity: 0.5} : null,
      ]}>
      <Ionicons name={icon} size={18} color={Colors.primary400} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.gray700,
    borderColor: Colors.primary400,
    borderWidth: 1,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  text: {
    color: Colors.primary400,
    marginLeft: 8,
    fontSize: 12,
  },
});
