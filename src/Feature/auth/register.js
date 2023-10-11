import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Registration = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  

  const isEmailValid = (Email) => {
    return /\S+@\S+\.\S+/.test(Email);
  };

  const isPhoneNumberValid = (phoneNumber) => {
    return /^\d{10,}$/.test(phoneNumber);
  };

  const handleRegistration = async () => {
    if (!isEmailValid(userEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!isPhoneNumberValid(phoneNo)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number (10 digits or more).');
      return;
    }
    if (userPassword !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Password and confirm password do not match.');
      return;
    }

    const data = {
      userName: userName,
      userEmail: userEmail,
      userPassword: userPassword,
      confirmPassword: confirmPassword,
      phoneNo: phoneNo,
      city: city,
      address: address,
      mapUrl: mapUrl,
    };
    console.log(data);

    try {
      const response = await fetch('https://app.fuelfree.in/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.data;
        Alert.alert('Registration Successful', 'You have been successfully registered!');
        navigation.navigate('login'); 
      } else {
        console.log('Registration Failed:', response.status);
        Alert.alert('Registration Failed', 'An error occurred during registration. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const goToLogin = () => {

    navigation.navigate('login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Now</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setUserEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit PIN"
        secureTextEntry={true}
        onChangeText={(text) => setUserPassword(text)}
        keyboardType="numeric"
        maxLength={6}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm PIN"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
        keyboardType="numeric"
        maxLength={6}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhoneNo(text)}
        keyboardType="phone-pad"
        maxLength={10}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        onChangeText={(text) => setCity(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Google Map"
        onChangeText={(text) => setMapUrl(text)}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already Registered?</Text>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.loginLink}>Login</Text>
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
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    marginRight: 5,
  },
  loginLink: {
    color: '#26386e',
    textDecorationLine: 'underline',
  },
});

export default Registration;
