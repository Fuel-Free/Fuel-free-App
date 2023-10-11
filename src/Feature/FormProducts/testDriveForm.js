import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TestDriveForm = ({route}) => {
  const Navigation=useNavigation()
  const {city, Brand, VehicleType, 'productName':productname} = route.params
  const [uid, setUid] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState("");
  useEffect(() => {
    const getuserId = async () => {
      try {
        const userdata = await AsyncStorage.getItem('userData');
        if (userdata !== null) {
          const getuserdata = JSON.parse(userdata);
          let userinfo = getuserdata.user_details;
          setUid(userinfo._id);
          setName(userinfo.userName);
          setEmail(userinfo.userEmail)
          setPhoneNo(userinfo.phoneNo.toString());
        }
      } catch (error) {
        console.log('null userdata',error);
      }
    };
    getuserId();
  }, []);


  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [productName, setProductName] = useState(productname);
  const [vehicleType, setVehicleType] = useState(VehicleType);
  const [address, setAddress] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState();
  
  const [agencyList, setagencyList] = useState([]);
  async function getagencyList() {
    try {
      let resultagency = await axios.get(
        `https://app.fuelfree.in/vendor/agency/filterByCity?city=${city}&Brand=${Brand}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      let agencyData = await resultagency.data;
      let agencyType = agencyData.search;
      setagencyList(agencyType);
      // console.log(agencyList,"agency",agencyData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getagencyList()
  },[])

  const handleSubmit = async () => {
      if (date < new Date()) {
    Alert.alert("Invalid Date", "Please select a future date.");
    return;
  }
  const isoDate = date.toISOString();
    try {
      const values ={
        vehicleType: VehicleType,
        name: name,
        email: email,
        phoneNo: phoneNo,
        productName: productName,
        address:address,
        date:isoDate,
        time:time.toLocaleTimeString()
      }
      const response = await axios.post(
        "https://app.fuelfree.in/testDrive/addTestDrive/" + uid  + "/" + selectedDealer,
        values,
        {
          headers: {
            Accept: "application/json"
          },
        }
      );

      let result = response.data;
      if(result){
        Navigation.navigate('Home')
      }
     if (result.ok === "success") {
      Alert.alert("Success", "Test drive booking successful!");
    } else if (result.failure === "failure") {
      Alert.alert("Error", result.error);
    } else {
      Alert.alert("Sucess", "Test drive booking successful!");
    }
    } catch (error) {
      console.log(error,"api error")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.testDriveheading}>Book Your Test Drive</Text>
      <Text>Select an option:</Text>
      <Picker
      style={styles.input}
        selectedValue={selectedDealer}
        onValueChange={(itemValue, itemIndex) => setSelectedDealer(itemValue)}
      >
      <Picker.Item style={styles.testDriveheading} value={null} label="Select a dealer" />
      
      { agencyList && agencyList.map((ele)=>{
        return <Picker.Item label={`${ele.firmName} --------${ele.vehicleDeals}`} style={styles.testDriveheading} value={ele._id} key={ele._id}  />
      }) }
      <Picker.Item style={styles.testDriveheading} value={"64845366d856eeb16a8033a9"} label="fuelfree dealer" />
      </Picker>
    <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone No"
        value={phoneNo}
        onChangeText={setPhoneNo}
        keyboardType="numeric"
      />

      <View style={styles.dateFlex}>
        {!showPicker ? (
          <TouchableOpacity style={styles.dateText} onPress={() => setShowPicker(true)}>
            <Text style={styles.testDriveTitle}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
        ) : null}
        {showPicker ? (
          <DateTimePicker value={date} onChange={(e, selectedDate) => { setShowPicker(false); setDate(selectedDate || date); }} mode="date" />
        ) : null}
      </View>
      
      <View style={styles.dateFlex}>
        {!showTimePicker ? (
          <TouchableOpacity style={styles.dateText} onPress={() => setShowTimePicker(true)}>
            <Text style={styles.testDriveTitle}>{time.toLocaleTimeString()}</Text>
          </TouchableOpacity>
        ) : null}
        {showTimePicker ? (
          <DateTimePicker value={time} onChange={(event, selectedTime) => { setShowTimePicker(false); setTime(selectedTime || time); }} mode="time" />
        ) : null}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehicle Type"
        value={vehicleType}
        onChangeText={setVehicleType}
      />
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Enter your address here"
        value={address}
        onChangeText={setAddress}
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
    fontWeight: '700',
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
  testDriveSelect: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  testDriveTitle: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
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
  button: {
    backgroundColor: '#26386e',
    borderRadius: 14,
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TestDriveForm;
