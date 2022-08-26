import React, {useRef, useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {connect, useSelector} from 'react-redux';
import Buttons from '../../components/atoms/Button';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Row from '../../components/atoms/row';
import TotalRateMap from '../../components/molecules/total-rate-map';
import Bold from '../../presentation/typography/bold-text';
import Medium from '../../presentation/typography/medium-text';
// import HomeCard from './../../../components/molecules/home-card/home-card';
import {Bg} from '../../assets/images';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import {Walk_In_Styles as styles} from './walk-in-styles';

import moment from 'moment';
import {Vehicle, WhitePercentage} from '../../assets/common-icons';
import PaymentItem from '../../components/molecules/payment-item/payment-item';
import NewPaymentSheet from '../../components/payment-method/new-pament';
import PaymentSheet from '../../components/payment-method/payments';
import SemiBold from '../../presentation/typography/semibold-text';
import ScheduleModal from './../../components/molecules/modals/schedule-modal';
import CouponModal from './../../components/molecules/modals/coupon-modal';

import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {BaseURL} from '../../ApiServices';
import {getData} from '../../localStorage';
import alertService from '../../services/alert.service';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const WalkIn = props => {
  const refRBSheet = useRef(null);
  const {route, navigation,book_slot,update_payment_method,complete_booking} = props;
  const {bookingID, businessID} = route.params;
  console.log(route.params)
  // console.log('ids=======', bookingID, businessID);
  const state = useSelector(state => state.businessReviews);
  const bookingState = useSelector(state => state.common);
  console.log("User info  ", bookingState.user_info)
  const refRBNewPaymentSheet = useRef(null);
  function newPayment() {
    refRBNewPaymentSheet.current.open();
  }
  const [scheduleModal, setScheduleModal] = React.useState(false);
  const [couponValue, setCouponValue] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState();
  const [date, setDate] = React.useState(moment());
  const [payload, setpayload] = useState({
    offerings: [],
  });
  const [paymentModal, setPaymentModal] = React.useState(false);
  const [couponModal, setCouponModal] = React.useState(false);
  const [selectedPayment, setselectedPayment] = useState(" ");
  const [paymentMethods, setPaymentMethods] = useState([
    {
      Number: 'Cash on delivery',
      // Selected: true,
    },
    {
      Number: 'Online Payment',
      //Selected: false,
    },
  ]);
  const [loading, setloading] = React.useState(false);
  const [coupon, setCoupon] = React.useState(null);
  const [paymentMode, setpaymentMode] = useState(0);
  const [bookingDetails, setbookingDetails] = useState([]);
  
  const getBookingDetails = async () => {
    const token = await getData('token');
    var requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}b/om/businesses/${businessID}/bookings/${bookingID}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          console.log(result)
          setbookingDetails(result);
          const offering = JSON.parse(result.offering);
          setpayload({
            ...payload,
            offerings: offering,
          });

          //console.log('get Booking Details======', payload.offerings);
        }
      })
      .catch(error => {
        // navigation?.goBack();
        console.log('error', error);
      });

    var raw = JSON.stringify({
      walkinOnly: 0,
    });

    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: raw,
      redirect: 'follow',
    };

    await fetch(
      `${BaseURL}p/public/bookings/${bookingID}/slots`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result != null) {
          setloading(true);
          setItems(result);
          console.log('Time Slots========');
          console.log(items?.Afternoon?.slots)
        }
      })
      .catch(error => {
        setloading(true);
        console.log('error', error);
      });
  };
  const bookSlot=async()=>{
     var payload={
      "slotId": selectedValue?.id
     };
     console.log(payload)
     await book_slot(bookingID,payload);
  }
  const updatePayment=async(method)=>{
    var payload={
      "method": method,
      "reference": " "
    };
    console.log(payload)
    await update_payment_method(bookingID,payload);
 }
  useEffect(() => {
    getBookingDetails();
  }, [loading]);
  const completeBooking=async()=>{
    await complete_booking(bookingID)
  }
  return (
    <View style={{...styles.conntainer, backgroundColor: colors.background}}>
      <CustomHeader
        title="New Walk In Booking"
        titleStyle={{fontSize: 15}}
        spacebetween
        allowBackBtn
      />
      <View style={styles.body}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: mvs(30)}}>
          <View />
          <Row style={{paddingHorizontal: mvs(18)}}>
            <ShimmerPlaceholder
              style={{width: mvs(110), height: mvs(110)}}
              visible={loading}>
              <ImagePlaceholder
                borderRadius={mvs(8)}
                uri={payload?.offerings?.cover}
                containerStyle={{width: mvs(110), height: mvs(110)}}
              />
            </ShimmerPlaceholder>
            <View style={{marginLeft: mvs(10), flex: 1}}>
              <ShimmerPlaceholder
                //style={{width: mvs(110), height: mvs(110)}}
                visible={loading}>
                <Bold
                  numberOfLines={2}
                  size={mvs(16)}
                  label={payload?.offerings?.title}
                />
              </ShimmerPlaceholder>
              <ShimmerPlaceholder
                //style={{width: mvs(110), height: mvs(110)}}
                visible={loading}>
                <Row justifyContent="flex-start" alignItems="center">
                  <Regular color={colors.B606060} label={'Lead Time:'} />
                  <Medium color={colors.G3CB971} label={' 45 Minutes'} />
                </Row>
              </ShimmerPlaceholder>
              <ShimmerPlaceholder
                //style={{width: mvs(110), height: mvs(110)}}
                visible={loading}>
                <Row
                  style={{marginTop: mvs(2)}}
                  justifyContent="flex-start"
                  alignItems="center">
                  <Regular color={colors.B606060} label={'Price:'} />
                  <Medium
                    color={colors.primary}
                    label={` AED ${bookingDetails?.offering?.price}`}
                  />
                </Row>
              </ShimmerPlaceholder>
              <ShimmerPlaceholder
                //style={{width: mvs(110), height: mvs(110)}}
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
          <Row style={styles.rowView}>
            <View>
              <Bold label={'Date & time'} size={15} />
              {selectedValue!=undefined?
                <Regular
                label={`${date?.format('DD MMMM YYYY')} ${selectedValue?.from[0]+":"+selectedValue?.from[1]+"-"+selectedValue?.to[0]+":"+selectedValue?.to[1]}`}
                size={16}
              />:
              <Regular
                label={`${date?.format('DD MMMM YYYY')}`}
                size={16}/>
              }
            </View>
            <TouchableOpacity onPress={() => setScheduleModal(true)}>
              <Regular label={'Change'} size={15} color={colors.primary} />
            </TouchableOpacity>
          </Row>
          <Row style={styles.rowView}>
            <Vehicle />
            <View style={{flex: 1, marginHorizontal: mvs(9)}}>
              <Medium label={'Toyota Corolla '} size={16} />
              <Regular label={'C19001 - Sharjah'} size={12} />
            </View>
          </Row>
          <View style={styles.couponView}>
            <Row
              style={{
                ...styles.rowView,
                borderBottomWidth: 0,
                paddingVertical: 8,
              }}>
              <Bold label={'Coupon'} size={15} />
              <TouchableOpacity
                onPress={() => {
                  if (!couponValue) {
                    setCouponModal(true);
                  } else {
                    setCouponValue(false);
                  }
                }}>
                <Regular
                  label={!couponValue ? 'Find Coupon' : 'Remove'}
                  size={15}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </Row>
            {couponValue && (
              <Row
                style={{
                  ...styles.rowView,
                  borderBottomWidth: 0,
                  paddingTop: 0,
                }}>
                <ImagePlaceholder
                  borderRadius={mvs(8)}
                  uri={Bg}
                  containerStyle={{width: mvs(69), height: mvs(70)}}
                />
                <View style={{flex: 1, marginHorizontal: mvs(9)}}>
                  <SemiBold label={'50% OFF Car Wash'} size={15} />
                  <Regular label={'30.00 AED'} size={13} />
                  <Row style={styles.voucherView}>
                    <WhitePercentage />
                    <Regular
                      label={'CASH VOUCHER'}
                      size={14}
                      color={colors.white}
                    />
                  </Row>
                </View>
              </Row>
            )}
          </View>
          <View style={styles.paymentView}>
            <Regular label={'Payment Method'} size={16} />
            <PaymentItem value={selectedPayment+' '} onClick={() => setPaymentModal(true)} />
            <Row style={{...styles.priceView, marginTop: mvs(16.3)}}>
              <Medium label={'Sub Total'} size={14} />
              <Medium label={'$45.00'} size={14} />
            </Row>
            <Row style={{...styles.priceView}}>
              <Medium label={'VAT (10%)'} size={14} color={colors.lightgrey1} />
              <Medium label={'$2.00'} size={14} color={colors.lightgrey1} />
            </Row>
            <Row style={{...styles.priceView}}>
              <Bold label={'Grand Total'} size={14} />
              <Bold label={'$47.00'} size={14} />
            </Row>
            <Buttons.ButtonPrimary title="Confirm" onClick={()=>completeBooking()} style={styles.button} />
          </View>
        </ScrollView>
        <PaymentSheet
          onChange={(mode, m) => {
            setPaymentMethods(mode);
            console.log('m', m.Number);
            setselectedPayment(m.Number);
            updatePayment(m.Number);
          }}
          setVisible={() => setPaymentModal(false)}
          paymentMethods={paymentMethods}
          visible={paymentModal}

          // onAddClick={() => newPayment()}
        />
        {/* <NewPaymentSheet
          paymentMethods={paymentMethods}
          setPaymentMethods={methods => {
            console.log('new methods:::', methods);
            setPaymentMethods(methods);
            refRBNewPaymentSheet?.current?.close(false);
          }}
          ref={refRBNewPaymentSheet}
        /> */}
      </View>
      <ScheduleModal
        date={date}
        setDate={setDate}
        value={selectedValue}
        setValue={setSelectedValue}
        //setVisible={() => alert('hi')}
        setVisible={() => setScheduleModal(false)}
        items={items}
        setItems={setItems}
        visible={scheduleModal}
        onContinue={()=>{
          setScheduleModal(false);
          bookSlot()
        }}
      />
      <CouponModal
        items={[1, 2, 3]}
        setVisible={setCouponModal}
        setValue={setCouponValue}
        value={couponValue}
        title={'Coupon'}
        visible={couponModal}
      />
      {/* {console.log('timeSlot======', couponValue)} */}
    </View>
  );
};
const mapStateToProps = store => ({
 // user_info: store.state.user_info,
});
const mapDispatchToProps = {
  book_slot:(id,params)=>DIVIY_API.book_slot(id,params),
  update_payment_method:(id,params)=>DIVIY_API.update_payment(id,params),
  complete_booking:(id)=>DIVIY_API.complete_booking(id)
};
export default connect(mapStateToProps, mapDispatchToProps)(WalkIn);
