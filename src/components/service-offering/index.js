import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {LeftBlackArrow, Percent} from '../../assets/common-icons';
import {Bg} from '../../assets/images';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Buttons from '../atoms/Button';
import ImagePlaceholder from '../atoms/Placeholder';
import Row from '../atoms/row';
import Bold from './../../presentation/typography/bold-text';

import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ServiceOffering = ({
  data,
  loading,
  moveTo = 'ServiceOfferingDetails',
}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: mvs(18)}}>
          {[0, 1, 2, 3, 4].map((ele, index) => (
            <TouchableOpacity onPress={() => navigation.navigate(moveTo + '')}>
              <View
                style={{
                  width: mvs(250),
                  marginRight: mvs(7),
                  borderTopRightRadius: mvs(8),
                  borderRadius: mvs(8),
                  overflow: 'hidden',
                }}>
                <ShimmerPlaceholder
                  style={{height: mvs(120), width: '100%'}}
                  visible={loading}>
                  <ImagePlaceholder
                    containerStyle={{height: mvs(120), width: '100%'}}
                    uri={Bg}
                  />
                </ShimmerPlaceholder>
                <View style={{padding: mvs(5), backgroundColor: colors.white}}>
                  {/* <Row alignItems='center'>
                                <Row alignItems='center'>
                                    <StarFill height={mvs(13)} width={mvs(13)} />
                                    <Regular label={` ${4.9} (${2.3}k)`} />
                                </Row>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Buttons.ButtonPrimary title='AED 30' textStyle={{ fontSize: mvs(12), color: colors.primary }} style={{ width: mvs(72), borderRadius: mvs(5), height: mvs(21), backgroundColor: `${colors.primary}30` }} />
                                </View>
                            </Row> */}
                  <ShimmerPlaceholder
                    style={{
                      height: mvs(20),
                      width: mvs(220),
                    }}
                    visible={loading}>
                    <Bold
                      color={colors.black}
                      numberOfLines={2}
                      label={'Subtitle or description'}
                    />
                  </ShimmerPlaceholder>
                  <ShimmerPlaceholder
                    style={{
                      height: mvs(20),
                      marginTop: mvs(5),
                      width: mvs(200),
                    }}
                    visible={loading}>
                    <Regular
                      size={mvs(13)}
                      color={colors.black}
                      numberOfLines={2}
                      label={'Subtitle or description'}
                    />
                  </ShimmerPlaceholder>
                  {/* <Regular size={mvs(12)} color={colors.primary} label={'Business Name'} /> */}
                  <ShimmerPlaceholder
                    style={{
                      height: mvs(40),
                      marginTop: mvs(10),
                      width: mvs(240),
                    }}
                    visible={loading}>
                    <Row style={{marginTop: mvs(10)}}>
                      {/* <Row justifyContent='flex-start'>
                                    <Minute />
                                    <Regular size={mvs(12)} color={colors.B2E3036} label={' 20 Min'} />
                                </Row> */}

                      <Row justifyContent="flex-start">
                        <Percent />
                        <Regular
                          size={mvs(12)}
                          color={colors.B2E3036}
                          label={' Get 20% OFF'}
                        />
                      </Row>
                      <Buttons.ButtonPrimary
                        title="AED 30"
                        textStyle={{fontSize: mvs(12), color: colors.primary}}
                        style={{
                          width: mvs(72),
                          borderRadius: mvs(5),
                          height: mvs(21),
                          backgroundColor: `${colors.primary}30`,
                        }}
                      />
                    </Row>
                  </ShimmerPlaceholder>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
export default ServiceOffering;
