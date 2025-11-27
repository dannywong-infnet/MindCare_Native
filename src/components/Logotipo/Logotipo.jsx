import React from 'react';
import { Image, StyleSheet } from 'react-native';
import logo1 from '../../../assets/images/logo.png';
import logo2 from '../../../assets/images/logo2.png';

export default function Logotipo({ variant = 'primary' }) {
  const logoSrc = variant === 'secondary' ? logo2 : logo1;

  return <Image source={logoSrc} style={styles.logo} />;
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
});
