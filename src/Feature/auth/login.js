import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const isEmailValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isPinValid = (userPassword) => {
    return /^\d{6}$/.test(userPassword);
  };

  const handleLogin = async () => {
    if (!isEmailValid(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!isPinValid(userPassword)) {
      Alert.alert('Invalid PIN', 'Please enter a valid 6-digit PIN.');
      return;
    }

    const data = {
      userEmail: email,
      userPassword: userPassword,
    };

    try {
      const response = await fetch('https://app.fuelfree.in/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const userDetailsString = JSON.stringify(responseData);
        await AsyncStorage.setItem('userData', userDetailsString);
        Alert.alert('Login Successful', 'You have been successfully logged in!');
        navigation.navigate('Home');
      } else {
        console.log('Login Failed:', response.status);
        Alert.alert('Login Failed', 'Invalid email or PIN. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const goToRegister = () => {
    navigation.navigate('register'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Now</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="6-digit PIN"
        secureTextEntry={true}
        onChangeText={(text) => setUserPassword(text)}
        keyboardType="numeric"
        maxLength={6}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Not Registered Yet?</Text>
        <TouchableOpacity onPress={goToRegister}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#26386e',
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    marginRight: 5,
  },
  registerLink: {
    color: '#26386e',
    textDecorationLine: 'underline',
  },
});

export default Login;
