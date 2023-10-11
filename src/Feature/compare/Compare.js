import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const Compare = () => {
  const [isReadyToCompare, setIsReadyToCompare] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [modalData, setModalData] = useState([]);

  
  const [selectedVehicleNameSection2, setSelectedVehicleNameSection2] = useState('');

  const [selectedVehicleTypeSection1, setSelectedVehicleTypeSection1] = useState('');
  const [selectedVehicleTypeSection2, setSelectedVehicleTypeSection2] = useState('');
  const [selectedBrandSection1, setSelectedBrandSection1] = useState('');
  const [selectedBrandSection2, setSelectedBrandSection2] = useState('');

  const vehicleTypes = ['Sedan', 'SUV'];
  const brands = ['Toyota', 'Honda'];
  const vehicleNames = ['Corolla', 'Civic'];

  const evOptions = [
    "Ev-cars",
    "Ev-bikes",
    "Ev-scooters",
    "Ev-cycles",
    "Ev-rickshaw",
    "Ev-loading",
    "Ev-buses",
    "E-Logistics",
    "Ev-Luna"
  ];
  const brands1 = ['oyota', 'Honda'];
  const vehicleNames1 = ['orolla', 'Civic'];

  const navigation = useNavigation();

  
  const [vehicleType, setvehicleTypes] = useState('')
  const [BrandList, setBrandList] = useState("");
  const uniqueBrandSet = new Set(
    BrandList && BrandList.map((item) => item.Brand.toLowerCase().toUpperCase())
  );
  const uniqueBrandList = Array.from(uniqueBrandSet);

  const getVhicleType = async (vehicleType) => {
    setvehicleTypes(vehicleType);
    let res = await axios.get(
      `https://app.fuelfree.in/product/productMultiFilter?VehicleType=${vehicleType}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let brands = await result.searchedProduct;

    setBrandList(brands);
  };

  const [brand, setBrand] = useState("");
  const [productNameList, setProductName] = useState("");
  const getBrand = async (brand) => {
    setBrand(brand);
    let res = await axios.get(
      `https://app.fuelfree.in/product/productMultiFilter?VehicleType=${vehicleType}&Brand=${brand}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let brands = await result.searchedProduct;
    setProductName(brands);
  };

  const [firstProduct, setFirst] = useState("");
  const p1_id = firstProduct ? firstProduct._id : null;
  const [p_name, setpName] = useState('')
  const getFirstProduct = async (productName) => {
    setpName(productName)
    let res = await axios.get(
      `https://app.fuelfree.in/product/productMultiFilter?VehicleType=${vehicleType}&Brand=${brand}&productName=${productName}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let brands = await result.searchedProduct;
    setFirst(brands[0]);
  };

  //second product 
  const [vehicleType1, setVehicleType1] = useState("");
  const [BrandList1, setBrandList1] = useState("");
  const uniqueBrand1Set = new Set(
    BrandList1 &&
      BrandList1.map((item) => item.Brand.toLowerCase().toUpperCase())
  );
  const uniqueBrand1List = Array.from(uniqueBrand1Set);
  const getVhicleType1 = async (vehicleType) => {
    setVehicleType1(vehicleType);
    let res = await axios.get(
      `https://app.fuelfree.in/product/productMultiFilter?VehicleType=${vehicleType}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let brands = await result.searchedProduct;
    setBrandList1(brands);
  };

  const [brand1, setBrand1] = useState("");
  const [productName1, setProductName1] = useState("");
  const getBrand1 = async (brand) => {
    setBrand1(brand);
    let res = await axios.get(
      `https://app.fuelfree.in/product/productMultiFilter?VehicleType=${vehicleType1}&Brand=${brand}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let brands = await result.searchedProduct;
    setProductName1(brands);
  };

  const [secondProduct, setSecond] = useState("");
  const P2_id = secondProduct ? secondProduct._id : undefined;
  const [p2name,setp2name]=useState('')
  const getSecondProduct = async (productName) => {
    setp2name(productName)
    let res = await axios.get(
      `https://app.fuelfree.in/product/productMultiFilter?VehicleType=${vehicleType1}&Brand=${brand1}&productName=${productName}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    let result = await res.data;
    let brands = await result.searchedProduct;
    setSecond(brands[0]);
  };


 
  const renderItem = ({ item }) => (
    <Picker.Item label={item} value={item} />
  );
  
  // const compareids={
  //   p1id:p1_id,
  //   p2id:P2_id
  // }
  const gotoComparedetails = () => {
    navigation.navigate('comparedetail',{p1id:p1_id,p2id:P2_id});
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>

        {firstProduct ? (<View>
          {firstProduct.productImage.length > 0 ? (
            <Image
              source={{ uri: `https://app.fuelfree.in/${firstProduct.productImage[0]}` }}
              style={styles.image}
            />
          ) : (
            <Image
              source={{ uri: `https://app.fuelfree.in/${firstProduct.productImage}` }}
              style={styles.image}
            />
          )}
        </View>) : (<Image
          source={require('../../components/bike.jpeg')}
          style={styles.image}
        />)}

<Picker
          selectedValue={selectedVehicleTypeSection1}
          onValueChange={(value) => {
            setSelectedVehicleTypeSection1(value);
            // Fetch brands and other data for the first section based on the selected vehicle type
            getVhicleType(value);
          }}>
          <Picker.Item label="Select Vehicle Type" value="" />
          {evOptions.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
        <Picker
          selectedValue={brand}
          onValueChange={(value) => getBrand(value)}>
          <Picker.Item label="Select Brand" value="" />
          {uniqueBrandList && uniqueBrandList.map((brand) => (
            <Picker.Item key={brand} label={brand} value={brand} />
          ))}
        </Picker>
        {productNameList && (<Picker
          selectedValue={p_name ? p_name : ''}
          onValueChange={(value) => getFirstProduct(value)}>
          <Picker.Item label="Select variant" value="" />
          {productNameList && productNameList.map((brand) => (
            <Picker.Item key={brand._id} label={brand.productName} value={brand.productName} />
          ))}
        </Picker>)}

      </View>

      <View style={styles.vsContainer}>
        <Text style={styles.vsText}>Vs</Text>
      </View>

      <View style={styles.sectiontwo}>
      {secondProduct ? (<View>
          {secondProduct.productImage.length > 0 ? (
            <Image
              source={{ uri: `https://app.fuelfree.in/${secondProduct.productImage[0]}` }}
              style={styles.image}
            />
          ) : (
            <Image
              source={{ uri: `https://app.fuelfree.in/${secondProduct.productImage}` }}
              style={styles.image}
            />
          )}
        </View>) : (<Image
          source={require('../../components/bike.jpeg')}
          style={styles.image}
        />)}
         <Picker
          selectedValue={selectedVehicleTypeSection2}
          onValueChange={(value) => {
            setSelectedVehicleTypeSection2(value);
            // Fetch brands and other data for the second section based on the selected vehicle type
            getVhicleType1(value);
          }}>
          <Picker.Item label="Select Vehicle Type" value="" />
          {evOptions.map((type) => (
            // Show options that match the selected vehicle type in the first section
            selectedVehicleTypeSection1 === '' || selectedVehicleTypeSection1 === type ? (
              <Picker.Item key={type} label={type} value={type} />
            ) : null
          ))}
        </Picker>
        <Picker
          selectedValue={brand1}
          onValueChange={(value) => getBrand1(value)}>
          <Picker.Item label="Select Brand" value="" />
          {uniqueBrand1List && uniqueBrand1List.map((brand) => (
            <Picker.Item key={brand} label={brand} value={brand} />
          ))}
        </Picker>
        {productName1 && (<Picker
          selectedValue={p2name ? p2name : ''}
          onValueChange={(value) => getSecondProduct(value)}>
          <Picker.Item label="Select variant" value="" />
          {productName1 && productName1.map((brand) => (
            <Picker.Item key={brand._id} label={brand.productName} value={brand.productName} />
          ))}
        </Picker>)}
      </View>

      <View style={styles.compareButtonContainer}>
        {p1_id&&p1_id===P2_id&&P2_id?(<Text>Can Not Compare Two Same Vehicles</Text>):(<Button title="Compare Now" onPress={gotoComparedetails} color="#26386e" />)}
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  sectiontwo: {
    marginBottom: 20,
  },
  compareButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  vsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#26386e',
    width: 50,
    left: 140,
    height: 50,
    borderRadius: 50,
  },
  vsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default Compare;
