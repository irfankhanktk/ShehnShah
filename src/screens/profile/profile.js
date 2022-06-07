//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation, CommonActions, useTheme} from '@react-navigation/native';
import User from '../../assets/images/user.png';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import styles from './profile.styles';
import colors from '../../services/colors';
import Buttons from '../../components/atoms/Button';
import DisplayText from '../../components/atoms/displayText';
import {mvs} from '../../services/metrices';
import Row from '../../components/atoms/row';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import { Edit } from '../../assets/common-icons';
import ProfileAction from '../../components/atoms/profile-action';
// create a component
const Profile = props => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const logout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'SelectRoute'}],
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <CustomHeader colors={colors} title='Profile'   spacebetween/>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(16) }}>
         
         <View style={styles.body}>
           <Row style={{justifyContent:'space-between',alignItems:'center'}}>
              <View style={styles.imageView}>
                <ImagePlaceholder isUser={true} style={styles.profileImage}/>
              </View>
              <View style={{flex:1,paddingLeft:mvs(10),justifyContent:'center'}}>
                <Bold label={"Victoria Cunningham"} style={styles.welcomeText}/>
                <Regular label={"mail@site.com"} style={styles.welcomeSubText}/>
              </View>
              <Edit/>
            </Row> 

            <View style={styles.input_container}>
               <ProfileAction label={"My Coupons"} leftIcon={"Coupon"} rightIcon={"Arrow"} subLabel={""} selected={true}/>
               <ProfileAction label={"Toyota Corolla"} leftIcon={"Vehicle"} rightIcon={"Arrow"} subLabel={"C19001-Sharjah"} selected={false}/>
               <ProfileAction label={"Notifications"} leftIcon={"Notification"} rightIcon={"Arrow"} subLabel={"Manage All notifications"} selected={false} style={{borderBottomLeftRadius:2,borderBottomRightRadius:2}}/>
               <ProfileAction label={"Push Notifications"} leftIcon={"Notification"} rightIcon={"Arrow"} subLabel={"Manage All notifications"} selected={false} style={{marginTop:mvs(0),borderTopLeftRadius:2,borderTopRightRadius:2}}/>
            
               <ProfileAction label={"Personal Details"} leftIcon={"Personal"} rightIcon={"Arrow"} subLabel={"Your name, number, email address"} selected={false} style={{borderBottomLeftRadius:2,borderBottomRightRadius:2}}/>
               <ProfileAction label={"Security & Privacy"} leftIcon={"Security"} rightIcon={"Arrow"} subLabel={"Passwords & other security settings"} selected={false} style={{borderRadius:2,marginTop:mvs(0)}}/>
               <ProfileAction label={"Terms & Conditions"} leftIcon={"Tcondition"} rightIcon={"Arrow"} subLabel={"Read all our terms and conditions"} selected={false} style={{borderRadius:2,marginTop:mvs(0)}}/>
               <ProfileAction label={"Support"} leftIcon={"PSupport"} rightIcon={"Arrow"} subLabel={"We will be happy to help"} selected={false} style={{marginTop:mvs(0),borderTopLeftRadius:2,borderTopRightRadius:2}}/>
               <ProfileAction label={"Logout"} leftIcon={"Logout"} rightIcon={""} subLabel={""} labelStyle={{marginTop:mvs(15)}} selected={false}/>
            </View>
          </View>
          
        </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = store => ({
  home_categories: store.state.home_categories,
  categories: store.state.categories,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchHomeCategories: () => DIVIY_API.fetchHomeCategories(),
  fetchSubCategories: parent_cat_id =>
    DIVIY_API.fetchSubCategories(parent_cat_id),
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
