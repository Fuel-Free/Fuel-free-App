import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const NewVehicleOptionsModal = ({ isVisible, onClose, handleNavigation }) => {
  const subOptions = [
    'Cycle', 'Scooter', 'Bike', 'Car', 'E-Auto', 'Bus', 'Loading', 'Logistics', 'Luna'
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {subOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.modalOption}
              onPress={() => {
                handleNavigation(option.toLowerCase());
                onClose();
              }}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    width: 300,
  },
  modalOption: {
    paddingVertical: 10,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default NewVehicleOptionsModal;
