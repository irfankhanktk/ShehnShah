import React, {useEffect, useState} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Bg} from '../../assets/images';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Row from '../../components/atoms/row';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import HeadingTitle from '../../components/molecules/heading-title';
import Bold from '../../presentation/typography/bold-text';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import {Styles as styles} from './styles';
import ServiceOffering from '../../components/service-offering/index';
import CouponPromo from '../../components/coupon-promo/index';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
import {getData} from '../../localStorage';
import {BaseURL} from '../../ApiServices';

import {
  CarWash,
  Map,
  Ratings,
  RightArrow,
  Total,
} from '../../assets/common-icons';
import Buttons from '../../components/atoms/Button';
import ServiceCard from '../../components/molecules/service-card';
import RatingStar from '../../components/molecules/rating-star';
import TotalRateMap from './../../components/molecules/total-rate-map/index';
import ReviewsRaing from '../../components/molecules/reviews-rating';
import ScheduleModal from './../../components/molecules/modals/schedule-modal';
import moment from 'moment';

import Toast from 'react-native-toast-message';
import {addBookingID, addOfferingID} from '../../Redux/Reducers';
import {useNavigation} from '@react-navigation/native';
const about =
  'Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years.Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years  continuing the outstanding level of service Triad area residents expect from our';
const services = [
  {icon: 'Services', title: '2.5K Reviews', value: '5 Services'},
  {icon: 'Schedule', title: 'Book Service', value: 'Availability'},
  {icon: 'Discount', title: 'Discounts', value: 'View Promos'},
];
const ServiceOfferingDetails = props => {
  const {route} = props;
  const navigation = useNavigation();
  const {id} = route.params;
  const dispatch = useDispatch();
  const state = useSelector(state => state.businessReviews);
  const bookingState = useSelector(state => state.common);

  //console.log('satte=====', bookingState.serviceBooking.bookingID);

  const [isMoreBtn, setIsMoreBtn] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef(null);
  const [payload, setpayload] = useState({
    bookNowStart: false,
  });

  const [serviceDetails, setserviceDetails] = useState([]);
  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      position: 'top',
      autoHide: true,
      visibilityTime: 3000,
    });
  };
  const delayAPI = (responseID, businessID) => {
    setTimeout(() => {
      navigation.navigate('WalkIn', {
        bookingID: responseID,
        businessID: businessID,
      });
    }, 4000);
  };
  const BookNow = async () => {
    const customerID = await getData('customer_id');
    const token = await getData('token');

    //console.log('Booking=======', token, customerID, id);
    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: customerID,
        offeringId: id,
        byCustomer: 0,
      }),
      redirect: 'follow',
    };

    setpayload({...payload, bookNowStart: true});
    await fetch(`${BaseURL}p/public/bookings`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setpayload({...payload, bookNowStart: false});
          showToast('success', 'Booking confirmed');
          dispatch(addBookingID(result));
          dispatch(addOfferingID(id));
          delayAPI(result, id);
          console.log('booking Confirmed=====', result);
        }
      })
      .catch(error => {
        setpayload({...payload, bookNowStart: false});
        console.log('error', error);
      });
  };

  const getServiceDetails = async () => {
    const token = await getData('token');
    if (token != null) {
      var requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },

        redirect: 'follow',
      };
    }

    await fetch(`${BaseURL}p/public/offerings/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setserviceDetails(result);
          setLoading(true);
        }
        console.log('service details========', serviceDetails);
      })
      .catch(error => {
        setLoading(true);
        console.log('error', error);
      });
  };

  useEffect(() => {
    // getToken();
    getServiceDetails();
  }, [loading]);
  return (
    <View style={styles.conntainer}>
      <CustomHeader
        allowBackBtn
        title={'Service Offering Details'}
        colors={colors}
      />
      <View style={styles.body}>
        <ScrollView
          // onScroll={e => {
          //   console.log('this scrol Value', e?.nativeEvent?.contentOffset?.y);
          // }}
          contentContainerStyle={{flexGrow: 1}}>
          <View />
          <Row style={{paddingHorizontal: mvs(18)}}>
            <ShimmerPlaceholder
              style={{width: mvs(110), height: mvs(110)}}
              visible={loading}>
              <ImagePlaceholder
                borderRadius={mvs(8)}
                uri={serviceDetails?.cover}
                containerStyle={{width: mvs(110), height: mvs(110)}}
              />
            </ShimmerPlaceholder>

            <View style={{marginLeft: mvs(10), flex: 1}}>
              <ShimmerPlaceholder
                style={
                  {
                    // marginLeft: mvs(10),
                    // alignSelf: 'center',
                    // width: mvs(300),
                    // height: mvs(100),
                  }
                }
                visible={loading}>
                <Bold
                  numberOfLines={2}
                  size={mvs(16)}
                  label={serviceDetails?.title}
                />
              </ShimmerPlaceholder>
              <ShimmerPlaceholder
                style={
                  {
                    // marginLeft: mvs(10),
                    // alignSelf: 'center',
                    // width: mvs(300),
                    // height: mvs(100),
                  }
                }
                visible={loading}>
                <Row justifyContent="flex-start" alignItems="center">
                  <Regular color={colors.B606060} label={'Lead Time:'} />
                  <Medium
                    color={colors.G3CB971}
                    label={` ${serviceDetails?.processTime} Minutes`}
                  />
                </Row>
              </ShimmerPlaceholder>
              <ShimmerPlaceholder
                style={
                  {
                    // marginLeft: mvs(10),
                    // alignSelf: 'center',
                    // width: mvs(300),
                    // height: mvs(100),
                  }
                }
                visible={loading}>
                <Row
                  style={{marginTop: mvs(2)}}
                  justifyContent="flex-start"
                  alignItems="center">
                  <Regular color={colors.B606060} label={'Price:'} />
                  <Medium
                    color={colors.primary}
                    label={`AED ${serviceDetails?.price}`}
                  />
                </Row>
              </ShimmerPlaceholder>
              <ShimmerPlaceholder
                style={
                  {
                    // marginLeft: mvs(10),
                    // alignSelf: 'center',
                    // width: mvs(300),
                    // height: mvs(100),
                  }
                }
                visible={loading}>
                <Row style={{}} alignItems="center">
                  <Regular
                    size={mvs(14)}
                    color={colors.B606060}
                    label={'Tag: '}
                  />
                  <Buttons.ButtonPrimary
                    title="4Litters"
                    textStyle={{fontSize: mvs(10), color: colors.G3CB971}}
                    style={{
                      backgroundColor: `${colors.G3CB971}70`,
                      width: mvs(60),
                      height: mvs(18),
                      borderRadius: mvs(5),
                    }}
                  />
                  <Buttons.ButtonPrimary
                    title="4Litters"
                    textStyle={{fontSize: mvs(10), color: colors.primary}}
                    style={{
                      backgroundColor: `${colors.primary}70`,
                      width: mvs(60),
                      height: mvs(18),
                      borderRadius: mvs(5),
                    }}
                  />
                  <Buttons.ButtonPrimary
                    title="4Litters"
                    textStyle={{fontSize: mvs(10), color: colors.B2181F2}}
                    style={{
                      backgroundColor: `${colors.B2181F2}70`,
                      width: mvs(60),
                      height: mvs(18),
                      borderRadius: mvs(5),
                    }}
                  />
                </Row>
              </ShimmerPlaceholder>
            </View>
          </Row>
          <TotalRateMap loading={loading} data={state} />
          <Row style={{marginTop: mvs(17)}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: mvs(18)}}>
              {services.map((item, index) => (
                <ServiceCard
                  onPress={() => {
                    let y = 160;
                    if (index === 1) {
                      y = 160;
                    } else if (index === 2) {
                      y = 200;
                    } else if (index === 3) {
                      y = 512;
                    }
                    ref?.current?.scrollTo({x: 0, y: y, animated: true});
                  }}
                  middleText={
                    index === 0
                      ? `${JSON.parse(state?.businessReviews?.rating)[7]}`
                      : null
                  }
                  value={index === 0 ? null : item.value}
                  title={item.title}
                  icon={item.icon}
                  div={services.length - 1 !== index}
                />
              ))}
            </ScrollView>
          </Row>
          <HeadingTitle title="About" />
          <View style={{paddingHorizontal: mvs(18)}}>
            <ShimmerPlaceholder
              style={{width: '90%', height: mvs(100)}}
              visible={loading}>
              <Regular
                numberOfLines={null}
                label={
                  serviceDetails?.about?.length > 185 && isMoreBtn
                    ? `${serviceDetails?.about?.slice(0, 183)} ...`
                    : serviceDetails?.about
                }
                size={mvs(16)}
                color={colors.B1E1E1E}
              />
              {isMoreBtn && serviceDetails?.about?.length > 185 && (
                <TouchableOpacity onPress={() => setIsMoreBtn(false)}>
                  <Regular color={colors.primary} label={'Read More'} />
                </TouchableOpacity>
              )}
            </ShimmerPlaceholder>
          </View>
          <HeadingTitle title="Rating & Reviews" />
          <View style={{paddingHorizontal: mvs(18)}}>
            <Row justifyContent={'space-between'}>
              <ShimmerPlaceholder
                style={{width: mvs(100), height: mvs(50)}}
                visible={loading}>
                <Bold
                  color={colors.black}
                  style={{transform: [{translateY: -mvs(10)}]}}
                  size={mvs(42)}
                  label={`${JSON.parse(state?.businessReviews?.rating)[7]}`}
                />
              </ShimmerPlaceholder>
              <Ratings width={mvs(230)} />
            </Row>
            <Row>
              <Bold color={colors.black} size={mvs(12)} label={'out of 5'} />
              <Bold
                color={colors.black}
                size={mvs(12)}
                label={'9,555 ratings'}
              />
            </Row>
          </View>
          <ReviewsRaing bg={colors.GD8D8D8} />
          <View
            style={{
              backgroundColor: colors.FBF8F8,
              flexGrow: 1,
              paddingBottom: mvs(30),
            }}>
            <CouponPromo {...props} loading={loading} />
            {/* <Row style={{ paddingHorizontal: mvs(18), marginTop: mvs(20),marginBottom:mvs(10) }}>
                            <Bold label={'People also search for'} size={mvs(20)} color={colors.black} />
                            <TouchableOpacity>
                                <Regular label={'See All'} size={mvs(16)} color={colors.primary} />
                            </TouchableOpacity>
                        </Row>
                        <ServiceOffering /> */}
          </View>
          <View style={{paddingHorizontal: mvs(18)}}>
            <Buttons.ButtonPrimary
              onClick={() => navigation.navigate('WalkIn')}
              // onClick={
              //   bookingState?.serviceBooking?.bookingID > 0
              //     ? navigation.navigate('WalkIn', {
              //         bookingID: bookingState?.serviceBooking?.bookingID,
              //         businessID: bookingState?.serviceBooking?.offeringID,
              //       })
              //     : BookNow
              // }
              disabled={payload.bookNowStart}
              loading={payload.bookNowStart}
              // onClick={() => props?.navigation?.navigate('WalkIn')}
              title={
                bookingState?.serviceBooking?.bookingID > 0
                  ? 'Resume User'
                  : 'Book Now'
              }
            />
          </View>
        </ScrollView>
      </View>
      <Toast />
    </View>
  );
};

export default ServiceOfferingDetails;
