import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity,Linking,ActivityIndicator } from 'react-native';

const ChargingDealer = ({navigation,route}) => {
  const {city}=route.params
  const Brand=city
  console.log(city)
  const [loading,setloading]=useState(true)
  const [cycleList,setCycle]=useState('')
  const getCyle = async () => {
    try {
      setloading(true)
      let res = await fetch(`https://app.fuelfree.in/vendor/charging/filterBycity/${Brand}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      let result = await res.json();
      let productList = result.allDealers || [];
      setloading(false)
      setCycle(productList);
      console.log(productList)
    } catch (error) {
      console.log('Error fetching data:', error.message);
    }
  };
  
  useEffect(() => {
    getCyle()
  }, []);

  const gotoLocation=(url)=>{
    Linking.openURL(`${url}`)
  }
 
  const renderCycleItem = ({ item }) => (
    <View key={item._id} style={styles.card}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.address}</Text>
      <TouchableOpacity style={styles.viewBtn}  onPress={()=>gotoLocation(item.googleMapURL)} >
        <Text style={styles.viewBtnText}  >Location</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chargin Stations in {Brand} :</Text>
      {loading?(<ActivityIndicator size="large" color="#ff8c00" />):( <FlatList
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
    marginBottom: 30,
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between', 
  },
   
  card: {
    width: '48%', 
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
    width: '100%', 
    alignItems: 'center', 
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  viewBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default  ChargingDealer;
