import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DealerDetail = ({ route }) => {

  const handleContactDealer = () => {
    const phoneNumber = dealerDetails.whatsappNo; 
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const { id } = route.params;
  const [dealerDetails, setDealerDetails] = useState({});

  const getDealerDetails = async () => {
    try {
      const response = await fetch(`https://app.fuelfree.in/vendor/agency/details/${id}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setDealerDetails(result.vendorDetails || {});
    } catch (error) {
      console.log('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    getDealerDetails();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Image source={{ uri: `https://app.fuelfree.in/${dealerDetails.logo}` }} style={styles.image} /> */}
      <Image
            source={require('../../../assets/dealersimgbanner.jpeg')}
          style={styles.image}
        />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{dealerDetails.firmName}</Text>
        {/* <View style={styles.detailItem}>
          <Text style={styles.label}>Vendor Name:</Text>
          <Text style={styles.value}>{dealerDetails.firmName}</Text>
        </View> */}
        <View style={styles.detailItem}>
          <Text style={styles.label}>Dealer Name:</Text>
          <Text style={styles.value}>{dealerDetails.name}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{dealerDetails.email}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Brand:</Text>
          <Text style={styles.value}>{dealerDetails.Brand && dealerDetails.Brand[0]}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Vehicle Deals:</Text>
          <Text style={styles.value}>{dealerDetails.vehicleDeals && dealerDetails.vehicleDeals[0]}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>WhatsApp:</Text>
          <Text style={styles.value}>{dealerDetails.whatsappNo}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Opening Hours:</Text>
          <Text style={styles.value}>{dealerDetails.openingTime}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Closing Hours:</Text>
          <Text style={styles.value}>{dealerDetails.closingTime}</Text>
        </View>
        <View style={styles.detailItem}>
        <Text style={styles.label}>About Store:</Text>
        <Text style={styles.value}>{dealerDetails.aboutTheStore}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{dealerDetails.address}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>City:</Text>
          <Text style={styles.value}>{dealerDetails.city}</Text>
        </View>
        <TouchableOpacity style={styles.contactButton} onPress={handleContactDealer}>
        {/* <Icon name="phone" size={20} color="white" style={styles.phoneIcon} /> */}
        <Text style={styles.contactButtonText}>Call Now</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  image: {
    width: 343,
    height: 200,
    // borderRadius: 10,
    // marginBottom: 20,
  },
  detailsContainer: {
    width: '90%',
    backgroundColor: 'white',
    // borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    justifyContent:"center",
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  
  about: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: '#555',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  contactButton: {
    backgroundColor: '#26386e',
    flexDirection: 'row', // Added flexDirection to align items horizontally
    alignItems: 'center', // Align items vertically within the button
    justifyContent: 'center', // Center items horizontally within the button
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  phoneIcon: {
    marginRight: 10, // Add spacing between the phone icon and text
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DealerDetail;
