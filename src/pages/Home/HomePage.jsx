import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FotoDePerfil from '../../components/FotoDePerfil/FotoDePerfil';
import Icon from '../../components/Icon/Icon';
import NavBar from '../../components/NavBar/NavBar';
import UsuarioContext from '../../context/UsuarioContext';
import { loadPacientes } from '../../services/dataService';

export default function HomePage() {
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const usuarioContext = useContext(UsuarioContext);
  const nomeUsuario = usuarioContext.usuario.nomeUsuario;

  useEffect(() => {
    const fetchDadosUsuario = async () => {
      try {
        const data = await loadPacientes();
        const paciente = Array.isArray(data)
          ? data.find((p) => p.username === nomeUsuario)
          : (data && data[nomeUsuario]) || null;
        setUsuario(paciente || {});
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };
    if (nomeUsuario) {
      fetchDadosUsuario();
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

  return (
    <>
      <NavBar />
      <ScrollView style={styles.pageContainer}>
        <View style={styles.userSection}>
          <Text style={styles.welcomeTitle}>Olá, {usuario.nome}!</Text>
          <View style={styles.userCard}>
            <FotoDePerfil img={usuario.img} />
            <View style={styles.userDetails}>
              <Text style={styles.userDetailText}>
                <Text style={styles.bold}>{usuario.nome} {usuario.sobrenome}</Text>
              </Text>
              <Text style={styles.userDetailText}>
                <Text style={styles.bold}>CPF:</Text> {usuario.cpf}
              </Text>
              <Text style={styles.userDetailText}>
                <Text style={styles.bold}>Data de nascimento:</Text> {usuario.dataNascimento}
              </Text>
              <Text style={styles.userDetailText}>
                <Text style={styles.bold}>Cidade:</Text> {usuario.cidade} ({usuario.estado})
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.actionsSection}>
          <Text style={styles.actionsTitle}>O que você precisa hoje?</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionCard, styles.terapeutas]}
              onPress={() => navigation.navigate('BuscarTerapeutas')}
            >
              <Icon iconName="person_pin_circle" size={40} color="#926cfa" />
              <Text style={styles.actionText}>Buscar terapeutas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionCard, styles.agendamentos]}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Icon iconName="calendar_month" size={40} color="#926cfa" />
              <Text style={styles.actionText}>Consultar agendamentos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionCard, styles.reembolso]}
              onPress={() => navigation.navigate('Reembolso')}
            >
              <Icon iconName="request_quote" size={40} color="#926cfa" />
              <Text style={styles.actionText}>Solicitar reembolso</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  pageContainer: {
    flex: 1,
    padding: 20,
  },
  userSection: {
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Ubuntu',
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    gap: 15,
    alignSelf: 'center',
    width: '100%',
  },
  userDetails: {
    flex: 1,
    gap: 8,
  },
  userDetailText: {
    fontSize: 14,
    fontFamily: 'Ubuntu',
  },
  bold: {
    fontWeight: 'bold',
  },
  actionsSection: {
    marginTop: 20,
  },
  actionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Ubuntu',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent: 'center',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  terapeutas: {
    backgroundColor: '#e8f4f8',
  },
  agendamentos: {
    backgroundColor: '#f0e8ff',
  },
  reembolso: {
    backgroundColor: '#fff4e6',
  },
  actionText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Ubuntu',
    fontWeight: '500',
  },
});
