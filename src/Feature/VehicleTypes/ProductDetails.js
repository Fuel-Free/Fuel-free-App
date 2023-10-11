import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ProductDetails = ({ route }) => {
  const { pId } = route.params;

  
  const navigation = useNavigation();
  
  const gotobuynow = () => {
    navigation.navigate("buynow",productDetails);
  };
  const goToTestDrive = () => {
    navigation.navigate("testDriveForm",productDetails);
  };
  const goToEnquiryNow = () => {
    navigation.navigate("enquiryNow",productDetails );
  };

  // const data = [
  //   { id: "1", text: "Item 1" },
  //   { id: "2", text: "Item 2" },
  //   { id: "3", text: "Item 3" },
  //   { id: "4", text: "Item 4" },
  //   { id: "5", text: "Item 5" },
  //   { id: "6", text: "Item 6" },
  // ];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // const handleDownloadBrochure = () => {
  //   if (productDetails && productDetails.brochure) {
  //     const url = `https://app.fuelfree.in/${productDetails.brochure}`;
  //     Linking.openURL(url);
  //   }
  // };
  const [productDetails, setproductDetails] = useState("");
  const getDetails = async () => {
    let res = await axios.get(
      `https://app.fuelfree.in/product/details/${pId}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let details = await result.productDetails;
    console.log('====================================');
    console.log('====================================');
    setproductDetails(details);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productImageContainer}>
        <Image
          source={{
            uri: `https://app.fuelfree.in/${productDetails && productDetails?.productImage[selectedImageIndex]
              }`,
          }}
          style={styles.productImage}
          accessibilityLabel="Product Image"
        />
      </View>
      <View style={styles.productInfoContainer}>
        <View style={styles.imageSection}>
          <Text style={styles.imageSectionTitle}>More Images</Text>
          {productDetails?.productImage &&
            productDetails?.productImage.length > 0 ? (
            <FlatList
              data={productDetails?.productImage}
              horizontal
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => setSelectedImageIndex(index)}>
                  <Image
                    source={{ uri: `https://app.fuelfree.in/${item}` }}
                    style={styles.additionalImage}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          ) : (
            <Text>No additional images available.</Text>
          )}
        </View>
        <View>
          <Text style={styles.productTitle}>Product Name: </Text>
          <Text style={styles.productDescription}>
            {productDetails && productDetails.productName}
          </Text>
          <Text style={styles.productTitle}>price:</Text>
          <Text style={styles.productPrice}>
            Rs. {productDetails && productDetails.productPrice}
          </Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.productButton}
            onPress={goToTestDrive}
          >
            <Text style={styles.buttonText} onPress={goToTestDrive}>Test Drive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.productButton} onPress={gotobuynow}>
            <Text style={styles.buttonText} onPress={gotobuynow}>Book Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.productButton}
            onPress={goToEnquiryNow}
          >
            <Text style={styles.buttonText} onPress={goToEnquiryNow}>Enquiry Now</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      {/* <View>
        <Text style={styles.productPri}>Product Varients:</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.column}>
              <Text>{item.text}</Text>
            </View>
            <View style={styles.column}>
              <View style={styles.innerComponent}></View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3} 
      /> */}
      <View>
        <Text style={styles.productPri}>Product Specifications:</Text>
        <View style={styles.specificationsContainer}>
          <View style={styles.specificationRow}>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Vehicle Name:</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.productName}
              </Text>
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Vehicle Type:</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.VehicleType}
              </Text>
            </View>
          </View>
          <View style={styles.specificationRow}>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Brand:</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.Brand}
              </Text>
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Top Speed:</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.topSpeed}
              </Text>
            </View>
          </View>
          <View style={styles.specificationRow}>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Battery Voltage:</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.batteryVoltage}
              </Text>
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Battery Warranty:</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.batteryWarrantyKM} 'KM'
                {productDetails && productDetails.batteryWarrantyYears} 'years'
              </Text>
            </View>
          </View>
          <View style={styles.specificationRow}>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Ex-Showroom Price:</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.productPrice}
              </Text>
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Driving Range:</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.DrivingRange}
              </Text>
            </View>
          </View>
          <View style={styles.specificationRow}>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Charging Time</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.chargingTime}
              </Text>
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Front Brake Type</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.frontBrakeType}
              </Text>
            </View>
          </View>
          <View style={styles.specificationRow}>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Charger Included</Text>
              {productDetails && productDetails.chargerIncluded === true ? (<Text style={styles.specificationValue}>yes</Text>) : (<Text style={styles.specificationValue}>No</Text>)}
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Anti-Lock Brakeing System</Text>
              {productDetails && productDetails.ABS === true ? (<Text style={styles.specificationValue}>yes</Text>) : (<Text style={styles.specificationValue}>No</Text>)}
            </View>
          </View>
          <View style={styles.specificationRow}>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Automatic Emergency Braking</Text>
              {productDetails && productDetails.AEB === true ? (<Text style={styles.specificationValue}>yes</Text>) : (<Text style={styles.specificationValue}>No</Text>)}

            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Parking Assist</Text>
              {productDetails && productDetails.parkingAssist === true ? (<Text style={styles.specificationValue}>yes</Text>) : (<Text style={styles.specificationValue}>No</Text>)}
            </View>
          </View>

          <View style={styles.specificationRow}>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Revers Assist</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.eversAssist}
              </Text>
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Distance To Empty</Text>
              {productDetails && productDetails.DistanceToEmpty === true ? (<Text style={styles.specificationValue}>yes</Text>) : (<Text style={styles.specificationValue}>No</Text>)}
            </View>
          </View>

          <View style={styles.specificationRow}>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Display</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.display}
              </Text>
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>GPS Navigation System</Text>
              {productDetails && productDetails.GPSNavigationSystem === true ? (<Text style={styles.specificationValue}>yes</Text>) : (<Text style={styles.specificationValue}>No</Text>)}
            </View>
          </View>

          <View style={styles.specificationRow}>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Bluetooth Compatibility</Text>
              {productDetails && productDetails.bluetoothCompatibility === true ? (<Text style={styles.specificationValue}>yes</Text>) : (<Text style={styles.specificationValue}>No</Text>)}
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Rear Break Type</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.rearBrakeType}
              </Text>
            </View>
          </View>

          <View style={styles.specificationRow}>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Front Suspension</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.frontSuspension}
              </Text>
            </View>
            <View style={styles.specification}>
              <Text style={styles.specificationLabel}>Rear Suspension</Text>
              <Text style={styles.specificationValue}>
                {productDetails && productDetails.rearSuspension}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Download Brochure</Text>
        </View>
        {productDetails && productDetails.brochure ? (
          <View style={styles.brochureContainer}>
            <WebView
              source={{ uri: `https://app.fuelfree.in/${productDetails.brochure}` }}
              style={styles.webView}
            />
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={handleDownloadBrochure}
            >
              <Icon name="md-download" size={20} color="white" />
              <Text style={{ color: "white" }}>Download</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>No brochure available.</Text>
        )}
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  productImageContainer: {
    alignItems: "center",
    // paddingVertical: 5,
  },
  productImage: {
    width: 400,
    height: 200,
    resizeMode: "cover",
  },
  productInfoContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: -40,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    top: 20,
    color: "#26386e",
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  productContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  contentType: {
    marginBottom: 5,
  },
  contentTypeText: {
    fontWeight: 'bold',
  },
  brochureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  webView: {
    width: '40%',
    height: 200,
  },
  downloadButton: {
    marginLeft: 10,
  },
  productPri: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#26386e",
    marginLeft: 20,
    marginTop: 30,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productButton: {
    backgroundColor: "#26386e",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  imageSection: {
    marginTop: 20,
  },
  imageSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#26386e",
  },
  additionalImage: {
    width: 95,
    height: 80,
    resizeMode: "cover",
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    margin: 10,
  },
  column: {
    marginHorizontal: 5,
  },
  specificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  specificationLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  specificationValue: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#26386e',
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 20,
  },
  specificationsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  specificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  specification: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  specificationLabel: {
    fontWeight: 'bold',
    color: '#26386e',
    marginBottom: 5,
  },
  specificationValue: {
    color: '#555',
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    overflow: "hidden", // To hide any overflow from child components
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#26386e",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  brochureContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  webView: {
    width: "40%",
    height: 150,
  },
  downloadButton: {
    backgroundColor: "#26386e",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default ProductDetails;