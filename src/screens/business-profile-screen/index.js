import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View, Text, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  HeartOutline,
  Map,
  Minute,
  Ratings,
  Share,
} from '../../assets/common-icons';
import {Bg} from '../../assets/images';
import PageLoader from '../../components/atoms/page-loader';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Row from '../../components/atoms/row';
import ServiceCard from '../../components/molecules/service-card';
import ThemeContext from '../../context/theme-context';
import Regular from '../../presentation/typography/regular-text';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import HeadingTitle from './../../components/molecules/heading-title/index';
import LabelValue from './../../components/molecules/label-value-row/index';
import ReviewsRaing from './../../components/molecules/reviews-rating/index';
import ServiceOffering from './../../components/service-offering/index';
import Bold from './../../presentation/typography/bold-text';
import colors from './../../services/colors';
import {STYLES as styles} from './style';
import RatingStar from './../../components/molecules/rating-star/index';
import ReviewModal from './../../components/molecules/modals/review-modal';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import {getData} from '../../localStorage';
import {BaseURL} from '../../ApiServices';
import {addReviews} from '../../Redux/Reducers/ReviewsReducer';
import {useNavigation} from '@react-navigation/native';
import ServiceButton from '../../components/molecules/services-button';
import SelectDropdown from 'react-native-select-dropdown';
import Dropdown from '../../assets/images/downarrow.png';

const Months = [
  {
    name: 'Lisa',
    id: 'Sky',
    //sex: female,
  },

  // {
  //   name: 'Lisa',
  //   surname: 'Sky',
  //   age: 21,
  //   //sex: female,
  // },
  // {
  //   name: 'Thomas',
  //   surname: 'Prat',
  //   age: 33,
  //   //sex: male,
  // },
  // {
  //   name: 'Paul',
  //   surname: 'Sing',
  //   age: 88,
  //   //sex: male,
  // },
  // {
  //   name: 'Andrew',
  //   surname: 'Brown',
  //   age: 23,
  //   //sex: male,
  // },
];

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

// const about =
//   'Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years.Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years  continuing the outstanding level of service Triad area residents expect from our';
const BusinessProfile = ({route}, props) => {
  const {user_info} = props;
  const {id} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [images, setImages] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [payload, setPayload] = React.useState({
    image: '',
    last_name: '',
    first_name: '',
    rating: [],
    picsArrayReviews: [],
  });

  const {showAlert} = React.useContext(ThemeContext);
  const [loading, setLoading] = React.useState(false);
  const [isMoreBtn, setIsMoreBtn] = React.useState(true);
  const ref = React.useRef(null);
  const [businessProfile, setbusinessProfile] = React.useState([]);
  const [businessServices, setbusinessServices] = useState([]);
  const [businessReviews, setbusinessReviews] = useState([]);
  const [contact, setcontact] = useState([]);
  const [businessHourse, setbusinessHourse] = useState(null);
  const [ratingg, setratingg] = useState([]);

  const getBusinessProfile = async () => {
    const res = await getData('token');
    var requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${res}`,
      },
      redirect: 'follow',
    };

    await fetch(`${BaseURL}p/public/businesses/${id}/profile`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setbusinessProfile(result);
          dispatch(addReviews(result));
          setcontact(result.view.contact);
          setbusinessHourse(result.view.hours);
          setratingg(result.rating);
          setbusinessServices(result.services);
          console.log('businessServices ========> ', businessServices);

          setPayload({
            ...payload,
            rating: result.rating,
          });
          console.log('Business profile Ratings=======', ratingg);
        }
      })
      .catch(error => {
        console.log('Business profile error', error);
      });

    await fetch(
      `${BaseURL}p/public/businesses/${id}/reviews?page=1`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setbusinessReviews(result);
          const myArra = [];
          for (let i = 0; i < result.length; i++) {
            myArra?.push(result[i]?.pics);
          }
          setPayload({...payload, picsArrayReviews: myArra});
          console.log('Business reviews=======', result);
        }
      })
      .catch(error => {
        console.log('Business reviews error', error);
      });

    await fetch(
      `${BaseURL}b/om/businesses/${id}/services/1/offerings`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setLoading(true);
          setbusinessServices(result);
          console.log('Business services=======', result);
        }
      })
      .catch(error => {
        setLoading(true);
        // navigation.goBack();
        console.log('Business services error', error);
      });
  };

  const services = [
    {
      icon: 'Services',
      title: 'Services',
      value: businessProfile.services
        ? businessProfile.services.length + ' Services'
        : '0 Service',
    },
    {
      icon: 'Photos',
      title: 'Photos',
      value: businessProfile.gallery
        ? businessProfile.gallery.length + ' Photos'
        : '0 Photos',
    },
    {
      icon: 'Services',
      title: ratingg[5] ? ratingg[5] + ' Reviews' : 0 + ' Reviews',
      value: '5 Services',
    },
    {icon: 'Schedule', title: 'Availability', value: 'See Schedule'},
    {icon: 'Discount', title: 'Discounts', value: 'View Promos'},
  ];
  React.useEffect(() => {
    getBusinessProfile();
  }, [loading]);
  // if (loading) {
  //   return <View style={{ flex: 1 }}>
  //     <PageLoader />
  //   </View>
  // }

  return (
    <View style={styles.container}>
      <View style={{...styles.body}}>
        <ScrollView
          // onScroll={e => {
          //   console.log('this scrol Value', e?.nativeEvent?.contentOffset?.y);
          // }}
          ref={ref}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <View style={{height: mvs(210), width: '100%'}}>
            <ShimmerPlaceholder
              style={{width: '100%', height: '100%'}}
              visible={loading}>
              <ImagePlaceholder
                uri={{uri: businessProfile?.cover}}
                containerStyle={{width: '100%', height: '100%'}}
              />
              <SelectDropdown
                buttonStyle={{
                  //borderWidth: 1,
                  borderRadius: 5,
                  position: 'absolute',
                  width: '30%',
                  height: '20%',
                  left: 250,
                  top: 20,
                  // width: '40%',
                  // height: '110%',
                  backgroundColor: '#fff',
                }}
                defaultButtonText="Services"
                buttonTextStyle={{fontSize: 16}}
                renderDropdownIcon={() => (
                  <Image style={styles.downimg} source={Dropdown} />
                )}
                data={Months?.name}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </ShimmerPlaceholder>
            <TouchableOpacity
              onPress={() => props?.navigation?.goBack()}
              style={{position: 'absolute', left: mvs(20), top: mvs(20)}}>
              <FontAwesome
                size={mvs(25)}
                color={colors.white}
                name="angle-left"
              />
            </TouchableOpacity>
          </View>
          <Row style={{paddingHorizontal: mvs(16), marginTop: mvs(25)}}>
            <View
              style={{
                padding: mvs(10),
                borderRadius: mvs(23),
                borderWidth: 0.7,
                borderColor: colors.GDFDFDF,
              }}>
              <ShimmerPlaceholder
                style={{width: mvs(55), borderRadius: mvs(27), height: mvs(55)}}
                visible={loading}>
                <ImagePlaceholder
                  borderRadius={mvs(12)}
                  uri={{uri: businessProfile?.logo}}
                  containerStyle={{width: mvs(55), height: mvs(55)}}
                />
              </ShimmerPlaceholder>
            </View>

            <View style={{flex: 1, marginLeft: mvs(13)}}>
              <ShimmerPlaceholder
                style={
                  {
                    // width: mvs(300),
                    // alignSelf: 'center',
                    // // borderWidth: 1,
                    // height: mvs(80),
                    // marginLeft: mvs(5),
                  }
                }
                visible={loading}>
                <Row>
                  <Bold
                    numberOfLines={2}
                    style={{flex: 1}}
                    label={businessProfile?.title}
                    size={mvs(20)}
                  />
                  <Row
                    justifyContent={'space-between'}
                    style={{width: mvs(60)}}>
                    <TouchableOpacity>
                      <Share />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setVisible(true);
                      }}>
                      <HeartOutline />
                    </TouchableOpacity>
                  </Row>
                </Row>

                <Row alignItems="flex-end">
                  <Row
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Map />
                    <Regular
                      color={colors.G9B9B9B}
                      size={mvs(16)}
                      label={` ${businessProfile?.country}`}
                    />
                  </Row>
                  <Row style={{width: mvs(80), alignItems: 'flex-end'}}>
                    <Minute />
                    <Bold
                      style={{
                        lineHeight: mvs(15),
                        transform: [{translateY: mvs(2)}],
                      }}
                      color={colors.B323232}
                      size={mvs(15)}
                      label={' 5.4 KM'}
                    />
                  </Row>
                </Row>
              </ShimmerPlaceholder>
            </View>
          </Row>
          <View
            style={{
              borderBottomWidth: 0.7,
              borderColor: colors.GE1E1E1,
              marginTop: mvs(25),
              marginBottom: mvs(16),
              marginHorizontal: mvs(16),
            }}
          />
          <Row>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: mvs(18)}}>
              {services.map((item, index) => (
                <ServiceCard
                  onPress={() => {
                    let y = 421;
                    if (index === 1) {
                      y = 133;
                    } else if (index === 2) {
                      y = 1148;
                    } else if (index === 3) {
                      y = 799;
                    } else if (index === 4) {
                      y = 0;
                    }
                    ref?.current?.scrollTo({x: 0, y: y, animated: true});
                  }}
                  middleText={index === 0 ? '' : null}
                  value={index === 2 ? null : item.value}
                  title={item.title}
                  icon={item.icon}
                  div={services.length - 1 !== index}
                />
              ))}
            </ScrollView>
          </Row>
          <HeadingTitle title="About" />
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <View style={{paddingHorizontal: mvs(18)}}>
              <Regular
                numberOfLines={null}
                label={
                  businessProfile?.about?.length > 185 && isMoreBtn
                    ? `${businessProfile?.about?.slice(0, 183)} ...`
                    : businessProfile?.about
                }
                size={mvs(16)}
                color={colors.B1E1E1E}
              />
              {isMoreBtn && businessProfile?.about?.length > 185 && (
                <TouchableOpacity onPress={() => setIsMoreBtn(false)}>
                  <Regular color={colors.primary} label={'Read More'} />
                </TouchableOpacity>
              )}
            </View>
          </ShimmerPlaceholder>
          <HeadingTitle title="Gallery" />
          <View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: mvs(18)}}
              horizontal>
              {businessProfile?.gallery?.map((ele, index) => (
                <ShimmerPlaceholder
                  style={{
                    marginRight: mvs(10),
                    height: mvs(158),
                    width: mvs(236),
                  }}
                  visible={loading}>
                  <View
                    key={index}
                    style={{
                      marginRight: mvs(10),
                      height: mvs(158),
                      width: mvs(236),
                    }}>
                    <ImagePlaceholder
                      containerStyle={{
                        height: '100%',
                        width: '100%',
                        borderRadius: mvs(16),
                      }}
                      uri={{uri: ele}}
                    />
                  </View>
                </ShimmerPlaceholder>
              ))}
            </ScrollView>
          </View>
          <HeadingTitle title="Contact information" />
          <View>
            <ShimmerPlaceholder
              style={styles.contactInformation}
              visible={loading}>
              <LabelValue
                label={'Address'}
                value={businessProfile?.view?.contact?.Address}
              />
            </ShimmerPlaceholder>
            {/* <ShimmerPlaceholder
              style={styles.contactInformation}
              visible={loading}>
              <LabelValue label={'Website'} value={contact?.web} />
            </ShimmerPlaceholder> */}
            <ShimmerPlaceholder
              style={styles.contactInformation}
              visible={loading}>
              <LabelValue label={'Phone'} value={contact?.Phone} />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              style={styles.contactInformation}
              visible={loading}>
              <LabelValue
                label={'Email Address'}
                value={contact?.Email}
                bw={0}
              />
            </ShimmerPlaceholder>
          </View>
          {businessHourse && (
            <>
              <HeadingTitle title="Business Hours" />
              {/* {Object.keys(businessHourse).forEach(function (key, index) {
               
              })} */}
              {Object.keys(businessHourse).map(objectKey => (
                <ShimmerPlaceholder
                  style={styles.contactInformationtime}
                  visible={loading}>
                  <LabelValue
                    label={objectKey}
                    value={
                      businessHourse[objectKey][0]
                        ? businessHourse[objectKey][0]
                        : ''
                    }
                  />
                  <LabelValue
                    label={''}
                    value={
                      businessHourse[objectKey][1]
                        ? businessHourse[objectKey][1]
                        : ''
                    }></LabelValue>
                </ShimmerPlaceholder>
              ))}
            </>
          )}

          <HeadingTitle title="Rating & Reviews" />
          <View style={{paddingHorizontal: mvs(18)}}>
            <Row justifyContent={'space-between'}>
              <ShimmerPlaceholder
                style={{
                  width: mvs(180),
                  //  / height: mvs(70),
                }}
                visible={loading}>
                <Bold
                  color={colors.black}
                  style={{transform: [{translateY: -mvs(10)}]}}
                  size={mvs(42)}
                  label={ratingg.length > 0 ? ratingg[7] : 0}
                />
              </ShimmerPlaceholder>
              <ShimmerPlaceholder
                style={{width: '50%', height: mvs(50)}}
                visible={loading}>
                <Row style={{marginLeft: 50}}>
                  <View style={{}}>
                    <RatingStar
                      rate={5}
                      size={mvs(7)}
                      list={[1, 2, 3, 4, 5]}
                      width={mvs(40)}
                      style={{alignSelf: 'flex-end'}}
                    />
                    <RatingStar
                      rate={5}
                      size={mvs(7)}
                      list={[1, 2, 3, 4]}
                      width={mvs(32)}
                      style={{alignSelf: 'flex-end', marginTop: mvs(2.4)}}
                    />
                    <RatingStar
                      rate={5}
                      size={mvs(7)}
                      list={[1, 2, 3]}
                      width={mvs(24)}
                      style={{alignSelf: 'flex-end', marginTop: mvs(2.4)}}
                    />
                    <RatingStar
                      rate={5}
                      size={mvs(7)}
                      list={[1, 2]}
                      width={mvs(16)}
                      style={{alignSelf: 'flex-end', marginTop: mvs(2.4)}}
                    />
                    <RatingStar
                      rate={5}
                      size={mvs(7)}
                      list={[1]}
                      width={mvs(8)}
                      style={{
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end',
                        marginTop: mvs(2.4),
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingLeft: mvs(10),
                      //borderWidth: 1,
                      marginRight: 100,
                    }}>
                    <View
                      style={{
                        height: mvs(4),
                        borderRadius: mvs(5),
                        backgroundColor: colors.primary,
                        width: mvs(ratingg[0] ? (ratingg[0] / 5) * 100 : 0),
                      }}
                    />
                    <View
                      style={{
                        height: mvs(4),
                        borderRadius: mvs(5),
                        marginTop: mvs(5),
                        backgroundColor: colors.primary,
                        width: mvs(ratingg[1] ? (ratingg[1] / 5) * 100 : 0),
                        // width: mvs(45.3),
                      }}
                    />
                    <View
                      style={{
                        height: mvs(4),
                        borderRadius: mvs(5),
                        marginTop: mvs(5),
                        backgroundColor: colors.primary,
                        width: mvs(ratingg[2] ? (ratingg[2] / 5) * 100 : 0),
                      }}
                    />
                    <View
                      style={{
                        height: mvs(4),
                        borderRadius: mvs(5),
                        marginTop: mvs(5),
                        backgroundColor: colors.primary,
                        width: mvs(ratingg[3] ? (ratingg[3] / 5) * 100 : 0),
                      }}
                    />
                    <View
                      style={{
                        height: mvs(4),
                        borderRadius: mvs(5),
                        marginTop: mvs(5),
                        backgroundColor: colors.primary,
                        width: mvs(ratingg[4] ? (ratingg[4] / 5) * 100 : 0),
                      }}
                    />
                  </View>
                </Row>
              </ShimmerPlaceholder>
            </Row>
            <Row>
              <Bold color={colors.black} size={mvs(12)} label={'out of 5'} />
              <Bold
                color={colors.black}
                size={mvs(12)}
                label={ratingg[5] ? ratingg[5] + '  ratings' : 0 + ' ratings'}
              />
            </Row>
          </View>
          <ReviewsRaing
            picsArray={payload?.picsArrayReviews}
            data={businessReviews?.map(item => item)}
            loading={loading}
          />
          {/* <HeadingTitle title='Services' />
          <View style={{ paddingHorizontal: mvs(18) }}>
            <ServiceButton icon='CarWash' title='Car Wash' />
            <ServiceButton icon='Maintenance' title='Maintenance Schedule' />
            <ServiceButton icon='Oil' title='Oil and Filter service' />
            <ServiceButton icon='Brake' title='Brake Service' />
            <ServiceButton icon='Brake' title='Brake Service' />
            <ServiceButton icon='Engine' title='Engine' />
          </View> */}
          <View
            style={{
              backgroundColor: colors.FBF8F8,
              flexGrow: 1,
              paddingBottom: mvs(30),
              marginTop: mvs(20),
            }}>
            <HeadingTitle title="Service offering" />
            <ServiceOffering
              data={businessServices}
              loading={loading}
              moveTo="ServiceOfferingDetails"
            />
            {/* <CouponPromo /> */}
          </View>
        </ScrollView>
      </View>
      <ReviewModal
        setVisible={() => setVisible(false)}
        items={images}
        setItems={setImages}
        visible={visible}
      />
    </View>
  );
};

export default BusinessProfile;
