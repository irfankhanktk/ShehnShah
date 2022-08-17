import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import HeadingTitle from '../../components/molecules/heading-title';
import LabelValue from '../../components/molecules/label-value-row';
import TotalRateMap from '../../components/molecules/total-rate-map/index';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import CouponCard from './../../components/molecules/coupon-card/index';
import {Styles as styles} from './styles';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
import {getData} from '../../localStorage';
import DIVIY_API from '../../store/api-calls';
import Buttons from '../../components/atoms/Button';

const CouponDetails = props => {
  const {route, navigation,get_details,avail_coupon,update_coupon_payment,complete_coupon_purchase} = props;
  const [isMoreBtn, setIsMoreBtn] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [coupon,setCoupon]=useState({})
  useEffect(()=>{
     getCouponDetails();
  },[])
  const getCouponDetails=async()=>{
    const response=await get_details(route.params?.id,route.params.bId);
    console.log("Coupon Data ")
    if(response?.data){
      console.log(response?.data)
      setCoupon(response?.data)
    }
}
  function getString(list){
    console.log(list.tos)
  }
  const availCoupon=async()=>{
    const id=await getData("customer_id");
    console.log("Customer id is ",id)
    console.log("Coupon id is ",coupon?.id)
    const availResponse=await avail_coupon(id,coupon?.id)
    console.log("Avail Response",availResponse?.data)
    const paymentResponse=await update_coupon_payment(id,coupon?.id)
    console.log("payment Response",paymentResponse?.data)
    const completeResponse=await complete_coupon_purchase(id,coupon?.id)
    console.log("payment Response",completeResponse?.data)
  }
  return (
    <View style={styles.conntainer}>
      <CustomHeader allowBackBtn title={'Coupon Details'} colors={colors} />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View />
          <View style={{paddingHorizontal: mvs(18)}}>
            <CouponCard loading={loading} coupon={coupon}/>
          </View>
          <TotalRateMap loading={loading} />
          <HeadingTitle title="About Coupon" />
          <View style={{paddingHorizontal: mvs(18)}}>
            <ShimmerPlaceholder visible={loading}>
              <Regular
                numberOfLines={null}
                label={
                 coupon?.about?.length > 185 && isMoreBtn
                    ? `${coupon?.about?.slice(0, 183)} ...`
                    : coupon?.about
                }
                size={mvs(16)}
                color={colors.B1E1E1E}
              />
              {isMoreBtn && coupon?.about?.length > 185 && (
                <TouchableOpacity onPress={() => setIsMoreBtn(false)}>
                  <Regular color={colors.primary} label={'Read More'} />
                </TouchableOpacity>
              )}
            </ShimmerPlaceholder>
          </View>
          <HeadingTitle title={'Redemptions Details'} />
          <View>
            <ShimmerPlaceholder
              style={{width: '95%', alignSelf: 'center'}}
              visible={loading}>
              <LabelValue value={'AED '+coupon?.price} label={'Total Value'} />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              style={{width: '95%', alignSelf: 'center'}}
              visible={loading}>
              {coupon?.discountValue!=null &&(<LabelValue value={'Total Discount'} label={'AED '+coupon?.discountValue} />)}
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              style={{width: '95%', alignSelf: 'center'}}
              visible={loading}>
              <LabelValue value={'22 May 2020'} label={'AED79.00 35% 27.65'} />
            </ShimmerPlaceholder>
          </View>
          <HeadingTitle title={'Coupon Terms & Conditions'} />
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <LabelValue value={coupon?.saleConditions?.from} label={'Valid From'} />
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <LabelValue value={coupon?.saleConditions?.to} label={'Expires On'} />
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <LabelValue
              label={'Valid For Up To Total Purchase Value Of'}
              value={'AED 1,000'}
            />
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <LabelValue
              label={'Valid For Up To Total Discount Value Of'}
              value={'AED 1,000'}
            />
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <LabelValue label={'Maximum Services Limit'} value={coupon?.saleConditions?.totalLimit} />
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <LabelValue label={'Daily Services Limit'} value={coupon?.saleConditions?.dailyLimit} />
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <LabelValue label={'Weekly Services Limit '} value={coupon?.saleConditions?.weeklyLimit} />
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <LabelValue label={'Monthly Services Limit '} value={coupon?.saleConditions?.monthlyLimit} />
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <LabelValue
              label={'Validity Days'}
              value={coupon?.useConditions?.days?.toString()}
            />
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <LabelValue
              label={'Validity Time'}
              value={coupon?.useConditions?.shifts?.toString()}
            />
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
            <LabelValue
              label={'Booking Is Required '}
              value={'24 hours Prior'}
            />
          </ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>

                 <LabelValue
                  label={coupon?.otherConditions}
                  value={''}
                  lines={5}
                />
          </ShimmerPlaceholder>
          <Buttons.ButtonPrimary title='Avail Coupon' style={{marginHorizontal:mvs(22),width:'90%'}} onClick={()=>availCoupon()}/>
        </ScrollView>
      </View>
    </View>
  );
};
const mapStateToProps = store => ({
  // user_info: store.state.user_info,
 });
 const mapDispatchToProps = {
   get_details:(id,bid)=>DIVIY_API.get_coupons_details(id,bid),
   avail_coupon:(id,cid)=>DIVIY_API.avail_coupon(id,cid),
   update_coupon_payment:(id,cid)=>DIVIY_API.update_coupon_payment(id,cid),
   complete_coupon_purchase:(id,cid)=>DIVIY_API.complete_coupon_purchase(id,cid)
 };
 export default connect(mapStateToProps, mapDispatchToProps)(CouponDetails);
