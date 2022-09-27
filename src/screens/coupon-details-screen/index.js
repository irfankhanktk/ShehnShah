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
import ServiceOffering from './../../components/service-offering/index';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
import {getData} from '../../localStorage';
import DIVIY_API from '../../store/api-calls';
import Buttons from '../../components/atoms/Button';
import SemiBold from '../../presentation/typography/semibold-text';

const CouponDetails = props => {
  const {route, navigation,get_details,avail_coupon} = props;
  const [isMoreBtn, setIsMoreBtn] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [coupon,setCoupon]=useState({})
  const[refresh,setRefresh]=useState(false);
  useEffect(()=>{
     getCouponDetails();
  },[refresh])
  const getCouponDetails=async()=>{
    var id=await getData("customer_id");
    id=1
    const response=await get_details(route.params?.id,route.params.bId,id);
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
    var id=await getData("customer_id");
    id=1;
    console.log("Customer id is ",id)
    console.log("Coupon id is ",coupon?.id)
    const availResponse=await avail_coupon(id,coupon?.id)
    console.log("Avail Response",availResponse?.data)
    setRefresh(!refresh)
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
          <TotalRateMap loading={loading} data={{businessReviews:coupon?.business}} address={coupon?.business?.view?.address}/>
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
          { coupon?.view?.tncs &&
              Object.entries(coupon?.view?.tncs).map(([key, value])=>
              {
                return <LabelValue label={''+key} value={coupon?.view?.tncs[key]?.value} />
              })
            }
         
          <ShimmerPlaceholder
            style={{width: '95%', alignSelf: 'center'}}
            visible={loading}>
           <View>
           
          {coupon?.otherConditions?.length>0 && (  <HeadingTitle title="Other Conditions" />)}
            {
             coupon?.otherConditions?.map((item, index)=>
              {
                return <LabelValue key={index} label={''+item} value={''} />
              })
            }
          </View>
          </ShimmerPlaceholder>
          <ServiceOffering
              data={coupon?.offerings}
              loading={loading}
              isCouponOffering={true}
              moveTo="ServiceOfferingDetails"
            />
            {coupon?.view?.resume && (
              <View style={{marginTop: mvs(10), alignItems: 'center'}}>
                <SemiBold
                  label={coupon?.view?.resumeMessage}
                  size={14}
                  numberOfLines={3}
                  color={colors.green}
                />
              </View>
            )}
          {coupon?.view?.sellable &&( 
           <Buttons.ButtonPrimary 
            title={coupon?.view?.buttonTitle} 
            style={{marginHorizontal:mvs(22),width:'90%',marginTop:mvs(15)}}
             onClick={()=>{
                 coupon?.saleId==null?
                  availCoupon()
                 :navigation.navigate("SaleCoupon",{saleId:coupon?.saleId})
              }}/>)}
         </ScrollView>
      </View>
    </View>
  );
};
const mapStateToProps = store => ({
  // user_info: store.state.user_info,
 });
 const mapDispatchToProps = {
   get_details:(id,bid,cid)=>DIVIY_API.get_coupons_details(id,bid,cid),
   avail_coupon:(id,cid)=>DIVIY_API.avail_coupon(id,cid),
 };
 export default connect(mapStateToProps, mapDispatchToProps)(CouponDetails);
