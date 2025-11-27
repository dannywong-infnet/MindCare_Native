import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function CampoInput({ style, ...props }) {
  return (
    <TextInput
      {...props}
      style={[styles.campoEntradaForm, style]}
      placeholderTextColor="#c1c1c1"
    />
  );
}

const styles = StyleSheet.create({
  campoEntradaForm: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 10,
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 19,
    width: '90%',
    maxWidth: 400,
    height: 46,
    fontFamily: 'Ubuntu',
    fontWeight: '400',
    fontSize: 14,
    color: '#4a4949',
    alignSelf: 'center',
  },
});
