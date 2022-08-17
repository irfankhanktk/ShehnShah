import React from 'react';
import {View, Text} from 'react-native';
import {OffCarWash, Percent} from '../../../assets/common-icons';
import Bold from '../../../presentation/typography/bold-text';
import Medium from '../../../presentation/typography/medium-text';
import Regular from '../../../presentation/typography/regular-text';
import colors from '../../../services/colors';
import {mvs} from '../../../services/metrices';
import Row from '../../atoms/row';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const CouponCard = ({loading,coupon={}}) => {
  return (
    <Row>
      <ShimmerPlaceholder
        style={{width: mvs(100), height: mvs(100)}}
        visible={loading}>
        <OffCarWash />
      </ShimmerPlaceholder>

      <View style={{marginLeft: mvs(10), flex: 1}}>
        <ShimmerPlaceholder visible={loading}>
          <Medium size={mvs(15)} label={coupon?.title} />
        </ShimmerPlaceholder>
        <ShimmerPlaceholder visible={loading}>
          <Regular color={colors.G777373} size={mvs(13)} label={coupon?.price+' AED'} />
        </ShimmerPlaceholder>
        <ShimmerPlaceholder visible={loading}>
          <Row style={{marginTop: mvs(3)}} justifyContent="flex-start">
            <Percent height={mvs(16)} width={mvs(16)} />
            <Regular
              style={{textTransform: 'uppercase'}}
              size={mvs(12)}
              color={colors.primary}
              label={' '+coupon?.highlight}
            />
          </Row>
        </ShimmerPlaceholder>
        <ShimmerPlaceholder visible={loading}>
          <Row style={{marginTop: mvs(3)}}>
            <Regular
              color={colors.G777373}
              size={mvs(13)}
              label={'Expires on '+coupon?.useConditions?.to}
            />
            <Bold size={mvs(16)} label={'$'+coupon?.price} />
          </Row>
        </ShimmerPlaceholder>
      </View>
    </Row>
  );
};
export default CouponCard;
