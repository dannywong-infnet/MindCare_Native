import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logotipo from '../../components/Logotipo/Logotipo';
import BannerCadastro from '../../components/BannerCadastro/BannerCadastro';
import CampoInput from '../../components/CampoInput/CampoInput';
import Botao from '../../components/Botao/Botao';
import SelectGenero from '../../components/SelectGenero/SelectGenero';

export default function CadastroPage() {
  const [inputNome, setInputNome] = useState('');
  const [inputSobrenome, setInputSobrenome] = useState('');
  const [inputCPF, setInputCPF] = useState('');
  const [inputDataNascimento, setInputDataNascimento] = useState('');
  const [inputGenero, setInputGenero] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputRePassword, setInputRePassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [cpfMessage, setCpfMessage] = useState('');
  const [senhaMessage, setSenhaMessage] = useState('');

  const navigation = useNavigation();

  const formatCPF = (value) => {
    let valor = value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    if (valor.length > 3) valor = valor.replace(/^(\d{3})(\d)/, '$1.$2');
    if (valor.length > 6) valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    if (valor.length > 9) valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    return valor;
  };

  const onChangeCPF = (value) => {
    setInputCPF(formatCPF(value));
  };

  const onSubmitCadastrar = () => {
    let valid = true;

    if (inputPassword !== inputRePassword) {
      setSenhaMessage('As senhas não conferem.');
      valid = false;
    } else {
      setSenhaMessage('');
    }

    if (inputCPF.replace(/\D/g, '').length !== 11) {
      setCpfMessage('O CPF deve conter 11 números.');
      valid = false;
    } else {
      setCpfMessage('');
    }

    if (!valid) return;

    setLoading(true);
    // Simular cadastro
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.replace('Login');
    }, 1000);
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
        <View style={styles.cadastroContainer}>
          <Logotipo />
          <BannerCadastro
            titulo="Seja bem vindo(a)!"
            subtitulo="Insira seus dados para realizar o cadastro:"
          />
          <View style={styles.cadastroFormContainer}>
            <CampoInput
              placeholder="Nome"
              value={inputNome}
              onChangeText={setInputNome}
              autoCapitalize="words"
            />

            <CampoInput
              placeholder="Sobrenome"
              value={inputSobrenome}
              onChangeText={setInputSobrenome}
              autoCapitalize="words"
            />

            <CampoInput
              placeholder="CPF"
              value={inputCPF}
              onChangeText={onChangeCPF}
              keyboardType="numeric"
            />

            {cpfMessage ? <Text style={styles.mensagemErro}>{cpfMessage}</Text> : null}

            <CampoInput
              placeholder="Data de Nascimento (YYYY-MM-DD)"
              value={inputDataNascimento}
              onChangeText={setInputDataNascimento}
            />

            <SelectGenero
              value={inputGenero}
              onChange={setInputGenero}
            />

            <CampoInput
              placeholder="E-mail"
              value={inputEmail}
              onChangeText={setInputEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <CampoInput
              placeholder="Senha"
              value={inputPassword}
              onChangeText={setInputPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <CampoInput
              placeholder="Confirmar senha"
              value={inputRePassword}
              onChangeText={setInputRePassword}
              secureTextEntry
              autoCapitalize="none"
            />
            
            {senhaMessage ? <Text style={styles.mensagemErro}>{senhaMessage}</Text> : null}

            <Botao onPress={onSubmitCadastrar} disabled={isLoading}>
              Cadastrar
            </Botao>
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
    padding: 20,
  },
  cadastroContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    marginVertical: 40,
  },
  cadastroFormContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '90%',
    width: '100%',
    gap: 12,
    alignSelf: 'center',
  },
  mensagemErro: {
    color: 'red',
    fontSize: 12,
    width: '90%',
    textAlign: 'center',
  },
});
