import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Wishlist = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const getuserId = async () => {
      try {
        const userdata = await AsyncStorage.getItem('userData');
        if (userdata !== null) {
          const getuserdata = JSON.parse(userdata);
          let userinfo = getuserdata.user_details;
          setUserId(userinfo._id);
        }
      } catch (error) {
        console.log("null userdata");
      }
    };
    getuserId();
  }, []); // Only run once on mount

  const gotoDetails = ( id) => {
    navigation.navigate("productDetails", { pId: id });
  };

  const checkUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (!userDataString) {
        navigation.navigate('login');
      }
    } catch (error) {
      console.error('Error checking user data:', error);
    }
  };

  useEffect(() => {
    const getWishlist = async () => {
      try {
        if (userId) {
          let response = await axios.get(
            `https://app.fuelfree.in/favorite/list/${userId}`
          );
          let result = await response.data;
          let wishlistData = result.list;
          setWishlist(wishlistData);
        }
      } catch (error) {
        Alert.alert("No Items found in favorites");
      }
    };
    getWishlist();
    checkUserData();
  }, [userId]);

  const renderProductItem = ({ item }) => (
    <View key={item._id} style={styles.card}>
      <Image
        source={{ uri: `https://app.fuelfree.in/${item.productID?.productImage[0]}` }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.productID?.productName}</Text>
      <Text style={styles.productPrice}>Price: {item.productID?.productPrice}</Text>
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={() => gotoDetails(item._id)}
      >
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Shortlisted Vehicles:</Text>
      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <Text>No items in your wishlist</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 10,
      marginBottom:20
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#262681',
      textAlign: 'center',
    },
    columnWrapper: {
      justifyContent: "space-between",
    },
    card: {
      width: "48%",
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
  });

export default Wishlist;
