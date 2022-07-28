import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {mvs, width} from '../../../services/metrices';
import Row from './../../atoms/row';
import colors from './../../../services/colors';
import ImagePlaceholder from './../../atoms/Placeholder';
import SemiBold from './../../../presentation/typography/semibold-text';
import RatingStar from './../rating-star/index';
import Regular from './../../../presentation/typography/regular-text';
import {Bg} from '../../../assets/images';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ReviewsRaing = ({bg = '#ffedce', picsArray, data, loading}) => {
  return (
    <View style={{marginTop: mvs(30)}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: mvs(18)}}>
        {data?.map((ele, index) => (
          <View
            key={index}
            style={{
              paddingHorizontal: mvs(12),
              marginRight: mvs(16),
              width: width - mvs(65),
              paddingVertical: mvs(16),
              backgroundColor: bg,
              borderRadius: mvs(5),
            }}>
            <Row justifyContent="flex-start" style={{}}>
              <ShimmerPlaceholder
                style={{height: mvs(33), width: mvs(33), borderRadius: mvs(17)}}
                visible={loading}>
                <ImagePlaceholder
                  containerStyle={{
                    height: mvs(33),
                    width: mvs(33),
                    borderRadius: mvs(17),
                  }}
                  uri={Bg}
                />
              </ShimmerPlaceholder>
              <View style={{marginLeft: mvs(10)}}>
                <ShimmerPlaceholder
                  style={{
                    height: mvs(33),
                    width: mvs(100),
                  }}
                  visible={loading}>
                  <SemiBold
                    size={mvs(14)}
                    color={colors.B1B1B1B}
                    label={'Garnet Bins '}
                  />
                  <RatingStar
                    fill={colors.B323232}
                    rate={ele[index]?.rate}
                    width={mvs(90)}
                  />
                </ShimmerPlaceholder>
              </View>
              <ShimmerPlaceholder
                style={{
                  //height: mvs(33),
                  width: mvs(100),
                  //borderWidth: 1,
                  alignSelf: 'center',
                  marginLeft: mvs(90),
                }}
                visible={loading}>
                <View style={{flex: 1}}>
                  <Regular
                    style={{
                      alignSelf: 'flex-end',
                      color: colors.black,
                      fontSize: mvs(12),
                    }}
                    label={'Yesterday 09:28'}
                  />
                </View>
              </ShimmerPlaceholder>
            </Row>
            <ShimmerPlaceholder
              style={{
                height: mvs(50),
                //paddingVertical: mvs(2),
                // /width: '90%',
                //borderWidth: 1,
                alignSelf: 'center',
                marginVertical: mvs(15),
              }}
              visible={loading}>
              <Regular
                style={{marginVertical: mvs(15), height: mvs(50)}}
                size={mvs(12)}
                numberOfLines={2}
                label={
                  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam.'
                }
              />
            </ShimmerPlaceholder>
            <Row justifyContent={'space-between'}>
              {picsArray?.map((ele, index) => (
                <View key={index} style={{height: mvs(52), width: mvs(52)}}>
                  <ShimmerPlaceholder
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: mvs(16),
                    }}
                    visible={loading}>
                    <ImagePlaceholder
                      containerStyle={{
                        height: '100%',
                        width: '100%',
                        borderRadius: mvs(16),
                      }}
                      uri={ele}
                    />
                  </ShimmerPlaceholder>
                </View>
              ))}
            </Row>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default ReviewsRaing;
