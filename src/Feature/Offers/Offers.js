import { StyleSheet, Text, View, Image , ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

const OfferCard = ({ imageSource, title, description }) => {
  const navigation = useNavigation();

 
  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const Offers = () => {
  const [offerList, setOfferList] = useState([])

  useEffect(() => {
     const fetchOfferList = async () => {
        try{
           let response = await fetch(`https://app.fuelfree.in/admin/offerList`)
           let result = await response.json()
           let offerListData = result.offers
           setOfferList(offerListData)
        } catch(error) {
          console.error("Error fetching offer list:", error);
        }
     };
     fetchOfferList()
  })
  return (
    <ScrollView style={styles.container} >
      <Text style={styles.header}>Offers:</Text>
      {offerList && offerList.map((offerItem) => (
      <OfferCard
       key={offerItem._id}
        imageSource={{ uri : `https://app.fuelfree.in/${offerItem.offerImage}`}}
        title={offerItem.offerHeading}
        description={offerItem.offerText}
      />
       ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
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

export default Offers;
