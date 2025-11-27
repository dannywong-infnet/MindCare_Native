import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '../Icon/Icon';
import Logotipo from '../Logotipo/Logotipo';

export default function NavBar() {
  const [active, setActive] = useState(false);
  const navigation = useNavigation();

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  const navigateTo = (route) => {
    if (route === '/') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else {
      navigation.navigate(route);
    }
    setActive(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.logo}>
          <Logotipo variant="secondary" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuBtn} onPress={handleClick}>
          <Icon
            iconName={active ? 'close' : 'menu'}
            color={active ? 'black' : 'white'}
            size={40}
          />
        </TouchableOpacity>

        <Modal
          visible={active}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setActive(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.navList}>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigateTo('Home')}
              >
                <Text style={styles.navLink}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigateTo('Dashboard')}
              >
                <Text style={styles.navLink}>Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigateTo('Perfil')}
              >
                <Text style={styles.navLink}>Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => navigateTo('/')}
              >
                <Text style={styles.navLink}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#926cfa',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 22,
    backgroundColor: '#926cfa',
    position: 'relative',
  },
  logo: {
    zIndex: 30,
  },
  menuBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'transparent',
    zIndex: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  navList: {
    width: '50%',
    minWidth: 200,
    height: '100%',
    paddingTop: 80,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 20,
  },
  navItem: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  navLink: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Ubuntu',
  },
});
