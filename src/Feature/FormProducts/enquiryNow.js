import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const EnquiryNow = ({route}) => {
  const Navigation =useNavigation()
  const { 'productName':productname, _id } = route.params
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [productName, setProductName] = useState(productname);
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

useEffect(() => {
  const getuserId = async() => {
   try {
      const userdata =await AsyncStorage.getItem('userData');
      if(userdata !== null){
        const getUserData = JSON.parse(userdata)
        const userInfo = getUserData.user_details
        setUid(userInfo._id)
        setName(userInfo.userName);
        setPhoneNo(userInfo.phoneNo.toString());

      }
   } catch (error) {
    console.log("null userdata");
   }
  }
  getuserId()
},[])


  const handleSubmit = async () => {
    if (!name || !phoneNo || !productName || !city || !message) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phoneNo', phoneNo);
    formData.append('productName', productName);
    formData.append('city', city);
    formData.append('message', message);
 try {
      if (!uid || !_id) { 
        Alert.alert('Error', 'UID or Product ID missing');
        return;
      }
     
      const response = await fetch(`https://app.fuelfree.in/enquiry/enquirycreate/${uid}/${_id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Navigation.navigate('Home')
        Alert.alert('Success', 'Enquiry submitted successfully');
      } else {
        Alert.alert('Error', 'Enquiry submission failed');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      Alert.alert('Error', 'An error occurred while submitting the enquiry');
    } 
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.enquiryTitle}>Enquiry Now</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone No"
        value={phoneNo}
        onChangeText={setPhoneNo}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.message}
        multiline
        numberOfLines={4}
        placeholder="Enter your message here"
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  enquiryTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  message: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    height: 100,
  },
  button: {
    backgroundColor: '#26386e',
    borderRadius: 14,
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EnquiryNow;
