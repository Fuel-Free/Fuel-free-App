import { StyleSheet, Text, View, FlatList,TouchableOpacity,ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productbooking = ({route}) => {
  const {userId}=route.params
  const [bookingData, setBookingData] = useState([]);
  const [loading,setloading]=useState(true)
  const [result,setresult]=useState('')

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setloading(true)
        const response = await fetch(
          `https://app.fuelfree.in/productBook/userProductBookList/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          const list = data?.AllList;
          setBookingData(list);
          setloading(false)
        } else {
          setloading(false)
          console.error('API Error:', response.status, response.statusText);
        }
      } catch (error) {
        setloading(false)
        console.error('Error:', error);
      }
    };
          fetchBookingData();
  }, [userId||result]);


  const cancleBooking=async(id)=>{
    setloading(true)
       let res=await axios.patch(`https://app.fuelfree.in/productBook/cancelbooking/${id}`,{
        headers:{
          "Accept":"application/json"
        }
       })
       let result=await res.data
          setloading(false)
         
      }

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.price}>Price: Rs.{item.productPrice}</Text>
      <Text style={styles.userInfo}>Booked by:</Text>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text>{item.phoneNo}</Text>
      <Text style={styles.userInfo}>Preferred Details:</Text>
      <Text>Location: {item.preferredLocation}</Text>
      <Text>Date: {item.preferredDate}</Text>
   {item.status==='booked'?(<TouchableOpacity style={styles.buttonContainer} onPress={()=>cancleBooking(item._id)}>
          <Text style={styles.buttonText}>cancel</Text>
        </TouchableOpacity>):( <TouchableOpacity style={styles.buttonContainer} >
          <Text style={styles.buttonText}>cancelled</Text>
        </TouchableOpacity>)}  
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Booked Vehicles</Text>
      {loading?(<ActivityIndicator size="large" color="#ff8c00" />):(<FlatList
        data={bookingData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderBookingItem}
        contentContainerStyle={styles.flatListContainer}
      />)}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#26386e', 
  },
  flatListContainer: {
    paddingHorizontal: 10,
  }, 
  bookingItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#26386e', // Use the blue color (#26386e) for the product name
  },
  registerLink: {
    color: '#26386e',
    textDecorationLine: 'underline',
  },
  price: {
    color: 'orange', // Use the orange color for the price
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#26386e', // Use the blue color (#26386e) for user info
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
});

export default Productbooking;
