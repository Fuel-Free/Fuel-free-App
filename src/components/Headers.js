import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Image, ScrollView, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CityModal from '../Feature/Modals/CityModal';
import { useNavigation } from '@react-navigation/native';
import ChargingModal from '../Feature/Modals/ChargingModal';
import NewVehicleOptionsModal from '../Feature/Modals/NewVehicleOptionsModal';

const Header = () => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewVehicleOptionsVisible, setIsNewVehicleOptionsVisible] = useState(false);
  const [isCityModalVisibleCharging, setIsCityModalVisiblecharging] = useState(false);
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);
  const [selectedNewVehicleOption, setSelectedNewVehicleOption] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleNewVehicleModal = () => {
    setIsNewVehicleOptionsVisible(!isNewVehicleOptionsVisible);
  };

  const openNewVehicleModal = (option) => {
    setSelectedNewVehicleOption(option);
    toggleNewVehicleModal();
  };

  const handleNavigation = (screenName) => {
    if (screenName === 'usedvehicle' || screenName === 'selectcity') {
      setIsCityModalVisible(true); // Open city selection modal
      setIsSidebarOpen(false); // Close the sidebar
    } else if (screenName === 'newvehicle') {
      toggleNewVehicleModal(); // Toggle new vehicle options
    } else {
      setIsSidebarOpen(false); // Close the sidebar
      toggleNewVehicleModal(); // Close new vehicle options
      navigation.navigate("Products", { VehicleType: screenName }); // Navigate to the selected screen
    }
  };

  const handleNavigationCharging = (screenName) => {
    if (screenName === 'chargingvehicle' || screenName === 'selectcharging') {
      setIsCityModalVisiblecharging(true); // Open city selection modal
      setIsSidebarOpen(false); // Close the sidebar
    } else if (screenName === 'newvehicle') {
      toggleNewVehicleModal(); // Toggle new vehicle options
    } else {
      setIsSidebarOpen(false); // Close the sidebar
      toggleNewVehicleModal(); // Close new vehicle options
      navigation.navigate(screenName);
    }
  };

  const gotowishlist = () => {
    navigation.navigate("wishlist");
  };

  const gotohome = () => {
    navigation.navigate("Home");
  };

  const handlefreeconsultation = (value) => {
    navigation.navigate(value);
  };

  const handleoffer = (value) => {
    navigation.navigate(value);
  };

  const handlenews = (value) => {
    navigation.navigate(value);
  };

  const handleprofile = (value) => {
    navigation.navigate(value);
  };

  const goToHeaderLinkedin = () => {
    Linking.openURL('https://www.linkedin.com/company/fuelfree/');
  };

  const goToHeaderfacebook = () => {
    Linking.openURL('https://www.facebook.com/people/FuelFree/100092497026712/?mibextid=ZbWKwL');
  };

  const goToHeaderInstagram = () => {
    Linking.openURL('https://www.instagram.com/fuelfree.in/?igshid=YmMyMTA2M2Y%3D');
  };

  const goToHeaderwhatsapp = () => {
    Linking.openURL('https://api.whatsapp.com/send/?phone=7880088944&text&type=phone_number&app_absent=0');
  };

  const goToHeadertwitter = () => {
    Linking.openURL('https://twitter.com/fuelfreeind');
  };

  const goToHeaderyoutube = () => {
    Linking.openURL('https://www.youtube.com/@fuelfree-EV');
  };

  return (
    <View style={styles.container}>
      {isSidebarOpen && (
        <TouchableOpacity onPress={closeSidebar} style={styles.overlay} activeOpacity={1} />
      )}
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.sidebarButton}>
        <Image source={require('../../assets/headersIcon.png')} style={styles.logoImag} />
        </TouchableOpacity>
        <TouchableOpacity onPress={gotowishlist} style={styles.heartIcon}>
        <Image source={require('../../assets/heartIcon.png')} style={styles.logoImagss} />
       
        </TouchableOpacity>
        <TouchableOpacity onPress={gotohome}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/logoFF.png')} style={styles.logoImage} />
          </View>
        </TouchableOpacity>
      </View>
      {isSidebarOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={closeSidebar} style={styles.closeIcon}>
           <Text style={styles.closeXsymbol} >x</Text>  
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/logoFF.png')} style={styles.logoImage} />
          </View>
          <ScrollView>
            <TouchableOpacity onPress={toggleNewVehicleModal} style={styles.sidebarItem}>
              <Text>New Vehicle</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => handleNavigation('selectcity')} style={styles.sidebarItem}>
              <Text>Used Vehicle</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => handlenews('News')} style={styles.sidebarItem}>
              <Text>News & Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleoffer('Offers')} style={styles.sidebarItem}>
              <Text>Offers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('selectcity')} style={styles.sidebarItem}>
              <Text>EV Dealers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigationCharging('selectcharging')} style={styles.sidebarItem}>
              <Text>Charging Stations</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlefreeconsultation('freeconsultation')} style={styles.sidebarItem}>
              <Text>Free Consultation</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleprofile('profile')} style={styles.sidebarItem}>
              <Text>Settings</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.socialMediaRow}>
            <TouchableOpacity style={styles.socialMediaIcon} onPress={goToHeaderfacebook}>
            <Image
        source={require('../../assets/faceBook.png')}
        style={{
          width: 25,  
          height: 25, 
          resizeMode: 'contain',  
        }}
      />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialMediaIcon} onPress={goToHeadertwitter}>
            <Image
        source={require('../../assets/twitter.png')}
        style={{
          width: 25,  
          height: 25, 
          resizeMode: 'contain',  
        }}
      />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialMediaIcon} onPress={goToHeaderInstagram}>
            <Image
        source={require('../../assets/instagram.png')}
        style={{
          width: 25,  
          height: 25, 
          resizeMode: 'contain',  
        }}
      />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialMediaIcon} onPress={goToHeaderwhatsapp}>
            <Image
        source={require('../../assets/whatsapp.png')}
        style={{
          width: 25,  
          height: 25, 
          resizeMode: 'contain',  
        }}
      />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialMediaIcon} onPress={goToHeaderLinkedin}>
            <Image
        source={require('../../assets/linkdin.png')}
        style={{
          width: 25,  
          height: 25, 
          resizeMode: 'contain',  
        }}
      />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialMediaIcon} onPress={goToHeaderyoutube}>
            <Image
        source={require('../../assets/youtube.png')}
        style={{
          width: 25,  
          height: 25, 
          resizeMode: 'contain',  
        }}
      />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isCityModalVisible && (
        <CityModal
          visible={isCityModalVisible}
          onClose={() => setIsCityModalVisible(false)}
          onSelectCity={(city) => {
            setIsCityModalVisible(false);
          }}
        />
      )}
      {isCityModalVisibleCharging && (
        <ChargingModal
          visible={isCityModalVisibleCharging}
          onClose={() => setIsCityModalVisiblecharging(false)}
          onSelectCity={(city) => {
            setIsCityModalVisiblecharging(false);
          }}
        />
      )}
      {isNewVehicleOptionsVisible && (
        <NewVehicleOptionsModal
          isVisible={isNewVehicleOptionsVisible}
          onClose={toggleNewVehicleModal}
          handleNavigation={handleNavigation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex:999,
    height:57,
    // backgroundColor: "white",
  },
  logoIma: {
    width: 'auto',
    height: 50,
  },
  closeXsymbol: {
   fontSize:25,
  },
  heartIcon: {
    marginLeft: 150,
    marginTop: 2,
  },
  subOption: {
    paddingLeft: 40,
    marginTop: 2,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  socialMediaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  socialMediaIcon: {
    marginHorizontal: 7,
  },
  headerContent: {
    flexDirection: 'row',
    padding: 20,
  },
  logoImage: {
    width: 140,
    height: 100,
    resizeMode: 'contain',
  },
  logoImagss:{
   height:35,
   width:28,
   marginTop:1
  },
  logoImag: {
    height:22,
    width:23,
    marginTop:4
  },
  sidebarButton: {
    marginTop: 2,
    color: 'black',
    width: 30,
    height: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#f0f0f0',
    width: Dimensions.get('window').width * 0.7,
    height: 738,
    padding: 40,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    zIndex: 2,
  },
  closeIcon: {
    position: 'absolute',
    top: 53,
    right: 20,
    color: 'orange',
  },
  logoContainer: {
    alignItems: 'left',
    top: -30,
    height: 50,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  sidebarItem: {
    padding: 20,
    fontWeight: 'bold',
    zIndex: -2,
    marginTop: 2,
  },
  sidebarScroll: {
    flex: 1,
  },
});

export default Header;
