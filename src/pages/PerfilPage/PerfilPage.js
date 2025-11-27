import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import NavBar from '../../components/NavBar/NavBar';
import UsuarioContext from '../../context/UsuarioContext';
import CampoInput from '../../components/CampoInput/CampoInput';
import Botao from '../../components/Botao/Botao';
import { loadPacientes } from '../../services/dataService';

// Importar imagens estáticas
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

// Função helper para resolver a imagem
const getImageSource = (img) => {
  if (!img) {
    return { uri: 'https://i.pravatar.cc/300' };
  }
  
  if (typeof img === 'string') {
    // Se for URL completa
    if (img.startsWith('http') || img.startsWith('https')) {
      return { uri: img };
    }
    
    // Extrair nome do arquivo
    const fileName = img.includes('/') ? img.split('/').pop() : img;
    
    // Tentar encontrar nas imagens
    if (imagensPacientes[fileName]) {
      return imagensPacientes[fileName];
    }
    if (imagensTerapeutas[fileName]) {
      return imagensTerapeutas[fileName];
    }
    
    // Fallback para placeholder
    return { uri: 'https://i.pravatar.cc/300' };
  }
  
  return img;
};

export default function PerfilPage() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  const { usuario } = useContext(UsuarioContext);
  const user = usuario.nomeUsuario;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await loadPacientes();
        const paciente = Array.isArray(data)
          ? data.find((p) => p.username === user)
          : (data && data[user]) || null;

        if (paciente) {
          const pacienteCompleto = {
            ...paciente,
            telefone: paciente.telefone || '',
            profissao: paciente.profissao || '',
            estadoCivil: paciente.estadoCivil || '',
            rua: paciente.rua || '',
            numero: paciente.numero || '',
            cep: paciente.cep || '',
            endereco: paciente.endereco || '',
          };
          setUserData(pacienteCompleto);
          setFormData(pacienteCompleto);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (!userData) {
    return (
      <>
        <NavBar />
        <View style={styles.loadingContainer}>
          <Text>Carregando perfil...</Text>
        </View>
      </>
    );
  }

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Dados a serem salvos:', formData);
    setUserData(formData);
    setEditMode(false);
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancel = () => {
    setFormData(userData);
    setEditMode(false);
    Alert.alert('Cancelado', 'Edição cancelada.');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChangePassword = () => {
    Alert.alert('Trocar Senha', 'Funcionalidade de troca de senha ativada!');
  };

  return (
    <>
      <NavBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.perfilContainer}>
            <View style={styles.perfilFormContainer}>
              <View style={styles.perfilImgContainer}>
                <Image 
                  source={getImageSource(userData.img)}
                  style={styles.perfilImg}
                />
              </View>
              <Text style={styles.nomeCompleto}>
                {userData.nome} {userData.sobrenome}
              </Text>
              {message ? <Text style={styles.message}>{message}</Text> : null}

              {!editMode ? (
                <View style={styles.perfilDados}>
                  <Text style={styles.dado}>
                    <Text style={styles.bold}>Email:</Text> {userData.email}
                  </Text>
                  <Text style={styles.dado}>
                    <Text style={styles.bold}>CPF:</Text> {userData.cpf}
                  </Text>
                  <Text style={styles.dado}>
                    <Text style={styles.bold}>Gênero:</Text> {userData.genero || 'Não informado'}
                  </Text>
                  <Text style={styles.dado}>
                    <Text style={styles.bold}>Data de Nascimento:</Text> {userData.dataNascimento || 'Não informada'}
                  </Text>
                  <Text style={styles.dado}>
                    <Text style={styles.bold}>Telefone:</Text> {userData.telefone || 'Não informado'}
                  </Text>
                  <Text style={styles.dado}>
                    <Text style={styles.bold}>Profissão:</Text> {userData.profissao || 'Não informada'}
                  </Text>
                  <Text style={styles.dado}>
                    <Text style={styles.bold}>Estado Civil:</Text> {userData.estadoCivil || 'Não informado'}
                  </Text>
                  <Text style={styles.dado}>
                    <Text style={styles.bold}>Endereço:</Text>{' '}
                    {userData.endereco ||
                      `${userData.rua || ''} ${userData.numero || ''}, ${userData.cidade || ''}, ${userData.estado || ''}`.trim() ||
                      'Não informado'}
                  </Text>
                  <Text style={styles.dado}>
                    <Text style={styles.bold}>CEP:</Text> {userData.cep || 'Não informado'}
                  </Text>
                  <Botao onPress={() => setEditMode(true)} style={styles.button}>
                    Editar Dados
                  </Botao>
                  <Botao onPress={handleChangePassword} style={styles.button}>
                    Trocar Senha
                  </Botao>
                </View>
              ) : (
                <View style={styles.formContainer}>
                  <CampoInput
                    placeholder="Nome"
                    value={formData.nome}
                    onChangeText={(value) => handleInputChange('nome', value)}
                  />
                  <CampoInput
                    placeholder="Sobrenome"
                    value={formData.sobrenome}
                    onChangeText={(value) => handleInputChange('sobrenome', value)}
                  />
                  <CampoInput
                    placeholder="CPF"
                    value={formData.cpf}
                    onChangeText={(value) => handleInputChange('cpf', value)}
                  />
                  <CampoInput
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <CampoInput
                    placeholder="Data de Nascimento (YYYY-MM-DD)"
                    value={formData.dataNascimento}
                    onChangeText={(value) => handleInputChange('dataNascimento', value)}
                  />
                  <CampoInput
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChangeText={(value) => handleInputChange('telefone', value)}
                    keyboardType="phone-pad"
                  />
                  <CampoInput
                    placeholder="Profissão"
                    value={formData.profissao}
                    onChangeText={(value) => handleInputChange('profissao', value)}
                  />
                  <CampoInput
                    placeholder="Rua"
                    value={formData.rua}
                    onChangeText={(value) => handleInputChange('rua', value)}
                  />
                  <CampoInput
                    placeholder="Número"
                    value={formData.numero}
                    onChangeText={(value) => handleInputChange('numero', value)}
                  />
                  <CampoInput
                    placeholder="CEP"
                    value={formData.cep}
                    onChangeText={(value) => handleInputChange('cep', value)}
                    keyboardType="numeric"
                  />
                  <CampoInput
                    placeholder="Cidade"
                    value={formData.cidade}
                    onChangeText={(value) => handleInputChange('cidade', value)}
                  />
                  <CampoInput
                    placeholder="Estado"
                    value={formData.estado}
                    onChangeText={(value) => handleInputChange('estado', value)}
                  />
                  <View style={styles.formActions}>
                    <Botao onPress={handleSave} style={[styles.button, styles.actionButton]}>
                      Salvar
                    </Botao>
                    <Botao onPress={handleCancel} style={[styles.button, styles.actionButton, styles.cancel]}>
                      Cancelar
                    </Botao>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perfilContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perfilFormContainer: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  perfilImgContainer: {
    marginBottom: 20,
  },
  perfilImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nomeCompleto: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Ubuntu',
  },
  message: {
    color: 'green',
    marginBottom: 10,
  },
  perfilDados: {
    width: '100%',
    gap: 10,
  },
  dado: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily: 'Ubuntu',
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  formContainer: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  formActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
  },
  cancel: {
    backgroundColor: '#999',
  },
});
