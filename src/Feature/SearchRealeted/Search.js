import { useState,useEffect } from 'react';
import { StyleSheet,ActivityIndicator, Text, View, TouchableOpacity, TextInput, FlatList ,Image,ScrollView,Linking} from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Search = ({route}) => {
  const {search}=route.params
 
  const [loading,setloading]=useState(true)
  const [products,setproduct]=useState('')
  const [News,setNews]=useState('')
  const [dealers,setdealers]=useState('')
  const [chargingStation,setchargingStation]=useState('')
  const [offer,setoffer]=useState('')
   const navigation=useNavigation()
  const handleSearch = async () => {
   
    try {
      setloading(true)
      const response = await fetch(`https://app.fuelfree.in/search/search?query=${search}`);
      const data = await response.json();
      let alldata=data?.Data
      
        setloading(false)
    
      setproduct(alldata?.products)
      setNews(alldata?.news)
      setdealers(alldata?.agency)
      setchargingStation(alldata?.charging)
      setoffer(alldata?.offers)
       // Assuming your API response contains a 'results' array
    } catch (error) {
      setloading(false)
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(()=>{
    if(search){
      handleSearch()
    }
  },[search])

  const gotoDetailsproduct = (id) => {
    navigation.navigate("productDetails", { pId: id });
  };

  const renderCycleItem = ({ item }) => (
    <View key={item._id} style={styles.card}>
       
      {item && item.productImage && item.productImage.length > 0 ? (
        <Image
          source={{ uri: `https://app.fuelfree.in/${item.productImage[0]}` }}
          style={styles.productImage}
        />
      ) : (
        <Image
          source={{ uri: `https://app.fuelfree.in/${item.productImage}` }}
          style={styles.productImage}
        />
      )}
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.productPrice}>{item.productPrice}</Text>
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={() => gotoDetailsproduct(item._id)}
      >
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  const gotoLocation=(url)=>{
    Linking.openURL(`${url}`)
  }

  // delaers 
  const renderDealerItem = ({ item }) => (
    <View key={item._id} style={styles.card}>
      
        <Image
          source={{ uri: `https://app.fuelfree.in/${item.logo}` }}
          style={styles.productImage}
        />
     
      <Text style={styles.productName}>{item.firmName}</Text>
      <Text style={styles.productPrice}>{item.address}</Text>
      <TouchableOpacity style={styles.viewBtn} onPress={() => gotoDetials(item._id)}>
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  const renderchargingItem = ({ item }) => (
    <View key={item._id} style={styles.card}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.address}</Text>
      <TouchableOpacity style={styles.viewBtn}  onPress={()=>gotoLocation(item.googleMapURL)} >
        <Text style={styles.viewBtnText}  >Location</Text>
      </TouchableOpacity>
    </View>
  );
   const [searchdata,setsearchdata]=useState('')
  const handlechangesearch=(v)=>{
    if(v){
      setsearchdata(v)
    }
  }
  const handlePressnews = (id) => {
    navigation.navigate('NewsDetail', { newsId:id });
  };

  const gotosearchDeatails=(value)=>{
    navigation.navigate('search',{search:value})
     
}

  return (
    <View style={styles.searchContainer}>
    
     <ScrollView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={(search)=>handlechangesearch(search)}
        />
         <TouchableOpacity style={styles.microPhone} onPress={() => gotosearchDeatails(searchdata)}>
         <Icon name="search" size={20} color="darkgray" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      {search?(<View>{
        loading?( <ActivityIndicator size="large" color="#ff8c00" />):(<View><Text style={styles.title}>results related {search} :</Text>
        {/* products  */}
        {products.length===0?"":(<Text style={styles.header}>Products:</Text>)}
        <FlatList
          data={products}
          renderItem={renderCycleItem}
          keyExtractor={products._id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
  
       {/* news */}
        
        {News.length===0?'':(<Text style={styles.header}>News:</Text>)}
        {News && News.map((newsItem) => (
        <TouchableOpacity onPress={()=>handlePressnews(newsItem._id)} key={newsItem._id} >
        <View style={styles.cardNews} key={newsItem._id} >
        <Image
            source={{ uri: `https://app.fuelfree.in/${newsItem.image}` }}
            style={styles.image}
          />
          <Text style={styles.title}>{newsItem.title}</Text>
          <Text style={styles.description}>{newsItem.content}</Text>
        </View>
        </TouchableOpacity>
         ))}
     
  
      {/* dealers  */}
      {dealers.length===0?'':(<Text style={styles.header}>Dealers:</Text>)}
      <FlatList
          data={dealers}
          renderItem={renderDealerItem}
          keyExtractor={dealers._id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
  
        {/* charging  */}
  
        {chargingStation.length===0?'':(<Text style={styles.header}>chargingStation:</Text>)}
        
      <FlatList
          data={chargingStation}
          renderItem={renderchargingItem}
          keyExtractor={chargingStation._id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
  
        {/* offers  */}
  
  
        {offer.length===0?'':(<Text style={styles.header}>Offers:</Text>)}
        {offer && offer.map((offerItem) => (
        <View style={styles.card} key={offerItem._id} >
        <Image
            source={{ uri: `https://app.fuelfree.in/${offerItem.offerImage}` }}
            style={styles.image}
          />
        <Text style={styles.title}>{offerItem.offerHeading}</Text>
        <Text style={styles.description}>{offerItem.offerText}</Text>
      </View>
         ))}</View>)
      }</View>):(<Text>No data found</Text>)}
      
      

</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(173, 216, 230, 0.3)',
    borderColor: 'darkgray',
    borderRadius: 50,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 8,
  },title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  microPhone: {
    right: 10,
  },
  searchIcon: {
    marginRight: 8,
    marginLeft: 10,
  },
  columnWrapper: {
    justifyContent: "space-between", // Add space between columns
  },
  heartIcon: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  card: {
    width: "48%", // Set a fixed width for consistent sizing
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: "space-between",
  },
  productImage: {
    width: "100%",
    height: 135,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
    marginBottom: 4,
  },
  viewBtn: {
    backgroundColor: "#26386e",
    width: "100%", // Set the width to 100% to increase the width
    alignItems: "center", // Center the content horizontally
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  viewBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  cardNews: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});

export default Search;
