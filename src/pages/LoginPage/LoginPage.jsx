import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logotipo from '../../components/Logotipo/Logotipo';
import BannerCadastro from '../../components/BannerCadastro/BannerCadastro';
import CampoInput from '../../components/CampoInput/CampoInput';
import Botao from '../../components/Botao/Botao';
import UsuarioContext from '../../context/UsuarioContext';
import { loadPacientes } from '../../services/dataService';

export default function LoginPage() {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigation = useNavigation();

  const { logIn } = useContext(UsuarioContext);

  const onClickAcessar = async () => {
    setMessage(null);
    setLoading(true);

    try {
      const lista = await loadPacientes();
      const user = Array.isArray(lista)
        ? lista.find((p) => p.username === inputUsername)
        : (lista && lista[inputUsername]) || null;
      
      if (user && user.senha === inputPassword) {
        logIn(inputUsername);
        navigation.replace('Home');
      } else {
        setMessage('Senha não confere.');
      }
    } catch (error) {
      setMessage('Usuário não encontrado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.loginPageContent}>
          <View style={styles.header}>
            <Logotipo />
            <BannerCadastro
              titulo="Entre na sua conta"
              subtitulo="Ainda não tem cadastro?"
              link="Cadastro"
              texto="Cadastre-se"
            />
          </View>
          <View style={styles.main}>
            <View style={styles.loginFormContainer}>
              <CampoInput
                placeholder="username"
                value={inputUsername}
                onChangeText={setInputUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <CampoInput
                placeholder="senha"
                value={inputPassword}
                onChangeText={setInputPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <View style={styles.message}>
                {isLoading && <Text style={styles.loadingText}>Verificando credenciais...</Text>}
                {message && <Text style={styles.errorText}>{message}</Text>}
                <TouchableOpacity onPress={() => Alert.alert('Recuperar Senha', 'Funcionalidade em desenvolvimento')}>
                  <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>

              <Botao onPress={onClickAcessar} disabled={isLoading}>
                Acessar
              </Botao>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginPageContent: {
    maxWidth: '90%',
    width: '100%',
    gap: 32,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  main: {
    gap: 24,
  },
  loginFormContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    alignSelf: 'center',
  },
  message: {
    gap: 10,
    padding: 5,
    width: '90%',
    alignItems: 'center',
  },
  loadingText: {
    color: '#926cfa',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  forgotPassword: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#926cfa',
  },
});
