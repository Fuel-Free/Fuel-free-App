import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator ,TouchableOpacity,RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Testdrivebookinglist = () => {
  const [testdrivelist, setTestdrivelist] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [uid, setUid] = useState('');
  useEffect(() => {
    const getuserId = async () => {
      try {
        const userdata = await AsyncStorage.getItem('userData'); 
        if (userdata !== null) {
          const getuserdata = JSON.parse(userdata);
          let userinfo = getuserdata.user_details;
          setUid(userinfo._id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getuserId();
  }, []);


  const cancleBooking=async(id)=>{
    setLoading(true)
       let res=await axios.patch(`https://app.fuelfree.in/testDrive/cancelbooking/${id}`,{
        headers:{
          "Accept":"application/json"
        }
       })
       let result=await res.data
        setLoading(false)
      }

  async function getTestDriveList() {
    try {
      const url = `https://app.fuelfree.in/testDrive/userBookingList/${uid}`;
      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
        },
      });
      const testDriveData = response.data;
      if (testDriveData && testDriveData.List) {
        const testdrivelistdata = testDriveData.List;
        setTestdrivelist(testdrivelistdata);
      } else {
        console.log('No test drive data found.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching test drive list:', error);
      setLoading(false);
    } 
  }

  useEffect(() => {
    if (uid) {
      getTestDriveList();
    }
  }, [uid]);

  return (
    <ScrollView
      style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={getTestDriveList}
              colors={['#007AFF']} // Customize the loading indicator color
            />
          }>
    <Text style={styles.heading}>Your Booked Test Drive</Text>
    {loading ? (
      <ActivityIndicator style={styles.loader} size="large" color="#EB962A" />
    ) : (
      testdrivelist.length > 0 ? (
        testdrivelist.map((testDrive) => (
          <View key={testDrive._id} style={styles.item}>
            <Text style={styles.itemTitle}>Name: {testDrive.name}</Text>
            <Text style={styles.itemText}>Email: {testDrive.email}</Text>
            <Text style={styles.itemText}>Product: {testDrive.productName}</Text>
            <Text style={styles.itemText}>Vehicle: {testDrive.vehicleType}</Text>
            <Text style={styles.itemStatus}>Status: {testDrive.status}</Text>
            {testDrive.status === 'booked' ? (
              <TouchableOpacity style={styles.buttonContainer} onPress={() => cancleBooking(testDrive._id)}>
                <Text style={styles.buttonText}>cancel</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>cancelled</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No Test Drives Booked</Text>
      )
    )}
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4',
    marginVertical: 10
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#262681',
    textAlign: 'center',
  },
  loader: {
    marginTop: 32,
  },
  item: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 20,
    color: '#1C3162',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
  itemStatus: {
    fontSize: 18,
    color: '#EB962A',
  },
  noDataText: {
    fontSize: 18,
    color: '#1C3162',
    textAlign: 'center',
    marginTop: 32,
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

export default Testdrivebookinglist;
