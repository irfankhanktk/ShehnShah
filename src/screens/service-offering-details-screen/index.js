import React, {useEffect, useState} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
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
const about =
  'Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years.Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years  continuing the outstanding level of service Triad area residents expect from our';
const services = [
  {icon: 'Services', title: '2.5K Reviews', value: '5 Services'},
  {icon: 'Schedule', title: 'Book Service', value: 'Availability'},
  {icon: 'Discount', title: 'Discounts', value: 'View Promos'},
];
const ServiceOfferingDetails = props => {
  const {route, navigation} = props;
  const {id} = route.params;
  const [isMoreBtn, setIsMoreBtn] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const ref = React.useRef(null);
  const [userToken, setuserToken] = useState('');
  // const getToken = async () => {
  //   const res = await getData('token');
  //   if (res != null) {
  //     setuserToken(res);
  //     console.log('Profile Token=====', userToken);
  //   }
  // };

  const getServiceDetails = async () => {
    const token = await getData('token');
    console.log('token in service offerings======', token, id);
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
                uri={Bg}
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
                  label={
                    'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'
                  }
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
                  <Medium color={colors.G3CB971} label={' 45 Minutes'} />
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
                  <Medium color={colors.primary} label={' AED 45'} />
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
          <TotalRateMap loading={loading} />
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
                  middleText={index === 0 ? '4.7' : null}
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
                  about?.length > 185 && isMoreBtn
                    ? `${about?.slice(0, 183)} ...`
                    : about
                }
                size={mvs(16)}
                color={colors.B1E1E1E}
              />
              {isMoreBtn && about?.length > 185 && (
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
                  label={'4.7'}
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
              onClick={() => props?.navigation?.navigate('WalkIn')}
              title="Book Now"
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ServiceOfferingDetails;
