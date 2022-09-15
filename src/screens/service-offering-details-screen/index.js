import React, {useEffect, useState} from 'react';
import {ScrollView, View, TouchableOpacity, FlatList} from 'react-native';
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
  Percent,
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
import LabelValue from '../../components/molecules/label-value-row';
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
    setpayload({...payload, bookNowStart: true});
    const customerID = await getData('customer_id');
    const token = await getData('token');

   // console.log('Booking=======', token, customerID, route.params.id);
    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: 1,
        offeringId: id,
        byCustomer: 0,
      }),
      redirect: 'follow',
    };

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
          console.log('service details========', serviceDetails);
          console.log(serviceDetails?.otherConditions)
        }
       
      })
      .catch(error => {
        setLoading(true);
        console.log('error', error);
      });
  };

  useEffect(() => {
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
                uri={{uri:serviceDetails?.cover}}
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
                    label={`${serviceDetails?.leadTime} Minutes`}
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
                  <FlatList
                    contentContainerStyle={{flex:1}}
                    data={serviceDetails?.options}
                    horizontal={true}
                    renderItem={({ item,index }) => (
                     <Buttons.ButtonPrimary
                      title={item}
                      key={index}
                      textStyle={{fontSize: mvs(10), color: colors.G3CB971}}
                      style={{
                       backgroundColor: `${colors.G3CB971}70`,
                       width: mvs(60),
                       height: mvs(20),
                       marginLeft:mvs(7),
                       borderRadius: mvs(5),
                     }}
                   />
                    )}
                   />
                </Row>
                  {serviceDetails?.discount?.highlight && ( 
                  <Row justifyContent="flex-start" style={{marginTop:mvs(6)}}>
                    <Percent />
                    <Regular
                      size={mvs(12)}
                      color={colors.B2E3036}
                      label={' '+serviceDetails?.discount?.highlight}
                    />
                  </Row>)}
                  {serviceDetails?.discount?.view?.statusLine?.shortLine && (
                        <Regular label={serviceDetails?.discount?.view?.statusLine?.shortLine}
                         color={colors.black} numberOfLines={2}
                         size={12}
                         style={{marginTop:mvs(20),zIndex:1}}/>
                  )}
              </ShimmerPlaceholder>
            </View>
          </Row>
          <TotalRateMap loading={loading} data={state} address={serviceDetails?.business?.view?.address}/>
          <Row style={{marginTop: mvs(17)}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: mvs(18)}}>
              {services?.map((item, index) => (
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
                      ? `${state?.businessReviews?.rating[7]?state?.businessReviews?.rating[7]:0}`
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
          {serviceDetails?.view?.renderTncs==true &&(<View>
            <HeadingTitle title="Terms & Conditions" />
            {
              Object.entries(serviceDetails?.view?.tncs).map(([key, value])=>
              {
                return <LabelValue label={''+key} value={serviceDetails?.view?.tncs[key]?.value} />
              })
            }
            
          </View>)}
         <View>
            <HeadingTitle title="Other Conditions" />
            {
             serviceDetails?.otherConditions?.map((item, index)=>
              {
                return <LabelValue label={''+item} value={''} />
              })
            }
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
                  label={`${state?.businessReviews?.rating[7]?state?.businessReviews?.rating[7]:0}`}
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
           { serviceDetails?.coupons &&
           ( <CouponPromo {...props} loading={loading} 
              coupons={serviceDetails?.coupons} business={serviceDetails?.business}/>
           )}
          </View>
          <View style={{paddingHorizontal: mvs(18)}}>
            <Buttons.ButtonPrimary
               onClick={
                serviceDetails?.bookingId!=null
                  ? navigation.navigate('WalkIn', {
                      bookingID: serviceDetails?.bookingId,
                      businessID: bookingState?.serviceBooking?.offeringID,
                    })
                  : BookNow
              }
              disabled={payload.bookNowStart}
              loading={payload.bookNowStart}
              // onClick={() => props?.navigation?.navigate('WalkIn')}
              title={serviceDetails?.view?.buttonTitle}
            />
          </View>
        </ScrollView>
      </View>
      <Toast />
    </View>
  );
};

export default ServiceOfferingDetails;
