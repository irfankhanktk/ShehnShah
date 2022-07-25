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
import {MyCoupon} from '../../../assets/common-icons';
import styles from './my-coupons-styles';
import {mvs} from '../../../services/metrices';
import allColors from '../../../services/colors';
import CouponItem from '../../../components/atoms/coupon-item';
import Medium from '../../../presentation/typography/medium-text';
// create a component
const MyCoupons = props => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [actives, setActivesCoupon] = useState([
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      discount: '40',
      aed: '20.00',
      progress: 0.4,
      price: 84.5,
      expireTime: 'May 09 2021',
    },
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      discount: '40',
      aed: '20.00',
      progress: 0.7,
      price: 84.5,
      expireTime: 'May 09 2021',
    },
  ]);
  const [expires, setExpiresCoupons] = useState([
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      discount: '40',
      aed: '20.00',
      progress: 1,
      price: 84.5,
      expireTime: 'May 09 2021',
    },
    {
      bussinessName: 'Total Al Safeer Car Wash…',
      address: 'Sharjah Al nahada road',
      image: '../../assets/images/carwash.png',
      subImage: '../../assets/images/carwash.png',
      discount: '40',
      aed: '20.00',
      progress: 1,
      price: 84.5,
      expireTime: 'May 09 2021',
    },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: mvs(16),
          backgroundColor: allColors.tabBackground,
        }}>
        {actives.length > 0 || expires.length > 0 ? (
          <View
            style={{
              flex: 1,
              paddingTop: mvs(10),
              backgroundColor: allColors.tabBackground,
            }}>
            {actives.length > 0 ? (
              <>
                <Medium
                  label={'Active Coupons'}
                  style={{...styles.title, marginTop: 0}}
                />
                <FlatList
                  data={actives}
                  renderItem={({item}) => (
                    <CouponItem
                      address={item.address}
                      bussinessName={item.bussinessName}
                      expireTime={item.expireTime}
                      discount={item.discount}
                      status="active"
                      AED={item.aed}
                      onPress={() =>
                        props?.navigation?.navigate('CouponDetails')
                      }
                      progress={item.progress}
                      price={item.price}
                    />
                  )}
                />
              </>
            ) : null}

            {expires.length > 0 ? (
              <>
                <Medium
                  label={'Expired Coupons'}
                  style={{...styles.title, marginTop: mvs(10)}}
                />
                <FlatList
                  data={expires}
                  renderItem={({item}) => (
                    <CouponItem
                      address={item.address}
                      bussinessName={item.bussinessName}
                      expireTime={item.expireTime}
                      discount={item.discount}
                      status="expire"
                      AED={item.aed}
                      onPress={() => alert('Active')}
                      progress={item.progress}
                      price={item.price}
                    />
                  )}
                />
              </>
            ) : null}
          </View>
        ) : (
          <View style={styles.body}>
            <MyCoupon />
            <Bold label={'No Coupons'} style={styles.welcomeText} />
            <Regular
              label={
                'Don’t have any active coupons. Your all coupons will show here.'
              }
              numberOfLines={2}
              style={styles.welcomeSubText}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyCoupons;
