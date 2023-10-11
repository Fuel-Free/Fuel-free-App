import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChargingModal = ({ visible, onClose, onSelectCity }) => {
  const cities = ['Indore', 'Bhopal', 'Ujjain', 'Gwalior', 'Jabalpur', 'Sihore', 'Rajgadh', 'Dewas', 'Vidisha']; 
  const navigation=useNavigation()
  const handleChargingSelect = (city) => {
    onSelectCity(city);
    navigation.navigate('chargingdealer',{city:city})
    onClose();
  };

  const renderCharging = ({ item }) => (
    <TouchableOpacity
      style={styles.cityItem}
      onPress={() => handleChargingSelect(item)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select City</Text>
          <FlatList
            key={cities.length} // Add a dynamic key
            data={cities}
            keyExtractor={(item) => item}
            renderItem={renderCharging}
            numColumns={3}
            contentContainerStyle={styles.flatListContainer}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '95%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatListContainer: {
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cityItem: {
    width: '30%',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    // marginBottom: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default ChargingModal;
