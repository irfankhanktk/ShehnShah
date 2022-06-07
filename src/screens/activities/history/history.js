//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation, CommonActions, useTheme} from '@react-navigation/native';
import Bold from '../../../presentation/typography/bold-text';
import Regular from '../../../presentation/typography/regular-text';
import styles from './history-styles';
import { History1 } from '../../../assets/common-icons';
import { mvs } from '../../../services/metrices';
import ActivityItem from '../../../components/atoms/activity-item';
// create a component
const History = props => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const[history,setHistoryData]=useState([
    {
      bussinessName:'Total Al Safeer Car Wash…',address:'Sharjah Al nahada road',
      image:'../../assets/images/carwash.png',subImage:'../../assets/images/carwash.png',
      details:'Lorem ipsum dolor Lorem ipsum dolor sit amet...',
      subDetails:'Lorem ipsum dolor sit amet...',progress:1,price:34.50,
      bookingTime:'12 February 2021-9:30 AM-10:00 AM',rating:4.0,isCancelled:false,isLiked:true
    },
    {
      bussinessName:'Total Al Safeer Car Wash…',address:'Sharjah Al nahada road',
      image:'../../assets/images/carwash.png',subImage:'../../assets/images/carwash.png',
      details:'Lorem ipsum dolor Lorem ipsum dolor sit amet...',
      subDetails:'Lorem ipsum dolor sit amet...',progress:1,price:84.50,
      bookingTime:'12 February 2021-9:30 AM-10:00 AM',isCancelled:false,rating:3.2,isLiked:false
    }]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
  
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(16) }}>
         
     {history.length>0?
        <FlatList  
          data={history}  
          renderItem={({item}) =>  
          <ActivityItem 
            address={item.address}
            bussinessName={item.bussinessName} 
            bookingTime={item.bookingTime} 
            details={item.details}
            status='complete'
            subDetails={item.subDetails}
            onPress={()=>alert("Complete")}
            progress={item.progress}
            isLiked={item.isLiked}
            price={item.price}
            tab={'history'}
            rating={item.rating}
            />
          }
        /> 
      :<View style={styles.body}>
               <History1/>
               <Bold label={"No History"} style={styles.welcomeText}/>
               <Regular label={"Wait for the booking. Your all bookings will show here."} numberOfLines={2} style={styles.welcomeSubText}/>
               
      </View>}
          
        </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  home_categories: store.state.home_categories,
  categories: store.state.categories,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchHomeCategories: () => DIVIY_API.fetchHomeCategories(),
  fetchSubCategories: parent_cat_id =>
    DIVIY_API.fetchSubCategories(parent_cat_id),
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
