import React from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
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
import HumanizeDuration from 'humanize-duration';
import moment from 'moment';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ReviewsRaing = ({bg = '#ffedce', picsArray, data, loading}) => {
  console.log("Reviews are ")
  console.log(data)
  return (
    <View style={{marginTop: mvs(30)}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: mvs(18)}}>
        {data?.length > 0 &&
          data?.map((ele, index) => (
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
              <Row justifyContent="flex-start" alignItems='center'>
                <ShimmerPlaceholder
                  style={{
                    height: mvs(50),
                    width: mvs(33),
                    borderRadius: mvs(17),
                  }}
                  visible={loading}>
                  <ImagePlaceholder
                    containerStyle={{
                      height: mvs(33),
                      width: mvs(33),
                      borderRadius: mvs(17),
                    }}
                    uri={{uri:ele?.customer?.image}}
                  />
                </ShimmerPlaceholder>
                <View style={{marginLeft: mvs(10),flex:1,}}>
                  <ShimmerPlaceholder
                    style={{
                      height: mvs(50),
                      flex:1,
                    }}
                    visible={loading}>
                    <SemiBold
                      size={mvs(14)}
                      color={colors.B1B1B1B}
                      label={ele?.customer?.name}
                    />
                    <RatingStar
                      fill={colors.B323232}
                      rate={ele?.rate}
                      width={mvs(90)}
                      tintColor={'#ffedce'}
                    />
                  </ShimmerPlaceholder>
                </View>
                <ShimmerPlaceholder
                  visible={loading}>
                  <View style={{flex: 1,marginRight:mvs(10)}}>
                    <Regular
                      style={{
                        alignSelf: 'flex-end',
                        color: colors.black,
                        fontSize: mvs(12),
                      }}
                      label={moment(ele?.date).fromNow()}
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
                  label={ele[index]?.remark}
                />
              </ShimmerPlaceholder>
              
                {ele?.pics?.length > 0 &&(
                <FlatList
                  contentContainerStyle={{}}
                   horizontal
                   data={ele?.pics}
                   renderItem={
                  ({item, index, }) =>
                   <View key={index} style={{height: mvs(52), width: mvs(52),marginHorizontal:mvs(10)}}>
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
                      uri={{uri:item}}
                    />
                  </ShimmerPlaceholder>
                </View>
                }
                   keyExtractor={item => item.id}
                 />
                )}
             
            </View>
          ))}
      </ScrollView>
    </View>
  );
};
export default ReviewsRaing;
