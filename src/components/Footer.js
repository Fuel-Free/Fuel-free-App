import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking ,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import CityModal from '../Feature/Modals/CityModal';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ChargingModal from '../Feature/Modals/ChargingModal';

const Footer = () => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCityModalVisible, setIsCityModalVisible] = useState(false);
  const [isNewVehicleOptionsVisible, setIsNewVehicleOptionsVisible] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); 
  const [isCityModalVisibleCharging, setIsCityModalVisiblecharging] = useState(false);

  useEffect(() => {
    const userIsRegistered = true; 

    setIsRegistered(userIsRegistered);
  }, []);

  const profileScreen = isRegistered ? 'profile' : 'register';
  const goToFooterHome = () => {
    navigation.navigate('Home');
  };
  const goToFooterContact = () => {
    Linking.openURL('tel:7880088944');
  };
  const goToFooterAbout = () => {
    navigation.navigate('About');
  };
  const goToFooterDealers = () => {
    navigation.navigate('selectCity'); 
  };
  const goToFooterProfile = () => {
    navigation.navigate('register');
  };
  const goToFooterCompare = () => {
    navigation.navigate('compare');
  };

  const handleNavigation = (screenName) => {
    if (screenName === 'usedvehicle' || screenName === 'selectcity') {
      setIsCityModalVisible(true);
    } else if (screenName === 'newvehicle') {
      setIsNewVehicleOptionsVisible(!isNewVehicleOptionsVisible);
    } else if (screenName === 'compare') { // Handle the new icon
      setIsCompareModalVisible(true);
    } else {
      setIsNewVehicleOptionsVisible(false);
      setIsCompareModalVisible(false); // Close compare modal if navigating to another screen
      navigation.navigate(screenName);
    }
  };
  const handleNavigationCharging = (screenName) => {
    if (screenName === 'chargingvehicle' || screenName === 'selectcharging' ) {
      setIsCityModalVisiblecharging(true); // Open city selection modal
      setIsSidebarOpen(false); // Close the sidebar
    } else if (screenName === 'newvehicle') {
      setIsNewVehicleOptionsVisible(!isNewVehicleOptionsVisible); // Toggle new vehicle options
    } else {
      setIsSidebarOpen(false); // Close the sidebar
      setIsNewVehicleOptionsVisible(false); // Close new vehicle options
      navigation.navigate(screenName); // Navigate to the selected screen
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToFooterHome} style={styles.iconButtonHome}>
      <Image source={require('../../assets/home.png')} style={styles.iconImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToFooterContact} style={styles.iconButtonPhone}>
      <Image source={require('../../assets/phone.png')} style={styles.iconImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToFooterCompare} style={styles.iconButton}>
      <View style={styles.iconTextContainer}>
      <Image source={require('../../assets/compare.png')} style={styles.iconImage} />
      </View>
    </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('selectcity')} style={styles.iconButton}>
        <View style={styles.iconTextContainer}>
        <Image source={require('../../assets/dealer.png')} style={styles.iconImag} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigationCharging('selectcharging')} style={styles.iconButton}>
        <View style={styles.iconTextContainer}>
        <Image source={require('../../assets/charging.png')} style={styles.iconImageCharging} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(profileScreen)}  style={styles.iconButton}>
      <Image source={require('../../assets/user.png')} style={styles.iconImageUser} />
      </TouchableOpacity>
      <View>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fafaf7',
    height: 60,
    paddingHorizontal: 25,
  },
  iconImageCharging:{
    height:25,
    width:25
  },
  iconButton: {
    marginHorizontal: 12, // Adjust this value as needed
  },
  iconButtonHome: {
    marginHorizontal: 1, // Adjust this value as needed
  },
  iconButtonPhone: {
    marginHorizontal: 22, // Adjust this value as needed
  },
  iconTextContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconImag:{
    height:28,
    width:28
  },iconImageUser:{
    height:28,
    width:28
  }
});

export default Footer;
