import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';

const opcoes = [
  { label: 'Selecione o gênero', value: '', disabled: true },
  { label: 'Masculino', value: 'masculino' },
  { label: 'Feminino', value: 'feminino' },
  { label: 'Outro', value: 'outro' },
];

export default function SelectGenero({ value, onChange, style }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const selectedLabel = opcoes.find(op => op.value === value)?.label || 'Selecione o gênero';

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.selectGenero}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.selectText, !value && styles.placeholder]}>
          {selectedLabel}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={opcoes}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.disabled && styles.optionDisabled,
                    item.value === value && styles.optionSelected
                  ]}
                  onPress={() => {
                    if (!item.disabled) {
                      onChange(item.value);
                      setModalVisible(false);
                    }
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    item.disabled && styles.optionTextDisabled,
                    item.value === value && styles.optionTextSelected
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  selectGenero: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 10,
    backgroundColor: 'transparent',
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 19,
  },
  selectText: {
    fontFamily: 'Ubuntu',
    fontSize: 14,
    color: '#4a4949',
  },
  placeholder: {
    color: '#c1c1c1',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionSelected: {
    backgroundColor: '#f0f0ff',
  },
  optionText: {
    fontFamily: 'Ubuntu',
    fontSize: 16,
    color: '#4a4949',
  },
  optionTextDisabled: {
    color: '#c1c1c1',
  },
  optionTextSelected: {
    color: '#926cfa',
    fontWeight: '600',
  },
  closeButton: {
    padding: 15,
    backgroundColor: '#926cfa',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Ubuntu',
    fontSize: 16,
    fontWeight: '600',
  },
});
