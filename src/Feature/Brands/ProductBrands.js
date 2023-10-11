import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput
} from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BrandProduct = ({navigation, route}) => {
  const {Brand} = route.params;
  const [cycleList, setCycle] = useState('');
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [search, setSearch] = useState('');
  const [uid, setUid] = useState("");
  const [loading, setloading] = useState(true);
  const getCyle = async () => {
    try {
      setloading(true);
      let res = await fetch(
        `https://app.fuelfree.in/product/brand?Brand=${Brand}`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
          },
        },
      );
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      let result = await res.json();
      let productList = result.searchedProduct || [];
      if (productList) {
        setloading(false);
      }
      setCycle(productList);
    } catch (error) {
        setTimeout(() => {
            setloading(false)
        }, 2000);
        setloading(true)
      console.log('Error fetching data:', error.message);
    }
  };
  const handleNavigation = screenName => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    getCyle();
  }, []);

  useEffect(() => {
    const getuserId = async () => {
      try {
        const userdata =await AsyncStorage.getItem('userData');
        if (userdata !== null) {
          const getuserdata = JSON.parse(userdata);
          let userinfo = getuserdata.user_details;
          setUid(userinfo._id);
        }
      } catch (error) {
        console.log("null userdata");
      }
    };
    getuserId();
  });

  const addtowishlist = async (productId,favStatus) => {
    if(!favStatus){
      try {
        let response = await axios.post(
          `https://app.fuelfree.in/favorite/add/${uid}/${productId}`,
          {},
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (response.status === 200) {
          const result = response.data;
          if (result.success === "success") {
            setFavoriteStatus((prevStatus) => ({
              ...favoriteStatus,
              [productId]: !prevStatus[productId],
            }));
            Alert.alert("Added to favorite list");
          } else {
            Alert.alert("Already in favorite list");
          }
        } else {
          Alert.alert("Failed to add to favorite list");
        }
      } catch (error) {
        console.log(error)
        Alert.alert(
          "Error",
          "An error occurred while adding to the favorite list."
        );
        Alert.alert("Already in favorite list", error);
      }
    }
    else{
      
    }
  };

  const [filteredList, setFilteredList] = new useState(cycleList);
  const filterBySearch = (value) => {
    const query = value.toLowerCase();
    setSearch(query)
    const updatedList = cycleList.filter((item) => {
      const productName = item.productName.toLowerCase().includes(query);
      const productPriceMatch = item.productPrice.toString().includes(query);
      const topSpeedMatch = item.topSpeed.toString().includes(query);
      const BrandMatch = item.Brand.toLowerCase().includes(query);
      
      return productName || productPriceMatch || BrandMatch || topSpeedMatch;
    });
    setFilteredList(updatedList);
  };

  const renderFilterItem = ({ item }) => (
    <View key={item._id} style={styles.card}>
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => addtowishlist(item._id,favoriteStatus[item._id])}
      >
        {favoriteStatus[item._id] ? (
          <Image
        source={require('../../../assets/heartIcon.png')}
        style={{
          width: 25,  
          height: 25, 
          resizeMode: 'contain',  
        }}
      />
        ) : (
          <Image
        source={require('../../../assets/heartIcon.png')}
        style={{
          width: 25,  
          height: 25, 
          resizeMode: 'contain',  
        }}
      />
        )}
      </TouchableOpacity>
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
      <Text style={styles.productPrice}>Rs {item.productPrice}</Text>
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={() => gotoDetails(item._id)}
      >
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderCycleItem = ({item}) => (
    <View key={item._id} style={styles.card}>
    <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => addtowishlist(item._id,favoriteStatus[item._id])}
      >
        {favoriteStatus[item._id] ? (
          <Image
        source={require('../../../assets/heartIcon.png')}
        style={{
          width: 25,  
          height: 25, 
          resizeMode: 'contain',  
        }}
      />
        ) : (
          <Image
        source={require('../../../assets/heartIcon.png')}
        style={{
          width: 25,  
          height: 25, 
          resizeMode: 'contain',  
        }}
      />
        )}
      </TouchableOpacity>
      {item && item.productImage && item.productImage.length > 0 ? (
        <Image
          source={{uri: `https://app.fuelfree.in/${item.productImage[0]}`}}
          style={styles.productImage}
        />
      ) : (
        <Image
          source={{uri: `https://app.fuelfree.in/${item.productImage}`}}
          style={styles.productImage}
        />
      )}
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.productPrice}>{item.productPrice}</Text>
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={() => handleNavigation('About')}>
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
     <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search Electric Cycles"
          value={search}
          returnKeyType="search"
          // onSubmitEditing={() => filterBySearch(search)}
          onChangeText={text => filterBySearch(text)}
        />
      </View>
      <Text style={styles.title}> {Brand} Paroducts:</Text>
      {loading ? (
      <ActivityIndicator size="large" color="#ff8c00" />
    ) : (
      (filteredList && filteredList.length > 0) ? (
        <FlatList
          data={filteredList}
          renderItem={renderFilterItem}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <FlatList
          data={cycleList}
          renderItem={renderCycleItem}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      )
    )}
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
  heartIcon: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  input: {
    flex: 1,
    padding: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(173, 216, 230, 0.3)',
    borderColor: 'darkgray',
    borderRadius: 50,
    marginBottom: 10,
  }, 

  card: {
    width: '48%', // Set a fixed width for consistent sizing
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    marginBottom: 16,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 2},
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

export default BrandProduct;
