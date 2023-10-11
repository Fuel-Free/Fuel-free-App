import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios'

const Comparedetails = ({route}) => {
  const {p1id,p2id}=route.params

  const [comparison, setCompare] = useState('')
 
 
    const Compare = async () => {
        let result = await axios.get(`https://app.fuelfree.in/product/compare/${p1id}/${p2id}`, {

            headers: {
                "Accept": "application/json"
            }
        })
        let data = await result.data

        let compareData = data?.comparison
        setCompare(compareData)
    }

    useEffect(() => {
        Compare()
    },[p1id,p2id])
  
  const product1 = {
    name: 'SUV',
    description: 'Description of Sadan',
    features: ['Top Speed', 'Battery Warranty(Years)', 'Charging Time', 'Driving Range'],
    image: require('../../components/bike.jpeg'), 
    price: 'Rs.299.99',
  };

  const product2 = {
    name: 'Sadan',
    description: 'Description of SUV',
    features: ['Top Speed', 'Battery Warranty(Years)', 'Charging Time', 'Driving Range'],
    image: require('../../components/bike.jpeg'), 
    price: 'Rs.249.99', 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.productContainer}>
        <View style={styles.productInfo}>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
          <Text style={styles.productName}>{comparison&&comparison[0].productName}</Text>
          {comparison&&comparison[0] ? (<View>
          {comparison&&comparison[0].productImage.length > 0 ? (
            <Image
              source={{ uri: `https://app.fuelfree.in/${comparison&&comparison[0].productImage[0]}` }}
              style={styles.image}
            />
          ) : (
            <Image
              source={{ uri: `https://app.fuelfree.in/${comparison&&comparison[0].productImage}` }}
              style={styles.image}
            />
          )}
        </View>) : (<Image source={product1.image} style={styles.image} />)}
            
            <Text style={styles.productPrice}>Rs.{comparison&&comparison[0].productPrice}</Text>
            {/* <Text style={styles.productDescription}>{product1.description}</Text> */}
          </View>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.imageWrapper}>
          <Text style={styles.productName}>{comparison&&comparison[0]&&comparison[1].productName}</Text>
          {comparison&&comparison[0]&&comparison[1] ? (<View>
          {comparison&&comparison[0]&&comparison[1].productImage.length > 0 ? (
            <Image
              source={{ uri: `https://app.fuelfree.in/${comparison&&comparison[0]&&comparison[1].productImage[0]}` }}
              style={styles.image}
            />
          ) : (
            <Image
              source={{ uri: `https://app.fuelfree.in/${comparison&&comparison[0]&&comparison[1].productImage}` }}
              style={styles.image}
            />
          )}
        </View>) : (<Image source={product1.image} style={styles.image} />)}
            <Text style={styles.productPrice}>Rs.{comparison&&comparison[0]&&comparison[1].productPrice}</Text>
            {/* <Text style={styles.productDescription}>{product2.description}</Text> */}
          </View>
        </View>
      <View>
        <Text style={styles.Featureheading}>Features</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.specificationsContainer}>
          <View style={styles.specificationItem}>
            <Text style={styles.specificationTitle}>{comparison&&comparison[0].productName}</Text>
            <Text style={styles.specificationText}>Price:{comparison&&comparison[0].productPrice}</Text>
            {/* <Text style={styles.specific}>{}</Text> */}
            <Text style={styles.specificationText}>Top Speed:</Text>
            <Text style={styles.specific}> {comparison&&comparison[0].topSpeed} km/h</Text>
            <Text style={styles.specificationText}>Battery Warranty(Years):</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].batteryWarrantyYears} Years</Text>
            <Text style={styles.specificationText}>Charging Time:</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].chargingTime} hours</Text>
            <Text style={styles.specificationText}>Driving Range:</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].DrivingRange} km</Text>
          </View>
          <View style={styles.specificationItemtwo}>
          <Text style={styles.specificationTitle}>{comparison&&comparison[0]&&comparison[1].productName}</Text>
            <Text style={styles.specificationText}>Price:{comparison&&comparison[0]&&comparison[1].productPrice}</Text>
            <Text style={styles.specificationText}>Top Speed:</Text>
            <Text style={styles.specific}> {comparison&&comparison[0]&&comparison[1].topSpeed} km/h</Text>
            <Text style={styles.specificationText}>Battery Warranty(Years):</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].batteryWarrantyYears} Years</Text>
            <Text style={styles.specificationText}>Charging Time:</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].chargingTime} hours</Text>
            <Text style={styles.specificationText}>Driving Range:</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].DrivingRange} km</Text>
          </View>
      </View>
      </View>
      <View>
        <Text style={styles.Featureheading}>Specifications</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.specificationsContainer}>
          <View style={styles.specificationItem}>
          <Text style={styles.specificationTitle}>{comparison&&comparison[0].productName}</Text>
            <Text style={styles.specificationText}>Variant : </Text>
            <Text style={styles.specific}>{comparison&&comparison[0].variant}</Text>
            <Text style={styles.specificationText}>Rear Break Type: </Text>
            <Text style={styles.specific}>{comparison&&comparison[0].rearBrakeType}</Text>
            <Text style={styles.specificationText}>Parking Assist: </Text>
            <Text style={styles.specific}>{comparison&&comparison[0].parkingAssist===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
            <Text style={styles.specificationText}>Distance To Empty:</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].distanceToEmpty===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
            <Text style={styles.specificationText}>GPS Navigation System :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].GPSNavigationSystem===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
            <Text style={styles.specificationText}>Brand</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].Brand}</Text>
            <Text style={styles.specificationText}>Fornt Break Type :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].frontBrakeType}</Text>
            <Text style={styles.specificationText}>Charger Included :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].chargerIncluded===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
            <Text style={styles.specificationText}>Automatic Emergency Breaking :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].AEB===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
            <Text style={styles.specificationText}>Reverse Assets :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].reverseAssist===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
            <Text style={styles.specificationText}>Display :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].display}</Text>
            <Text style={styles.specificationText}>Display Size:</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].displaySize}</Text>
            <Text style={styles.specificationText}>Bluetooth Compatibility :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0].bluetoothCompatibility===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
          </View>
          <View style={styles.specificationItemtwo}>
          <Text style={styles.specificationTitle}>{comparison&&comparison[0]&&comparison[1].productName}</Text>
            <Text style={styles.specificationText}>Variant : </Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].variant}</Text>
            <Text style={styles.specificationText}>Rear Break Type: </Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].rearBrakeType}</Text>
            <Text style={styles.specificationText}>Parking Assist: </Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].parkingAssist===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
            <Text style={styles.specificationText}>Distance To Empty:</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].distanceToEmpty===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
            <Text style={styles.specificationText}>GPS Navigation System :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].GPSNavigationSystem===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
            <Text style={styles.specificationText}>Brand</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].Brand}</Text>
            <Text style={styles.specificationText}>Fornt Break Type :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].frontBrakeType}</Text>
            <Text style={styles.specificationText}>Charger Included :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].chargerIncluded===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
            <Text style={styles.specificationText}>Automatic Emergency Breaking :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].AEB===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
            <Text style={styles.specificationText}>Reverse Assets :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].reverseAssist===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
            <Text style={styles.specificationText}>Display :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].display}</Text>
            <Text style={styles.specificationText}>Display Size:</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].displaySize}</Text>
            <Text style={styles.specificationText}>Bluetooth Compatibility :</Text>
            <Text style={styles.specific}>{comparison&&comparison[0]&&comparison[1].bluetoothCompatibility===true?(<Text>yes</Text>):(<Text>No</Text>)}</Text>
          </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  
  specific: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'darkgray',
  },
  
  specificationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  specificationText: {
    fontSize: 12,
    color: 'orange',
    marginBottom: 5,
    fontWeight: 'bold',
  },

  specificationItem: {
    flex: 1,
  },

  specificationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#26386e',
    marginBottom: 10,
  },

  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  featureItem: {
    flex: 1,
    marginLeft: 10,
  },

  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#26386e',
    marginBottom: 10,
  },

  featureText: {
    fontSize: 12,
    color: 'darkgray',
    marginBottom: 5,
  },

  Featureheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    color:'#26386e',
    textAlign: 'center',
  },

  productContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },

  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

  image: {
    width: 120,
    height: 100,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#26386e',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  vsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26386e',
    width: '10%',
    height: 33,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 3.3,
    shadowRadius: 9,
    elevation: 5,
    bottom: -2,
  },

  vsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'orange',
  },
  productPrice: {
    fontSize: 11,
    marginTop: 5,
    color: 'darkgray',
  },
  productDescriptionContainer: {
    alignItems: 'center',
  },
  productDescription: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#26386e',
  },
  horizontalLine: {
    width: 325, // Adjust the width as needed
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default Comparedetails;
