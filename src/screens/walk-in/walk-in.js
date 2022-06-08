import {
    useTheme
  } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity,ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Buttons from '../../components/atoms/Button';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Row from '../../components/atoms/row';
import TotalRateMap from '../../components/molecules/total-rate-map';
import Medium from '../../presentation/typography/medium-text';
import Bold from '../../presentation/typography/bold-text';
  // import HomeCard from './../../../components/molecules/home-card/home-card';
import Regular from '../../presentation/typography/regular-text';
import { mvs } from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import { Walk_In_Styles as styles } from './walk-in-styles';
import colors from '../../services/colors';
import { Bg } from '../../assets/images';
  const WalkIn = (props) => {
    return (
      <View style={{ ...styles.conntainer, backgroundColor: colors.background }}>
       <CustomHeader title='New Walk In Booking' titleStyle={{fontSize:15}} spacebetween allowBackBtn/>
       <View style={styles.body}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                    <View />
                    <Row style={{ paddingHorizontal: mvs(18) }}>
                        <ImagePlaceholder borderRadius={mvs(8)} uri={Bg} containerStyle={{ width: mvs(110), height: mvs(110) }} />
                        <View style={{ marginLeft: mvs(10), flex: 1 }}>
                            <Bold numberOfLines={2} size={mvs(16)} label={'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet'} />
                            <Row justifyContent='flex-start' alignItems='center'>
                                <Regular color={colors.B606060} label={'Lead Time:'} />
                                <Medium color={colors.G3CB971} label={' 45 Minutes'} />
                            </Row>
                            <Row style={{ marginTop: mvs(2) }} justifyContent='flex-start' alignItems='center'>
                                <Regular color={colors.B606060} label={'Price:'} />
                                <Medium color={colors.primary} label={' AED 45'} />
                            </Row>
                            <Row style={{}} alignItems='center'>
                                <Regular size={mvs(14)} color={colors.B606060} label={'Tag: '} />
                                <Buttons.ButtonPrimary title='4Litters' textStyle={{ fontSize: mvs(10), color: colors.G3CB971 }} style={{ backgroundColor: `${colors.G3CB971}70`, width: mvs(60), height: mvs(18), borderRadius: mvs(5), }} />
                                <Buttons.ButtonPrimary title='4Litters' textStyle={{ fontSize: mvs(10), color: colors.primary }} style={{ backgroundColor: `${colors.primary}70`, width: mvs(60), height: mvs(18), borderRadius: mvs(5), }} />
                                <Buttons.ButtonPrimary title='4Litters' textStyle={{ fontSize: mvs(10), color: colors.B2181F2 }} style={{ backgroundColor: `${colors.B2181F2}70`, width: mvs(60), height: mvs(18), borderRadius: mvs(5), }} />
                            </Row>
                        </View>
                    </Row>
                    <TotalRateMap />
                    
                </ScrollView>
            </View>
      </View>
    );
  };
  
  const mapStateToProps = (store) => ({
    home_categories: store.state.home_categories,
    categories: store.state.categories,
    user_info: store.state.user_info,
  });
  
  const mapDispatchToProps = {
    fetchHomeCategories: () =>
      DIVIY_API.fetchHomeCategories(),
    fetchSubCategories: (parent_cat_id) =>
      DIVIY_API.fetchSubCategories(parent_cat_id),
  };
  export default connect(mapStateToProps, mapDispatchToProps)(WalkIn);
  