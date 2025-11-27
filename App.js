import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import UsuarioProvider from './src/provider/UsuarioProvider';

// Páginas
import LoginPage from './src/pages/LoginPage/LoginPage';
import CadastroPage from './src/pages/Cadastro/CadastroPage';
import HomePage from './src/pages/Home/HomePage';
import DashboardPage from './src/pages/Dashboard/DashboardPage';
import BuscarTerapeutasPage from './src/pages/BuscarTerapeutasPage/BuscarTerapeutasPage';
import PerfilPage from './src/pages/PerfilPage/PerfilPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UsuarioProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Cadastro" component={CadastroPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Dashboard" component={DashboardPage} />
          <Stack.Screen name="BuscarTerapeutas" component={BuscarTerapeutasPage} />
          <Stack.Screen name="Perfil" component={PerfilPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </UsuarioProvider>
  );
}

