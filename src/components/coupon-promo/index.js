import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Cross} from '../../assets/common-icons';
import {Bg} from '../../assets/images';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import ImagePlaceholder from '../atoms/Placeholder';
import HeadingTitle from '../molecules/heading-title';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const CouponPromo = ({coupons=[],business={},...props}) => {
  return (
    <View>
      <HeadingTitle title="Coupons & Promos" />
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: mvs(18)}}>
          {coupons.map((ele, index) => (
            <TouchableOpacity
              onPress={() => props?.navigation?.navigate('CouponDetails',{id:ele?.id,bId:business?.id})}
              style={{
                width: mvs(134),
                marginRight: mvs(7),
                borderTopRightRadius: mvs(8),
                borderRadius: mvs(8),
                overflow: 'hidden',
              }}>
              <ShimmerPlaceholder
                style={{height: mvs(91), width: '100%'}}
                visible={props.loading}>
                <ImagePlaceholder
                  containerStyle={{height: mvs(91), width: '100%'}}
                  uri={Bg}
                />
              </ShimmerPlaceholder>
              <View style={{padding: mvs(5), backgroundColor: colors.white}}>
                <ShimmerPlaceholder
                  // style={{height: mvs(91), width: '100%'}}
                  visible={props.loading}>
                  <Regular
                    size={mvs(12)}
                    color={colors.primary}
                    label={business?.title}
                  />
                </ShimmerPlaceholder>
                <ShimmerPlaceholder
                  // style={{height: mvs(91), width: '100%'}}
                  visible={props.loading}>
                  <SemiBold
                    color={colors.black}
                    numberOfLines={2}
                    label={ele?.title}
                  />
                </ShimmerPlaceholder>
                <ShimmerPlaceholder
                  // style={{height: mvs(91), width: '100%'}}
                  visible={props.loading}>
                  <Regular
                    size={mvs(11)}
                    color={colors.G5E5E5E}
                    label={ele?.subTitle}
                  />
                  <TouchableOpacity
                    style={{
                      width: mvs(83),
                      backgroundColor: colors.primary,
                      height: mvs(15),
                      borderRadius: mvs(3),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Cross />
                    <Regular
                      label={' '+ele?.highlight}
                      style={{
                        textTransform: 'uppercase',
                        fontSize: mvs(8),
                        color: colors.white,
                      }}
                    />
                  </TouchableOpacity>
                  <Bold
                    size={mvs(12)}
                    color={colors.black}
                    label={ele?.price+' AED'}
                  />
                </ShimmerPlaceholder>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
export default CouponPromo;
