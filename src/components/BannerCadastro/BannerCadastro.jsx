import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BannerCadastro({ titulo, subtitulo, link, texto }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (link) {
      navigation.navigate(link);
    }
  };

  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerTitulo}>{titulo}</Text>
      {subtitulo && (
        <View style={styles.subtituloContainer}>
          <Text style={styles.bannerSubtitulo}>{subtitulo} </Text>
          {texto && link && (
            <TouchableOpacity onPress={handlePress}>
              <Text style={styles.link}>{texto}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  bannerTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  subtituloContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bannerSubtitulo: {
    fontSize: 14,
    textAlign: 'center',
  },
  link: {
    fontSize: 14,
    color: '#926cfa',
    textDecorationLine: 'underline',
  },
});
