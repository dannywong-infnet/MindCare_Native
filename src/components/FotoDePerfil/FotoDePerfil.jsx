import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Importar imagens estáticas (Metro bundler requer imports estáticos)
// Imagens movidas para assets/images/
const imagensPacientes = {
  'amanda_silva.png': require('../../../assets/images/amanda_silva.png'),
  'gabriel_machado.png': require('../../../assets/images/gabriel_machado.png'),
};

const imagensTerapeutas = {
  'daniel_monteiro.png': require('../../../assets/images/daniel_monteiro.png'),
  'erina_yoshida.png': require('../../../assets/images/erina_yoshida.png'),
  'lucia_almeida.png': require('../../../assets/images/lucia_almeida.png'),
  'marcos_souza.png': require('../../../assets/images/marcos_souza.png'),
  'marina_campos.png': require('../../../assets/images/marina_campos.png'),
  'rafael_oliveira.png': require('../../../assets/images/rafael_oliveira.png'),
};

export default function FotoDePerfil({ img }) {
  let imageSource;
  
  if (!img) {
    imageSource = { uri: 'https://i.pravatar.cc/300' };
  } else if (typeof img === 'string') {
    // Se for URL completa
    if (img.startsWith('http') || img.startsWith('https')) {
      imageSource = { uri: img };
    } 
    // Se for caminho relativo, extrair nome do arquivo
    else if (img.includes('/')) {
      const fileName = img.split('/').pop();
      
      // Tentar encontrar nas imagens de pacientes
      if (imagensPacientes[fileName]) {
        imageSource = imagensPacientes[fileName];
      }
      // Tentar encontrar nas imagens de terapeutas
      else if (imagensTerapeutas[fileName]) {
        imageSource = imagensTerapeutas[fileName];
      }
      // Se não encontrar, usar placeholder
      else {
        imageSource = { uri: 'https://i.pravatar.cc/300' };
      }
    }
    // Se for só o nome do arquivo
    else {
      if (imagensPacientes[img]) {
        imageSource = imagensPacientes[img];
      } else if (imagensTerapeutas[img]) {
        imageSource = imagensTerapeutas[img];
      } else {
        imageSource = { uri: 'https://i.pravatar.cc/300' };
      }
    }
  } else {
    // Se já for um objeto de source
    imageSource = img;
  }

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.imgPerfil} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
