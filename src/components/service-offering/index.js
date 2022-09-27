import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Discount, LeftBlackArrow, Percent} from '../../assets/common-icons';
import {Bg} from '../../assets/images';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Buttons from '../atoms/Button';
import ImagePlaceholder from '../atoms/Placeholder';
import Row from '../atoms/row';
import {Avatar} from 'react-native-elements';
import Bold from './../../presentation/typography/bold-text';

import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ServiceOffering = ({
  data,
  checkprice,
  loading,
  isCouponOffering = false,
  moveTo = 'ServiceOfferingDetails',
}) => {
  const navigation = useNavigation();
  console.log('Offerings');
  console.log(data);
  return (
    <View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: mvs(18),
          }}>
          {data?.length > 0 &&
            data?.map((ele, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(moveTo, {id: ele?.id})}>
                <View
                  style={{
                    width: mvs(350),
                    height: mvs(270),
                    marginRight: mvs(7),
                    borderTopRightRadius: mvs(8),
                    borderRadius: mvs(8),
                    // borderWidth: 1,
                    overflow: 'hidden',

                    // /height: '100%',
                    // height: mvs(350),
                  }}>
                  <ShimmerPlaceholder
                    contentStyle={{
                      height: mvs(150),
                      width: '100%',
                    }}
                    visible={loading}>
                    <ImagePlaceholder
                      containerStyle={{
                        height: mvs(150),
                        width: '100%',
                        borderBottomWidth: 1,
                      }}
                      uri={{uri: ele?.cover}}
                    />
                    <View style={styles.roundedView}>
                      <Avatar
                        size={25}
                        rounded
                        source={{uri: ele?.service?.icon}}
                        key={ele?.service?.id}
                      />
                    </View>
                    <View style={styles.discountImgView}>
                      <Discount width={30} height={30} />
                      <Regular
                        size={mvs(12)}
                        color={colors.black}
                        numberOfLines={2}
                        label={ele?.discount?.highlight}
                      />
                    </View>
                  </ShimmerPlaceholder>
                  <View
                    style={{
                      padding: mvs(5),
                      backgroundColor: colors.white,
                      ...colors.shadow,
                    }}>
                    <View style={styles.rowItem}>
                      <View>
                        <ShimmerPlaceholder
                          style={{
                            height: mvs(24),
                            width: mvs(220),
                          }}
                          visible={loading}>
                          <Bold
                            size={18}
                            color={colors.black}
                            numberOfLines={2}
                            label={ele?.title}
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
                            label={ele?.subTitle}
                          />
                        </ShimmerPlaceholder>
                      </View>
                      {ele?.discount && (
                        <View style={styles.rowItem}>
                          <Regular
                            textDecoration={'line-through'}
                            size={mvs(10)}
                            color={colors.B2E3036}
                            label={'AED'}
                          />
                          <Bold
                            textDecoration={'line-through'}
                            size={mvs(20)}
                            color={colors.B2E3036}
                            label={' ' + ele?.price}
                          />

                          {ele?.discount?.rate && (
                            <Regular
                              size={mvs(12)}
                              color={colors.B2E3036}
                              label={' ' + ele?.discount?.rate + '% Off'}
                            />
                          )}
                        </View>
                      )}
                    </View>
                    {/* <Regular size={mvs(12)} color={colors.primary} label={'Business Name'} /> */}
                    {!isCouponOffering && (
                      <ShimmerPlaceholder
                        style={{
                          height: mvs(100),
                          marginTop: mvs(10),
                          width: mvs(240),
                        }}
                        visible={loading}>
                        <Row style={{marginTop: mvs(10)}}>
                          {ele?.discount?.highlight && (
                            <Row justifyContent="flex-start">
                              <Percent />
                              <Regular
                                size={mvs(12)}
                                color={colors.B2E3036}
                                label={' ' + ele?.discount?.highlight}
                              />
                            </Row>
                          )}
                          <View
                            style={{
                              width: mvs(70),
                              position: 'absolute',
                              right: 10,
                            }}>
                            <Buttons.ButtonPrimary
                              title={
                                ele.price ? 'AED ' + ele.price : 'AED ' + 0
                              }
                              textStyle={
                                ele?.discount
                                  ? {
                                      fontSize: mvs(12),
                                      color: colors.primary,
                                      textDecorationLine: 'line-through',
                                      textDecorationStyle: 'solid',
                                    }
                                  : {fontSize: mvs(12), color: colors.primary}
                              }
                              style={{
                                width: mvs(72),
                                borderRadius: mvs(5),
                                //  marginBottom: 20,
                                height: mvs(21),
                                backgroundColor: `${colors.primary}30`,
                              }}
                            />

                            <View
                              style={{
                                width: '10%',
                                backgroundColor: '#fff',
                                height: '10%',
                              }}></View>
                            {ele?.newPrice && (
                              <Buttons.ButtonPrimary
                                title={'AED ' + ele.newPrice}
                                textStyle={{
                                  fontSize: mvs(12),
                                  color: colors.primary,
                                }}
                                style={{
                                  width: mvs(72),
                                  borderRadius: mvs(5),
                                  // marginBottom: 20,
                                  height: mvs(21),
                                  backgroundColor: `${colors.primary}30`,
                                }}
                              />
                            )}
                          </View>
                        </Row>
                        {ele?.discount?.view && (
                          <Regular
                            label={ele?.discount?.view?.statusLine?.shortLine}
                            color={colors.black}
                            numberOfLines={2}
                            size={12}
                            style={{
                              marginTop: mvs(20),
                              zIndex: 1,
                              textAlign: 'center',
                            }}
                          />
                        )}
                      </ShimmerPlaceholder>
                    )}
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

const styles = StyleSheet.create({
  roundedView: {
    backgroundColor: 'red',
    top: '5%',
    right: mvs(5),
    width: mvs(35),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edeff2',
    height: mvs(35),
    borderRadius: mvs(20),
    position: 'absolute',
  },
  discountImgView: {
    width: mvs(140),
    //padding: mvs(5),
    height: mvs(35),
    borderRadius: mvs(5),
    backgroundColor: 'rgba(0,0,0,.3)',
    position: 'absolute',
    top: '70%',
    // left: mvs(230),
    right: mvs(15),
    bottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    // opacity: 0.8,
    backgroundColor: '#edeff2',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
