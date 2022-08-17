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
import {useNavigation} from '@react-navigation/native';
import Bold from '../../../presentation/typography/bold-text';
import Regular from '../../../presentation/typography/regular-text';
import styles from './history-styles';
import {History1} from '../../../assets/common-icons';
import {mvs} from '../../../services/metrices';
import ActivityItem from '../../../components/atoms/activity-item';
import DIVIY_API from '../../../store/api-calls';
import { getData } from '../../../localStorage';
import ReviewModal from '../../../components/molecules/modals/review-modal'
// create a component
const History = props => {
  const{get_bookings,update_review_rating,rate_booking,update_review_remarks,upload_review_picture}=props;
  const[reviewModal,setReviewModal]=useState(false)
  const[bookingId,setBookingId]=useState(0)
  const[remarks,setRemarks]=useState(' ')
  const[ratingValue,setRatingValue]=useState(0)
  const navigation = useNavigation();
  const [history, setHistoryData] = useState([
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
      rating: 4.0,
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
      rating: 3.2,
      isLiked: false,
    },
  ]);
  useEffect(()=>{
    getBookings();
 },[])
 const submitReview=async()=>{
  const customerId=await getData("customer_id");
  const response=await rate_booking(customerId,bookingId)
  console.log("Review Response ",response?.data)
  if(response?.data){
    const reviewRateReponse=await update_review_rating(customerId,response?.data,ratingValue)
    console.log("Review Rate Response ",reviewRateReponse?.data)
    const reviewRemarksReponse=await update_review_remarks(customerId,response?.data,{"remark": remarks})
    console.log("Review Remarks Response ",reviewRemarksReponse?.data)
  }
 }
 const getBookings=async()=>{
  const customerId=await getData("customer_id");
  console.log(customerId)
  const response=await get_bookings(1)
  setHistoryData(response?.data)
}
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: mvs(16)}}>
        {history.length > 0 ? (
          <FlatList
            data={history}
            renderItem={({item}) => (
              <ActivityItem
                address={item?.business?.street+","+item?.business?.area+","+item?.business?.city}
                bussinessName={item?.business?.title}
                bookingTime={item?.slot?.date+" "+item?.slot?.from[0]+":"+item?.slot?.from[1]+"-"+item?.slot?.to[0]+":"+item?.slot?.to[1]}
                details={item?.offering?.title}
                status="complete"
                subDetails={item?.offering?.subTitle}
                onPress={() => {setReviewModal(true);setBookingId(item?.id)}}
                progress={0.3}
                isLiked={false}
                price={item?.offering?.price}
                tab={'history'}
                rating={4.0}
              />
            )}
          />
        ) : (
          <View style={styles.body}>
            <History1 />
            <Bold label={'No History'} style={styles.welcomeText} />
            <Regular
              label={'Wait for the booking. Your all bookings will show here.'}
              numberOfLines={2}
              style={styles.welcomeSubText}
            />
          </View>
        )}
      </ScrollView>
      <ReviewModal visible={reviewModal}
       setRating={(rate)=>{
        setRatingValue(rate)
       }}
       setItems={(items)=>{
        console.log("Pictures selected......\n")
        console.log(items)
       }}
       onTextChange={(val)=>setRemarks(val)}
       setVisible={(val)=>{
        setReviewModal(false)
        submitReview();
      }}/>
    </SafeAreaView>
  );
};
const mapStateToProps = store => ({
  // user_info: store.state.user_info,
 });
 const mapDispatchToProps = {
   get_bookings:(id)=>DIVIY_API.get_customer_bookings_history(id),
   rate_booking:(cid,bid)=>DIVIY_API.rate_booking(cid,bid),
   update_review_rating:(cid,rid,rate)=>DIVIY_API.update_review_rating(cid,rid,rate),
   update_review_remarks:(cid,rid,remarks)=>DIVIY_API.update_review_remarks(cid,rid,remarks),
   upload_review_picture:(cid,rid,payload)=>DIVIY_API.upload_review_picture(cid,rid,payload),
 };
 export default connect(mapStateToProps, mapDispatchToProps)(History);
