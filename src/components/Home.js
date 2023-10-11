import React, {useRef, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  scrollViewRef
} from 'react-native';
import Populerbrands from '../Feature/Brands/Brands';
import Header from './Headers';


const banners = [
  {id: 1, image: require('../../assets/appbanner.jpeg')},
  {id: 2, image: require('../../assets/homebannerapp.png')},
  {id: 3, image: require('../../assets/homebannerapptwo.png')},
];

const navButtons = [
  {id: 1, image: require('../../assets/cycle.jpeg'), page: 'cycle'},
  {id: 2, image: require('../../assets/scooter.jpeg'), page: 'scooter'},
  {id: 3, image: require('../../assets/bike.jpeg'), page: 'bike'},
  {id: 4, image: require('../../assets/car.jpeg'), page: 'car'},
  {id: 5, image: require('../../assets/eauto.jpeg'), page: 'rickshaw'},
  {id: 6, image: require('../../assets/bus.jpeg'), page: 'bus'},
  {id: 7, image: require('../../assets/luna.jpeg'), page: 'luna'},
  {id: 8, image: require('../../assets/loading.jpeg'), page: 'loading'},
  {id: 9, image: require('../../assets/logistics.jpeg'), page: 'logistic'},
];

const Home = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const [numColumns, setNumColumns] = useState(3);

  const availableCities = [
    {id: 1, name: 'Indore', image: require('../../assets/indore-city.jpeg')},
    {id: 2, name: 'Bhopal', image: require('../../assets/bhopal-city.jpeg')},
    {id: 13, name: 'Surat', image: require('../../assets/surat-city.jpg')},
    {id: 14, name: 'jaipur', image: require('../../assets/jaipur-city.jpg')},
    {id: 12, name: 'Lucknow', image: require('../../assets/lucknow-city.jpg')},
    {id: 15, name: 'Ujjain', image: require('../../assets/ujjain-city.jpg')},
    {
      id: 3,
      name: 'Jabalpur',
      image: require('../../assets/jabalpur-city.jpeg'),
    },
    {id: 4, name: 'Gwalior', image: require('../../assets/gwalior-city.jpeg')},
    {id: 5, name: 'Raipur', image: require('../../assets/raipur-city.jpg')},
    {id: 8, name: 'Kota', image: require('../../assets/kota-image.jpg')},
    {id: 9, name: 'Dewas', image: require('../../assets/dewas-city.jpg')},
    {id: 10, name: 'Sehore', image: require('../../assets/sehore-city.jpg')},
    // {id: 6, name: 'Rajgarh', image: require('../../assets/rajgarh-city.jpeg')},
    // {id: 7, name: 'Vidisha', image: require('../../assets/vidisha-city.jpeg')},
  ];

   

  // const navigation=useNavigation()
  const handleCitySelect = city => {
    onSelectCity(city);
    navigation.navigate('agencydealers', {city: city});
    onClose();
  };

  const [search, setSearch] = useState('');

  const gotosearchDeatails = value => {
    navigation.navigate('search', {search: value});
    setSearch('');
  };
 

  const goTobrand = () => {
    navigation.navigate('populerbrands');
  };

  const goToNewsList = () => {
    navigation.navigate('News');
  };

  const goToOfferList = () => {
    navigation.navigate('Offers');
  };

  const gotoDealer = name => {
    navigation.navigate('AgencyDealers', {city: name});
  };
  // =============================btn-navigator===============================

  const navigation = useNavigation();

  const onPressHandler = page => {
    navigation.navigate( 'Products',{VehicleType:page});
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (flatListRef.current) {
        setCurrentIndex((currentIndex + 1) % banners.length);
        flatListRef.current.scrollToIndex({
          index: (currentIndex + 1) % banners.length,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  

  return (
    <>
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={search}
            returnKeyType="search"
            onSubmitEditing={() => gotosearchDeatails(search)}
            onChangeText={text => setSearch(text)}
          />
          <TouchableOpacity
            style={styles.microPhone}
            onPress={() => gotosearchDeatails(search)}>
          </TouchableOpacity>
        </View>
        <View style={styles.containers} >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const xOffset = event.nativeEvent.contentOffset.x;
          const selectedIndex = Math.round(xOffset / styles.bannerImage.width);
          // Do something with selectedIndex if needed
        }}
      >
        {banners.map((item) => (
          <Image
            key={item.id}
            source={item.image}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
      <View style={styles.categoriesHeadingContainer}>
  <Text style={styles.categoriesHeading}>Categories:</Text>
</View>
  <View style={styles.navButtonsContainer}>
  <View style={styles.buttonGroup}>
    {navButtons.slice(0, 3).map(item => (
      <TouchableOpacity
        key={item.id}
        style={styles.navButton}
        onPress={() => onPressHandler(item.page)}
      >
        <Image
          source={item.image}
          style={styles.navButtonImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    ))}
  </View>
  <View style={styles.buttonGroup}>
    {navButtons.slice(3, 6).map(item => (
      <TouchableOpacity
        key={item.id}
        style={styles.navButton}
        onPress={() => onPressHandler(item.page)}
      >
        <Image
          source={item.image}
          style={styles.navButtonImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    ))}
  </View>
  <View style={styles.buttonGroup}>
    {navButtons.slice(6, 9).map(item => (
      <TouchableOpacity
        key={item.id}
        style={styles.navButton}
        onPress={() => onPressHandler(item.page)}
      >
        <Image
          source={item.image}
          style={styles.navButtonImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    ))}
  </View>
</View>
        <Populerbrands/>
        <View style={styles.availableCitiesContainer}>
          <Text style={styles.availableCitiesHeading}>
            We Are Available In:
          </Text>
        </View>

        <View style={styles.cityCardContainer}>
          {availableCities.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.cityCard}
              onPress={() => gotoDealer(item.name)}>
              <View style={styles.cityImageWrapper}>
                <Image
                  source={item.image}
                  style={styles.cityImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.cityName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.cardText}>Explore Latest News :</Text>
        <TouchableOpacity style={styles.cardContainer} onPress={goToNewsList}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/newsbanner.png')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.cardText}>Explore Latest Offers :</Text>
        <TouchableOpacity style={styles.cardContainer} onPress={goToOfferList}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/ofrbnr.png')}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginVertical: 16,
  },
  containers: {
    flex: 1,
    padding: 2 ,
    marginVertical: 11,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(173, 216, 230, 0.3)',
    borderColor: 'darkgray',
    borderRadius: 50,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 16,
  },

  seeMoreButtonContainer: {
    bottom: 20,
    width: '92%',
    left: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cityImageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(173, 216, 230, 0.3)',
    elevation: 4,
    filter: 'brightness(0.7) contrast(1.2) saturate(1.5)',
  },
  categoriesHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
    top: 10,
    left: 5,
  },
  btnMore: {
    borderRadius: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(173, 216, 230, 0.3)',
    borderColor: 'darkgray',
    borderRadius: 50,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
    marginLeft: 10,
    paddingLeft: 20,
  },

  input: {
    flex: 1,
    padding: 8,
  },
  microPhone: {
    right: 10,
  },
  bannerImage: {
    width: 325, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    borderRadius: 10,
    flex: 1, 
    // resizeMode:'center'
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  navButtonImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  brandContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  brandItem: {
    width: '30%',
    marginBottom: 16,
    marginRight: 8,
  },
  brandImageContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  brandLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  availableCitiesContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  availableCitiesHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginBottom: 30,
  },
  cityCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  cityCard: {
    width: '23%',
    marginBottom: 8,
    marginRight: 8,
    overflow: 'hidden',
  },
  cityImage: {
    width: '100%',
    height: 70,
    borderRadius: 10,
  },
  cityName: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 10,
    color: '#26386e',
    fontWeight: 'bold',
  },
  cardContainer: {
    // backgroundColor: 'rgba(173, 216, 230, 0.3)',
    borderRadius: 8,
    padding: 8,
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 8,
  },
  image: {
    width: '107%',
    height: 150,
    // borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 10,
    // marginBottom: 30,
    marginLeft: 10,
  },

 navButtonsContainer: {
  flexDirection: 'row', // Display buttons vertically
  flexWrap: 'wrap',       // Wrap buttons to the next column
  justifyContent: 'space-between', // Align buttons to the start of each column
  marginBottom: 16,
},

});

export default Home;
