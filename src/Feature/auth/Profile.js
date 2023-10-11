import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const gotowishlist = () => {
    navigation.navigate('wishlist');
  };
  const gotoEditprofile = () => {
    navigation.navigate('edit');
  };

  const goToTestDriveList = () => {
    navigation.navigate('testdrivebookinglist');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      AsyncStorage.clear();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  const [user, setuser] = useState('');
  const [uid, setUid] = useState('');
  const retrieveUserData = async () => {
    try {
      setIsRefreshing(true);
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString !== null) {
        const userData = JSON.parse(userDataString);
        setIsRefreshing(false);
        let userdetails = userData?.user_details;
        let userid = userdetails?._id;
        setuser(userData?.user_details);
        setUid(userid, 'userid');
      } else {
        setIsRefreshing(false);
        console.log('No user data found');
      }
    } catch (error) {
      setIsRefreshing(false);
      console.error('Error retrieving user data:', error);
    }
  };

  const goToProductBooking = () => {
    navigation.navigate('productbooking', {userId: uid});
  };

  const checkUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
      } else {
        navigation.navigate('login');
      }
    } catch (error) {
      console.error('Error checking user data:', error);
    }
  };

  useEffect(() => {
    retrieveUserData();
    checkUserData();
  }, []);

  return (
    <View style={styles.container}  >
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={retrieveUserData}
              colors={['#007AFF']} // Customize the loading indicator color
            />
          }>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              {/* <Ionicons name="arrow-back-outline" size={24} color="black" /> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={gotoEditprofile}
              style={styles.editButton}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfoContainer}>
            <View style={styles.initialLetterCircle}>
              <Text style={styles.initialLetter}>
                {user?.userName?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.userName}>{user?.userName}</Text>

            <Text style={styles.mobileNumber}>{user?.phoneNo}</Text>

            <View style={styles.walletBalanceContainer}>
              <View style={styles.walletBalanceIcon}>
                {/* <Ionicons name="wallet-outline" size={32} color="#26386e" /> */}
              </View>
              <View style={styles.walletBalanceTextContainer}>
                {/* <Text style={styles.walletBalanceText}>Wallet Balance</Text> */}
                <Text style={styles.walletAmount}>
                  Rs {user?.walletBalance}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.profilecontain}>
        <View style={styles.ordersContainer}>
          <View style={styles.orderIconContainer}>
            {/* <Ionicons name="cart-outline" size={24} color="black" /> */}
          </View>
          <Text style={styles.orderText} onPress={goToProductBooking}>
            My Orders
          </Text>
          <TouchableOpacity
            style={styles.rightArrow}
            onPress={goToProductBooking}>
            {/* <Ionicons name="chevron-forward" size={24} color="black" /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.shortlistedContainer}>
          <TouchableOpacity style={styles.favoriteIconContainer}>
            {/* <Ionicons name="heart-outline" size={24} color="black" /> */}
          </TouchableOpacity>
          <Text style={styles.shortlistedText} onPress={gotowishlist}>
            Shortlisted Vehicles
          </Text>
          <TouchableOpacity onPress={gotowishlist} style={styles.rightArrow}>
            {/* <Ionicons name="chevron-forward" size={24} color="black" /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.testDriveContainer}>
          <View style={styles.testDriveIconContainer}>
            {/* <Ionicons name="car-outline" size={24} color="black"/> */}
          </View>
          <Text style={styles.testDriveText} onPress={goToTestDriveList}>
            Booked Testdrives
          </Text>
          <TouchableOpacity
            style={styles.rightArrow}
            onPress={goToTestDriveList}>
            {/* <Ionicons name="chevron-forward" size={24} color="black" /> */}
          </TouchableOpacity>
        </View>
        {/* <View style={styles.notificationsContainer}>
          <View style={styles.notificationIconContainer}>
            <Ionicons name="notifications-outline" size={24} color="black"/>
          </View>
          <Text style={styles.notificationText}>Notifications</Text>
          <TouchableOpacity style={styles.rightArrow}>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
        </View> */}
        <View style={styles.profileSettingsContainer}>
          <View style={styles.profileSettingsIconContainer}>
            {/* <Ionicons name="settings-outline" size={24} color="black" /> */}
          </View>
          <Text style={styles.profileSettingsText} onPress={gotoEditprofile}>
            Profile Settings
          </Text>
          <TouchableOpacity style={styles.rightArrow} onPress={gotoEditprofile}>
            {/* <Ionicons name="chevron-forward" size={24} color="black" /> */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  profilecontain: {
    flex: 1,
    padding: 5,
    marginTop: 10,
  },
  walletBalanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  walletBalanceIcon: {
    marginRight: 8,
    fontWeight: 'bold',
  },
  walletBalanceTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletBalanceText: {
    fontSize: 10,
    color: '#26386e',
    marginRight: 5,
  },
  walletAmount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#26386e',
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  editButton: {
    padding: 8,
    borderColor: 'black',
    borderRadius: 8,
    textAlign:"right",
    marginLeft:240
  },
  profileInfoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  initialLetterCircle: {
    backgroundColor: '#26386e',
    width: 60,
    height: 60,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  initialLetter: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    marginTop: 10, // Add margin at the top
    marginBottom: 4,
  },
  mobileNumber: {
    fontSize: 14,
  },
  ordersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIconContainer: {
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 8,
  },
  orderText: {
    marginLeft: 10,
    fontSize: 18,
  },
  rightArrow: {
    marginLeft: 'auto',
  },
  shortlistedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  favoriteIconContainer: {
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 8,
  },
  shortlistedText: {
    marginLeft: 10,
    fontSize: 18,
  },
  notificationsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  notificationIconContainer: {
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 8,
  },
  notificationText: {
    marginLeft: 10,
    fontSize: 18,
  },
  profileSettingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileSettingsIconContainer: {
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 8,
  },
  profileSettingsText: {
    marginLeft: 10,
    fontSize: 18,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 14,
    // backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center', // Center text horizontally
  },
  logoutButtonText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  testDriveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  testDriveIconContainer: {
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 8,
  },
  testDriveText: {
    marginLeft: 10,
    fontSize: 18,
  },
   
});

export default Profile;
