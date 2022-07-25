import React from 'react';
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
const about =
  'Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years.Gresasy Elbo Auto Repair has been the leader in automotive repair in the Triad area for twenty years  continuing the outstanding level of service Triad area residents expect from our';
const services = [
  {icon: 'Services', title: '2.5K Reviews', value: '5 Services'},
  {icon: 'Schedule', title: 'Book Service', value: 'Availability'},
  {icon: 'Discount', title: 'Discounts', value: 'View Promos'},
];
const CouponDetails = props => {
  const {route, navigation} = props;
  const [isMoreBtn, setIsMoreBtn] = React.useState(true);

  return (
    <View style={styles.conntainer}>
      <CustomHeader allowBackBtn title={'Coupon Details'} colors={colors} />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View />
          <View style={{paddingHorizontal: mvs(18)}}>
            <CouponCard />
          </View>
          <TotalRateMap />
          <HeadingTitle title="About Coupon" />
          <View style={{paddingHorizontal: mvs(18)}}>
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
          </View>
          <HeadingTitle title={'Redemptions Details'} />
          <View>
            <LabelValue value={'AED 1039.00'} label={'Total Value'} />
            <LabelValue value={'Total Discount'} label={'AED 340.00'} />
            <LabelValue value={'22 May 2020'} label={'AED79.00 35% 27.65'} />
          </View>
          <HeadingTitle title={'Coupon Terms & Conditions'} />
          <LabelValue value={'May 10 2020'} label={'Valid From'} />
          <LabelValue value={'May 09 2021'} label={'Expires On'} />
          <LabelValue
            label={'Valid For Up To Total Purchase Value Of'}
            value={'AED 1,000'}
          />
          <LabelValue
            label={'Valid For Up To Total Discount Value Of'}
            value={'AED 1,000'}
          />
          <LabelValue label={'Maximum Services Limit'} value={'10'} />
          <LabelValue label={'Daily Services Limit'} value={'1'} />
          <LabelValue label={'Weekly Services Limit '} value={'7'} />
          <LabelValue label={'Monthly Services Limit '} value={'35'} />
          <LabelValue
            label={'Validity Days'}
            value={'Sun, Mon, Tue,  days of the week only'}
          />
          <LabelValue
            label={'Validity Time'}
            value={'Morning 09-12, Afternoon 12-06 only'}
          />
          <LabelValue label={'Booking Is Required '} value={'24 hours Prior'} />
          <LabelValue
            label={'Can Be Redeem From The SHEHNSHAH App Only'}
            value={''}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default CouponDetails;
