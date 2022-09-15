import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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
  checkprice,
  loading,
  moveTo = 'ServiceOfferingDetails',
}) => {
  const navigation = useNavigation();
  console.log("Offerings")
  console.log(data)
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
                    width: mvs(250),
                    marginRight: mvs(7),
                    borderTopRightRadius: mvs(8),
                    borderRadius: mvs(8),
                    overflow: 'hidden',
                    // /height: '100%',
                    // height: mvs(350),
                    
                  }}>
                  <ShimmerPlaceholder
                    style={{height: mvs(120), width: '100%'}}
                    visible={loading}>
                    <ImagePlaceholder
                      containerStyle={{height: mvs(120), width: '100%'}}
                      uri={{uri: ele?.cover}}
                    />
                  </ShimmerPlaceholder>
                  <View
                    style={{padding: mvs(5), backgroundColor: colors.white,...colors.shadow}}>
                    <ShimmerPlaceholder
                      style={{
                        height: mvs(24),
                        width: mvs(220),
                      }}
                      visible={loading}>
                      <Bold
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
                    {/* <Regular size={mvs(12)} color={colors.primary} label={'Business Name'} /> */}
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
                            label={' '+ele?.discount?.highlight}
                          />
                        </Row>)}
                        <View
                          style={{
                            width: mvs(70),
                            position: 'absolute',
                            right: 10,
                          }}>
                          <Buttons.ButtonPrimary
                            title={ele.price ? 'AED ' + ele.price : 'AED ' + 0}
                            textStyle={ele?.discount?
                            {
                              fontSize: mvs(12),
                              color: colors.primary,
                              textDecorationLine: 'line-through', 
                              textDecorationStyle: 'solid',

                            }:
                            {fontSize: mvs(12),color: colors.primary}
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
                          {ele?.newPrice && (<Buttons.ButtonPrimary
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
                          />)}
                        </View>
                      </Row>
                      {ele?.discount?.view && (
                        <Regular label={ele?.discount?.view?.statusLine?.shortLine}
                         color={colors.black} numberOfLines={2}
                         size={12}
                         style={{marginTop:mvs(20),zIndex:1,textAlign:'center'}}/>
                      )}
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
