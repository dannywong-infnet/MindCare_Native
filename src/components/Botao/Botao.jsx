import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Botao({ children, style, ...rest }) {
  return (
    <TouchableOpacity style={[styles.botao, style]} {...rest}>
      <Text style={styles.texto}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    fontFamily: 'Ubuntu',
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#926cfa',
    borderRadius: 8,
    width: 350,
    maxWidth: '90%',
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  texto: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Ubuntu',
  },
});
