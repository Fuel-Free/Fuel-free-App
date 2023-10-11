 import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView , Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const BuyNow = ({route}) => {
  const Navigate=useNavigation()
  const {city, Brand, VehicleType, 'productName':productname, 'productPrice':productprice} = route.params

  const [uid, setUid] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [productName, setProductName] = useState(productname);
  const [brand, setbrand] = useState(Brand);
  const [vehicleType, setVehicleType] = useState(VehicleType);
  const [preferredLocation, setPreferredLocation] = useState("");
  const [preferredDate, setPreferredDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [productPrice, setProductPrice] = useState(productprice.toString());
  const [walletDiscount, setWalletDiscount] = useState("");
  const [selectedDealer, setSelectedDealer] = useState(null);


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
          setWalletDiscount(userinfo.walletBalance.toString())
        }
      } catch (error) {
        console.log('null userdata',error);
      }
    };
    getuserId();
  }, []);
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
  const handleSubmit = async() => {
    if (preferredDate < new Date()) {
      Alert.alert("Invalid Date", "Please select a future date.");
      return;
    }
    const isoDate = preferredDate.toISOString();
      try {
        const values ={
          vehicleType: VehicleType,
          name: name,
          email: email,
          phoneNo: phoneNo,
          productName: productName,
          date:isoDate,
          time:preferredDate.toLocaleTimeString()
        }
        
        const response = await axios.post(
          "https://app.fuelfree.in/productBook/bookProduct/" + uid + "/" + selectedDealer,
          values,
          {
            headers: {
              Accept: "application/json"
            },
          }
        );
  
        let result = response.data;
        if(result){
          Navigate.navigate('Home')
        }
       if (result.ok === "success") {
        Alert.alert("Success", "Booking successful!");
      } else if (result.failure === "failure") {
        Alert.alert("Error", result.error);
      } else {
        Alert.alert("Success", "Booking successful!");
      }
      } catch (error) {
        console.log(error,"api error")
      }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.testDriveTitle}>BOOK NOW</Text>
      <Text>Select an option:</Text>
      <Picker
      style={styles.input}
        selectedValue={selectedDealer}
        onValueChange={(itemValue, itemIndex) => setSelectedDealer(itemValue)}
      >
      <Picker.Item style={styles.testDriveheading} value={null} label="Select a dealer" />
      
      { agencyList && agencyList.map((ele,key)=>{
        return <Picker.Item key={key} label={`${ele.firmName} --------${ele.vehicleDeals}`} style={styles.testDriveheading} value={ele._id} />
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
            <Text style={styles.testDriveTitle}>{preferredDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
        ) : null}
        {showPicker ? (
          <DateTimePicker value={preferredDate} onChange={(event, selectedDate) => { setShowPicker(false); setPreferredDate(selectedDate || preferredDate); }} mode="date" />
        ) : null}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Preferred Location"
        value={preferredLocation}
        onChangeText={setPreferredLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
        <TextInput
        style={styles.input}
        placeholder="Brand"
        value={brand}
        onChangeText={setbrand}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehicle Type"
        value={vehicleType}
        onChangeText={setVehicleType}
      />
      <TextInput
        style={styles.input}
        placeholder="Referral Code"
        value={referralCode}
        onChangeText={setReferralCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Promo Code"
        value={promoCode}
        onChangeText={setPromoCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={productPrice}
        onChangeText={setProductPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Wallet Discount"
        value={walletDiscount}
        onChangeText={setWalletDiscount}
      />

      <Button title="Submit"
        color="#26386e"
       onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    fontWeight: 700,
  },
  testDriveTitle: {
    textAlign: "center",
    fontSize:20,
    marginBottom:5,
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
  dateFlex: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  dateText: {
    flex: 1,
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
});

export default BuyNow;
