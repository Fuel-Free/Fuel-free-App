import React from 'react';
import Home from './src/components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsByVehicleType from './src/Feature/VehicleTypes/ProductsByVehicleTypes';
import BrandProduct from './src/Feature/Brands/ProductBrands';
import AgencyDealers from './src/Feature/AgencyDealers/CityViseDealer';
import News from './src/Feature/News/NewsList';
import Offers from './src/Feature/Offers/Offers';
import Header from './src/components/Headers';
import Footer from './src/components/Footer';
import Compare from './src/Feature/compare/Compare';
import Comparedetails from './src/Feature/compare/CompareDetails';
import ChargingDealer from './src/Feature/AgencyDealers/ChargingStation';
import ProductDetails from './src/Feature/VehicleTypes/ProductDetails';
import DealerDetail from './src/Feature/AgencyDealers/DealerDetails';
import Registration from './src/Feature/auth/register';
import Login from './src/Feature/auth/login';
import Profile from './src/Feature/auth/Profile';
import TestDriveForm from './src/Feature/FormProducts/testDriveForm';
import BuyNow from './src/Feature/FormProducts/buyNow';
import EnquiryNow from './src/Feature/FormProducts/enquiryNow';
import Freeconsultation from './src/Feature/FormProducts/FreeConsultation';
import Edit from './src/Feature/auth/Edit';
import Search from './src/Feature/SearchRealeted/Search';
import Wishlist from './src/Feature/wishlist/WishList';
import Testdrivebookinglist from './src/Feature/History&Bokkings/testdrivebookinglist';
import Productbooking from './src/Feature/History&Bokkings/Bookinglist';

const Stack = createStackNavigator();
 
const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{
          header: ({ navigation }) => <Header />,
        }}  >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Products" component={ProductsByVehicleType}   />
      <Stack.Screen name="BrandProduct" component={BrandProduct}   />
      <Stack.Screen name="AgencyDealers" component={AgencyDealers}    />
      <Stack.Screen name="News" component={News}  />
      <Stack.Screen name="Offers" component={Offers} />
      <Stack.Screen name="compare" component={Compare} />
      <Stack.Screen name="comparedetail" component={Comparedetails} />
      <Stack.Screen name="chargingdealer" component={ChargingDealer} />
      <Stack.Screen name="productDetails" component={ProductDetails} />
      <Stack.Screen name="dealerdetail" component={DealerDetail} />
      <Stack.Screen name='register' component={Registration}/>
      <Stack.Screen name='login' component={Login}/>
      <Stack.Screen name='profile' component={Profile} options={{ headerShown: false }}/>
      <Stack.Screen name="buynow" component={BuyNow}  options={{ headerShown: false }} />
        <Stack.Screen name="testDriveForm" component={TestDriveForm}  options={{ headerShown: false }} />
        <Stack.Screen name="enquiryNow" component={EnquiryNow}  options={{ headerShown: false }} />
        <Stack.Screen name="freeconsultation" component={Freeconsultation} options={{ headerShown: false }} />
        <Stack.Screen name="wishlist" component={Wishlist}/>
        <Stack.Screen name="edit" component={Edit}/>
        <Stack.Screen name="productbooking" component={Productbooking}/>
        <Stack.Screen name="testdrivebookinglist" component={Testdrivebookinglist}/>
        <Stack.Screen name='search' component={Search}/>
    </Stack.Navigator>
    <Footer />
  </NavigationContainer>
  );
};

export default App;
