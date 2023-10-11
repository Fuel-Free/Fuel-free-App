import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Edit = () => {
  const [uid, setUid] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
 
  const Navigation=useNavigation()

  useEffect(() => {
    const getuserId = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData'); 
        if (userDataString !== null) {
          const userData = JSON.parse(userDataString);
          let userinfo = userData.user_details;
          setUid(userinfo._id);
          setUsername(userinfo.userName);
          setPhoneNumber(userinfo.phoneNo.toString());
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
    getuserId();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(`https://app.fuelfree.in/user/editData/${uid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: username,
          phoneNo: phoneNumber,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        Alert.alert('Data updated successfully');
        Navigation.navigate('profile')
        const updatedUserData = {
          user_details: responseData.userEdit,
        };
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
        const storedUserData = await AsyncStorage.getItem('userData');
        // console.log('Stored UserData:', storedUserData);
      } else {
        console.error('Data update failed');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 10,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  input: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    width: '100%',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#26386e',
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Edit;
