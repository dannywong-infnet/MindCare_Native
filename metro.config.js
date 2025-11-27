const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configurar watchFolders para incluir a pasta public
config.watchFolders = [__dirname];

// Garantir que JSONs sejam processados corretamente
config.resolver.sourceExts = [...config.resolver.sourceExts, 'json'];

module.exports = config;

