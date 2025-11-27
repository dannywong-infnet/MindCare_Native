import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UsuarioContext from '../../context/UsuarioContext';
import Botao from '../../components/Botao/Botao';
import FotoDePerfil from '../../components/FotoDePerfil/FotoDePerfil';
import NavBar from '../../components/NavBar/NavBar';
import { loadSessoes } from '../../services/dataService';

export default function DashboardPage() {
  const [usuario, setUsuario] = useState({});
  const [sessoes, setSessoes] = useState({ quantSessoes: 0, sessoes: [] });
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const usuarioContext = useContext(UsuarioContext);
  const nomeUsuario = usuarioContext.usuario.nomeUsuario;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessoesData = await loadSessoes(nomeUsuario);
        setSessoes(sessoesData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    if (nomeUsuario) {
      fetchData();
    }
  }, [nomeUsuario]);

  if (loading) {
    return (
      <>
        <NavBar />
        <View style={styles.loadingContainer}>
          <Text>Carregando...</Text>
        </View>
      </>
    );
  }

  const renderSessao = ({ item }) => (
    <View style={styles.card}>
      <FotoDePerfil img={item.img} />
      <Text style={styles.cardText}>
        <Text style={styles.bold}>Terapeuta:</Text> {item.terapeuta}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.bold}>Data:</Text> {item.data}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.bold}>Horário:</Text> {item.horario}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.bold}>Status:</Text> {item.status}
      </Text>
      <View style={styles.btnContainer}>
        <Botao onPress={() => navigation.navigate('Mensagem', { terapeuta: item.terapeuta })}>
          Enviar mensagem
        </Botao>
      </View>
    </View>
  );

  return (
    <>
      <NavBar />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Consultas agendadas</Text>
        <View style={styles.buttonContainer}>
          <Botao onPress={() => navigation.navigate('BuscarTerapeutas')}>
            Marcar outra consulta
          </Botao>
        </View>
        <Text style={styles.subtitle}>
          Você tem {sessoes.quantSessoes} sessões agendadas
        </Text>
        <FlatList
          data={sessoes.sessoes}
          renderItem={renderSessao}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Ubuntu',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Ubuntu',
    textAlign: 'left',
  },
  cardContainer: {
    gap: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  cardText: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily: 'Ubuntu',
  },
  bold: {
    fontWeight: 'bold',
  },
  btnContainer: {
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
