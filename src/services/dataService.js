// Serviço para carregar dados JSON
// Em produção, isso seria substituído por chamadas de API

// Importações estáticas dos JSONs (Metro bundler requer imports estáticos)
// Usando caminhos relativos a partir de src/
let pacientesData = null;
let terapeutasData = null;
let sessoesData = null;

try {
  // Tentar carregar do caminho relativo
  pacientesData = require('../../public/users/pacientes/pacientes.json');
} catch (e) {
  console.warn('Não foi possível carregar pacientes.json localmente:', e.message);
  pacientesData = null;
}

try {
  terapeutasData = require('../../public/users/terapeutas/terapeutas.json');
} catch (e) {
  console.warn('Não foi possível carregar terapeutas.json localmente:', e.message);
  terapeutasData = null;
}

try {
  sessoesData = require('../../public/sessoes/a.json');
} catch (e) {
  console.warn('Não foi possível carregar sessoes/a.json localmente:', e.message);
  sessoesData = null;
}

export const loadPacientes = async () => {
  try {
    if (pacientesData) {
      return pacientesData;
    }
    // Fallback: tentar fetch se require falhar
    const response = await fetch('https://raw.githubusercontent.com/anne-takano/MindCare_Projeto/main/public/users/pacientes/pacientes.json');
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Erro ao carregar pacientes:', error);
    return [];
  }
};

export const loadTerapeutas = async () => {
  try {
    if (terapeutasData) {
      return terapeutasData;
    }
    // Fallback: tentar fetch se require falhar
    const response = await fetch('https://raw.githubusercontent.com/anne-takano/MindCare_Projeto/main/public/users/terapeutas/terapeutas.json');
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Erro ao carregar terapeutas:', error);
    return [];
  }
};

export const loadSessoes = async (username) => {
  try {
    // Para arquivos dinâmicos, precisamos usar um mapeamento
    if (username === 'a' || username === 'amanda_silva' || !username) {
      if (sessoesData) {
        return sessoesData;
      }
    }
    // Se não encontrar, retornar estrutura vazia
    return { quantSessoes: 0, sessoes: [] };
  } catch (error) {
    console.error('Erro ao carregar sessões:', error);
    return { quantSessoes: 0, sessoes: [] };
  }
};

