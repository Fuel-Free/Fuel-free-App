import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity,ActivityIndicator } from 'react-native';
const AgencyDealers = ({navigation,route}) => {
  const {city}=route.params
  const Brand=city
  console.log(city)
  const [cycleList,setCycle]=useState('')
  const [loading,setloading]=useState(true)
  const getCyle = async () => {
    try {
      setloading(true)
      let res = await fetch(`https://app.fuelfree.in/vendor/agency/filterByCity?city=${city}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      let result = await res.json();
      let productList = result.search || [];
      setloading(false)
      setCycle(productList);
    } catch (error) {
      console.log('Error fetching data:', error.message);
    }
  };
  
  
  useEffect(() => {
    getCyle()
  }, []);

  const  gotoDetials = (id) => {
    navigation.navigate('dealerdetail', { id: id });
  };
  const renderCycleItem = ({ item }) => (
    <View key={item._id} style={styles.card}>
{/*       
      {item.logo?(<Image
          source={{ uri: `https://app.fuelfree.in/${item.logo}` }}
          style={styles.productImage}
        />):()}   */}
     <Image
            source={require('../../../assets/dealersimgbanner.jpeg')}
          style={styles.productImage}
        />
      <Text style={styles.productName}>{item.firmName}</Text>
      <Text style={styles.productPrice}>{item.address}</Text>
      <TouchableOpacity style={styles.viewBtn} onPress={() => gotoDetials(item._id)}>
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  //auto
 // Import the Expo Location module

 
   

  return (
    <View style={styles.container}>
      {/* input */}
      <Text style={styles.title}>Agency Dealers In {Brand} :</Text>
      {loading?(<ActivityIndicator size="large" color="#ff8c00" />):(<FlatList
        data={cycleList}
        renderItem={renderCycleItem}
        keyExtractor={cycleList._id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
/>)}
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Add space between columns
  },
   
  card: {
    width: '48%', // Set a fixed width for consistent sizing
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    marginBottom: 16,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: 'space-between',
  },
  productImage: {
    width: '100%',
    height: 135,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
    marginBottom: 4,
  },
  viewBtn: {
    backgroundColor: '#26386e',
    width: '100%', // Set the width to 100% to increase the width
    alignItems: 'center', // Center the content horizontally
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  viewBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default  AgencyDealers;
