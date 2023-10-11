import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet, Alert
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Freeconsultation = () => {
  const Navigation=useNavigation()
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const getuserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData !== null) {
          const userDataParse = JSON.parse(userData);
          const userInfo = userDataParse.user_details;
          setName(userInfo.userName);
          setEmail(userInfo.userEmail)
          setPhoneNumber(userInfo.phoneNo.toString())
        }
      } catch (error) {
        console.log("Null user Data", error);
      }
    };
    getuserData();
  }, []);

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const apiUrl = "https://app.fuelfree.in/consult/Add";
    if (date < new Date()) {
      Alert.alert("Invalid Date", "Please select a future date.");
      return;
    }
    const requestData = {
      Name,
      email,
      phoneNumber,
      date,
      time,
      message,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        Alert.alert(
          "Success",
          "Your consultation request has been submitted successfully."
        );
        clearForm();
        Navigation.navigate('Home')
      } else {
        console.error("Form submission failed");
        Alert.alert(
          "Error",
          "There was an error submitting the form. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  const validateForm = () => {
    if (!Name || !email || !phoneNumber || !date || !time || !message) {
      Alert.alert("Validation Error", "All fields are required.");
      return false;
    }

    if (!/^\d{10,}$/.test(phoneNumber)) {
      Alert.alert(
        "Validation Error",
        "Phone number should be 10 digits or more."
      );
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setDate(new Date());
    setTime(new Date());
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Your Free Consultation</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={Name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
       <View style={styles.dateFlex}>
  {!showPicker ? (
    <TouchableOpacity
      style={styles.dateText}
      onPress={() => setShowPicker(true)}
    >
      <Text style={styles.testDriveTitle}>
        {date.toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  ) : null}
  {showPicker ? (
    <DateTimePicker
      value={date}
      onChange={(event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
          setDate(selectedDate);
        }
      }}
      mode="date"
    />
  ) : null}
</View>
<View style={styles.dateFlex}>
  {!showTimePicker ? (
    <TouchableOpacity
      style={styles.dateText}
      onPress={() => setShowTimePicker(true)}
    >
      <Text style={styles.testDriveTitle}>
        {time.toLocaleTimeString()}
      </Text>
    </TouchableOpacity>
  ) : null}
  {showTimePicker ? (
    <DateTimePicker
      value={time}
      onChange={(event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
          setTime(selectedTime);
        }
      }}
      mode="time"
    />
  ) : null}
</View>

      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Message"
        value={message}
        onChangeText={(text) => setMessage(text)}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    justifyContent:"center",
    alignContent:"center",
    marginTop:80
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  dateFlex: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  dateText: {
    flex: 1,
  },
  testDriveheading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  messageInput: {
    height: 100,
  },
  button: {
    backgroundColor: "#26386e",
    borderRadius: 14,
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Freeconsultation;
