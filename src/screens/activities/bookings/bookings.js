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
import {useNavigation, useTheme} from '@react-navigation/native';
import Bold from '../../../presentation/typography/bold-text';
import styles from './booking-styles';
import {mvs} from '../../../services/metrices';
import {Booking} from '../../../assets/common-icons';
import Regular from '../../../presentation/typography/regular-text';
import ActivityItem from '../../../components/atoms/activity-item';
import allColors from '../../../services/colors';
import Medium from '../../../presentation/typography/medium-text';
import DIVIY_API from '../../../store/api-calls';
import { getData } from '../../../localStorage';
// createa component
const Bookings = props => {
  const{get_bookings}=props;
  const navigation = useNavigation();
 
  const [schedule, setScheduleData] = useState([
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      details: 'Lorem ipsum dolor Lorem ipsum dolor sit amet...',
      subDetails: 'Lorem ipsum dolor sit amet...',
      progress: 0.5,
      price: 34.5,
      bookingTime: '12 February 2021-9:30 AM-10:00 AM',
      rating: 0,
      isCancelled: false,
      isLiked: false,
    },
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      details: 'Lorem ipsum dolor Lorem ipsum dolor sit amet...',
      subDetails: 'Lorem ipsum dolor sit amet...',
      progress: 0.3,
      price: 84.5,
      bookingTime: '12 February 2021-9:30 AM-10:00 AM',
      isCancelled: false,
      rating: 0,
      isLiked: false,
    },
  ]);
  const [completed, setCompletedData] = useState([
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      details: 'Lorem ipsum dolor Lorem ipsum dolor sit amet...',
      subDetails: 'Lorem ipsum dolor sit amet...',
      progress: 1,
      price: 34.5,
      bookingTime: '12 February 2021-9:30 AM-10:00 AM',
      rating: 0,
      isCancelled: false,
      isLiked: true,
    },
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      details: 'Lorem ipsum dolor Lorem ipsum dolor sit amet...',
      subDetails: 'Lorem ipsum dolor sit amet...',
      progress: 1,
      price: 84.5,
      bookingTime: '12 February 2021-9:30 AM-10:00 AM',
      isCancelled: false,
      rating: 0,
      isLiked: false,
    },
  ]);
  const [cancelled, setCancelledData] = useState([
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      details: 'Lorem ipsum dolor Lorem ipsum dolor sit amet...',
      subDetails: 'Lorem ipsum dolor sit amet...',
      progress: 1,
      price: 34.5,
      bookingTime: '12 February 2021-9:30 AM-10:00 AM',
      rating: 0,
      isCancelled: true,
      isLiked: false,
    },
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      details: 'Lorem ipsum dolor Lorem ipsum dolor sit amet...',
      subDetails: 'Lorem ipsum dolor sit amet...',
      progress: 1,
      price: 84.5,
      bookingTime: '12 February 2021-9:30 AM-10:00 AM',
      isCancelled: true,
      rating: 0,
      isLiked: false,
    },
  ]);
  useEffect(()=>{
     getBookings();
  },[])
 
  const getBookings=async()=>{
    const customerId=await getData("customer_id");
    console.log(customerId)
    const response=await get_bookings(1)
    var booked=[];
    var draft=[];
    var complet=[];
    for(var i=0;i<response?.data.length;i++){
       if(response?.data[i]?.status=="Draft"){
        draft.push(response?.data[i])
       }else if(response?.data[i]?.status=="Booked"){
        booked.push(response?.data[i])
       }else{
        complet.push(response?.data[i])
       }
    }
    console.log("Length of  Draft  ",draft.length)
    console.log("complet of  Draft  ",complet.length)
    console.log("booked of  Draft  ",booked.length)
    setCancelledData(draft)
    setCompletedData(complet)
    setScheduleData(booked)
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: mvs(9),
          backgroundColor: allColors.tabBackground,
        }}>
        {schedule.length > 0 || completed.length > 0 || cancelled.length > 0 ? (
          <View
            style={{
              flex: 1,
              paddingTop: mvs(10),
              backgroundColor: allColors.tabBackground,
            }}>
            {schedule.length > 0 ? (
              <>
                <Medium
                  label={'Scheduled'}
                  style={{...styles.title, marginTop: 0}}
                />
                <FlatList
                  data={schedule}
                  renderItem={({item}) => (
                    <ActivityItem
                      address={item?.business?.street+","+item?.business?.area+","+item?.business?.city}
                      bussinessName={item?.business?.title}
                      bookingTime={item?.slot?.date+" "+item?.slot?.from[0]+":"+item?.slot?.from[1]+"-"+item?.slot?.to[0]+":"+item?.slot?.to[1]}
                      details={item?.offering?.title}
                      status="schedule"
                      subDetails={item?.offering?.subTitle}
                      onPress={() => alert('Schedule')}
                      progress={0.3}
                      isLiked={false}
                      price={item?.offering?.price}
                    />
                  )}
                />
              </>
            ) : null}
            {completed.length > 0 ? (
              <>
                <Medium label={'Completed'} style={styles.title} />
                <FlatList
                  data={completed}
                  renderItem={({item}) => (
                    <ActivityItem
                    address={item?.business?.street+","+item?.business?.area+","+item?.business?.city}
                    bussinessName={item?.business?.title}
                    bookingTime={item?.slot?.date+" "+item?.slot?.from[0]+":"+item?.slot?.from[1]+"-"+item?.slot?.to[0]+":"+item?.slot?.to[1]}
                    details={item?.offering?.title}
                    status="complete"
                    subDetails={item?.offering?.subTitle}
                    onPress={() => alert('Complete')}
                    progress={0.3}
                    isLiked={false}
                    price={item?.offering?.price}
                    />
                  )}
                />
              </>
            ) : null}
            {cancelled.length > 0 ? (
              <>
                <Medium
                  label={'Cancelled'}
                  style={{...styles.title, color: allColors.red}}
                />
                <FlatList
                  data={cancelled}
                  renderItem={({item}) => (
                    <ActivityItem
                    address={item?.business?.street+","+item?.business?.area+","+item?.business?.city}
                    bussinessName={item?.business?.title}
                    bookingTime={item?.slot?.date+" "+item?.slot?.from[0]+":"+item?.slot?.from[1]+"-"+item?.slot?.to[0]+":"+item?.slot?.to[1]}
                    details={item?.offering?.title}
                    status="cancel"
                    subDetails={item?.offering?.subTitle}
                    onPress={() => alert('cancel')}
                    progress={0.3}
                    isLiked={true}
                    price={item?.offering?.price}
                    />
                  )}
                />
              </>
            ) : null}
          </View>
        ) : (
          <View style={styles.body}>
            <Booking />
            <Bold label={'No Bookings'} style={styles.welcomeText} />
            <Regular
              label={'Wait for the booking. Your all bookings will show here.'}
              numberOfLines={2}
              style={styles.welcomeSubText}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = store => ({
  // user_info: store.state.user_info,
 });
 const mapDispatchToProps = {
   get_bookings:(id)=>DIVIY_API.get_customer_bookings(id)
 };
 export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
