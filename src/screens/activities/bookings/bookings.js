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
import styles from './booking-styles';
import {mvs} from '../../../services/metrices';
import {Booking} from '../../../assets/common-icons';
import Regular from '../../../presentation/typography/regular-text';
import ActivityItem from '../../../components/atoms/activity-item';
import allColors from '../../../services/colors';
import Medium from '../../../presentation/typography/medium-text';
import ReviewModal from '../../../components/molecules/modals/review-modal';
// createa component
const Bookings = props => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [images, setImages] = React.useState([]);
  const [visible, setVisible] = React.useState(true);
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
                      address={item.address}
                      bussinessName={item.bussinessName}
                      bookingTime={item.bookingTime}
                      details={item.details}
                      status="schedule"
                      subDetails={item.subDetails}
                      onPress={() => alert('Schedule')}
                      progress={item.progress}
                      isLiked={item.isLiked}
                      price={item.price}
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
                      address={item.address}
                      bussinessName={item.bussinessName}
                      bookingTime={item.bookingTime}
                      details={item.details}
                      status="complete"
                      subDetails={item.subDetails}
                      onPress={() => alert('Complete')}
                      progress={item.progress}
                      isLiked={item.isLiked}
                      price={item.price}
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
                      address={item.address}
                      bussinessName={item.bussinessName}
                      bookingTime={item.bookingTime}
                      details={item.details}
                      status="cancel"
                      subDetails={item.subDetails}
                      onPress={() => alert('cancel')}
                      progress={item.progress}
                      isLiked={item.isLiked}
                      price={item.price}
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

export default Bookings;
