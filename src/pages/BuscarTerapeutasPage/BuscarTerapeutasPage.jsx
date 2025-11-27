import React, { useState, useEffect, useMemo, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import FotoDePerfil from '../../components/FotoDePerfil/FotoDePerfil';
import CampoInput from '../../components/CampoInput/CampoInput';
import { calcularDistancia } from '../../utils/calculadoraDistancia';
import { filtrarETOrdenarTerapeutas } from '../../utils/buscaInteligente';
import UsuarioContext from '../../context/UsuarioContext';
import NavBar from '../../components/NavBar/NavBar';
import { loadTerapeutas, loadPacientes } from '../../services/dataService';

export default function BuscarTerapeutasPage() {
  const { usuario } = useContext(UsuarioContext);
  const user = usuario.nomeUsuario;
  const [terapeutasOriginais, setTerapeutasOriginais] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        let pacienteEncontrado = null;

        if (user) {
          const dataPaciente = await loadPacientes();
          pacienteEncontrado = Array.isArray(dataPaciente)
            ? dataPaciente.find((p) => p.username === user)
            : (dataPaciente && dataPaciente[user]) || null;
          setPaciente(pacienteEncontrado);
        }

        const dataTerapeutas = await loadTerapeutas();

        // Tentar obter localização atual
        let currentLocation = null;
        if (pacienteEncontrado?.latitude && pacienteEncontrado?.longitude) {
          currentLocation = {
            latitude: pacienteEncontrado.latitude,
            longitude: pacienteEncontrado.longitude,
          };
        } else {
          try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
              const loc = await Location.getCurrentPositionAsync({});
              currentLocation = {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
              };
            }
          } catch (error) {
            console.log('Erro ao obter localização:', error);
          }
        }

        if (currentLocation) {
          const terapeutasComDistancia = dataTerapeutas.map((terapeuta) => {
            if (terapeuta.latitude && terapeuta.longitude) {
              const distancia = calcularDistancia(
                currentLocation.latitude,
                currentLocation.longitude,
                terapeuta.latitude,
                terapeuta.longitude
              );
              return { ...terapeuta, distancia };
            }
            return { ...terapeuta, distancia: null };
          });

          terapeutasComDistancia.sort((a, b) => {
            if (a.distancia === null) return 1;
            if (b.distancia === null) return -1;
            return a.distancia - b.distancia;
          });

          setTerapeutasOriginais(terapeutasComDistancia);
        } else {
          setTerapeutasOriginais(dataTerapeutas);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, [user]);

  const terapeutasFiltrados = useMemo(() => {
    if (!termoBusca.trim()) {
      return terapeutasOriginais;
    }
    return filtrarETOrdenarTerapeutas(terapeutasOriginais, termoBusca);
  }, [terapeutasOriginais, termoBusca]);

  const handleAgendar = (terapeuta, horario) => {
    const dataFormatada = new Date(terapeuta.proximaDataDisponivel).toLocaleDateString('pt-BR');
    Alert.alert(
      'Consulta agendada com sucesso!',
      `Terapeuta: ${terapeuta.nome}\nData: ${dataFormatada}\nHorário: ${horario}`
    );
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <View style={styles.pageContainer}>
          <Text>Carregando terapeutas...</Text>
        </View>
      </>
    );
  }

  const renderTerapeuta = ({ item: terapeuta }) => (
    <View style={styles.cardTerapeuta}>
      <FotoDePerfil img={terapeuta.img} />
      <View style={styles.infoTerapeuta}>
        <Text style={styles.nomeTerapeuta}>{terapeuta.nome}</Text>
        <Text style={styles.especialidade}>
          <Text style={styles.bold}>Especialidade:</Text> {terapeuta.especialidade}
        </Text>
        <Text style={styles.crp}>
          <Text style={styles.bold}>CRP:</Text> {terapeuta.crp}
        </Text>
        <Text style={styles.avaliacao}>
          <Text style={styles.bold}>Avaliação:</Text> {terapeuta.avaliacao} ⭐ ({terapeuta.numeroAvaliacoes} avaliações)
        </Text>
        <Text style={styles.endereco}>
          <Text style={styles.bold}>Endereço:</Text> {terapeuta.endereco}
        </Text>
        {terapeuta.distancia !== null && (
          <Text style={styles.distancia}>
            <Text style={styles.bold}>Distância:</Text> {terapeuta.distancia} km
          </Text>
        )}
        <Text style={styles.valor}>
          <Text style={styles.bold}>Valor da primeira consulta:</Text> R$ {terapeuta.valorPrimeiraConsulta}
        </Text>
        <Text style={styles.data}>
          <Text style={styles.bold}>Próxima data disponível:</Text>{' '}
          {new Date(terapeuta.proximaDataDisponivel).toLocaleDateString('pt-BR')}
        </Text>
        {terapeuta.horariosDisponiveis && terapeuta.horariosDisponiveis.length > 0 && (
          <View style={styles.horariosContainer}>
            <Text style={styles.horariosLabel}>
              <Text style={styles.bold}>Horários disponíveis:</Text>
            </Text>
            <View style={styles.botoesHorarios}>
              {terapeuta.horariosDisponiveis.map((horario, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.botaoHorario}
                  onPress={() => handleAgendar(terapeuta, horario)}
                >
                  <Text style={styles.botaoHorarioText}>{horario}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <>
      <NavBar />
      <ScrollView style={styles.pageContainer}>
        <Text style={styles.title}>Buscar terapeutas</Text>
        {!paciente?.latitude || !paciente?.longitude ? (
          <Text style={styles.subtitle}>
            Complete seu endereço no perfil para ver terapeutas ordenados por proximidade.
          </Text>
        ) : (
          <Text style={styles.subtitle}>
            Terapeutas ordenados por proximidade da sua localização.
          </Text>
        )}

        <View style={styles.filtroContainer}>
          <CampoInput
            placeholder="Buscar por nome, especialidade, cidade..."
            value={termoBusca}
            onChangeText={setTermoBusca}
            style={styles.inputBusca}
          />
          {termoBusca ? (
            <Text style={styles.resultadoBusca}>
              {terapeutasFiltrados.length} terapeuta(s) encontrado(s)
            </Text>
          ) : null}
        </View>

        <FlatList
          data={terapeutasFiltrados}
          renderItem={renderTerapeuta}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          scrollEnabled={false}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  subtitle: {
    color: '#666',
    marginBottom: 24,
    fontSize: 14,
    textAlign: 'left',
  },
  filtroContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  inputBusca: {
    width: '100%',
    maxWidth: 600,
  },
  resultadoBusca: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  cardTerapeuta: {
    flexDirection: 'row',
    gap: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
    width: '100%',
  },
  infoTerapeuta: {
    flex: 1,
    gap: 8,
  },
  nomeTerapeuta: {
    fontSize: 24,
    marginBottom: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  especialidade: {
    marginVertical: 4,
    fontSize: 14,
    color: '#555',
  },
  crp: {
    marginVertical: 4,
    fontSize: 14,
    color: '#555',
  },
  avaliacao: {
    marginVertical: 4,
    fontSize: 14,
    color: '#555',
  },
  endereco: {
    marginVertical: 4,
    fontSize: 14,
    color: '#555',
  },
  distancia: {
    marginVertical: 4,
    fontSize: 14,
    color: '#0070f3',
    fontWeight: '500',
  },
  valor: {
    marginVertical: 4,
    fontSize: 14,
    color: '#28a745',
    fontWeight: '500',
  },
  data: {
    marginVertical: 4,
    fontSize: 14,
    color: '#555',
  },
  bold: {
    fontWeight: '600',
    color: '#333',
  },
  horariosContainer: {
    marginTop: 12,
  },
  horariosLabel: {
    marginVertical: 8,
    fontSize: 14,
    color: '#555',
  },
  botoesHorarios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  botaoHorario: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#0070f3',
    borderRadius: 8,
  },
  botaoHorarioText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
