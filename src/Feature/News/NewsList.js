import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

const NewsCard = ({  newsItem, imageSource, title, content,isloading }) => {
  const navigation = useNavigation();

  const handlePressnews = () => {
    navigation.navigate('NewsDetail', { newsId: newsItem._id });
  };
 
  return (
    <View>
    <TouchableOpacity onPress={handlePressnews}>
      <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{content}</Text>
    </View>
  
    </TouchableOpacity>
    
    </View>
  );
};

const News = () => {
  const [newsList, setNewsList] = useState([])
  const [loading,setloading]=useState(true)
  useEffect(() => {
  const fetchNewsList = async () => {
    try {
      setloading(true)
      let response = await fetch("https://app.fuelfree.in/news/all");
      let result = await response.json();
      let newsListData = result.List;
      if(newsListData){
        setloading(false)
      }
      setNewsList(newsListData);
    } catch (error) {
      setloading(false)
      console.error("Error fetching news list:", error);
    }
  };

  fetchNewsList();
}, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>News:</Text>
      {loading?(<ActivityIndicator size="large" color="#ff8c00" />):(
        <View>
      {newsList && newsList.map((newsItem) => (
        <NewsCard 
          key={newsItem._id}
          newsItem={newsItem} 
           imageSource={{uri : `https://app.fuelfree.in/${newsItem.image}`}}
           title= {newsItem.MainHeading}
           content= {newsItem.content}
           
         />
         ))}         
         </View>
       )}
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

export default News;
