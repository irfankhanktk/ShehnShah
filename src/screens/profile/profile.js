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
import {CustomHeader} from '../../components/molecules/header/header-1x';
import styles from './profile.styles';
import colors from '../../services/colors';
import Buttons from '../../components/atoms/Button';
import DisplayText from '../../components/atoms/displayText';
import {mvs} from '../../services/metrices';
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
      <CustomHeader
        style={{width: '100%'}}
        title="Profile"
        // allowBackBtn={true}
        colors={colors}
        spacebetween
      />
      <View style={{flex: 1, flexGrow: 1, width: '100%'}}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: mvs(10),
          }}>
          <Image source={User} style={styles.image} />
          <DisplayText
            containerStyle={{marginTop: mvs(30)}}
            label={'waqasahmed552322@gmail.com'}
          />
          <DisplayText
            containerStyle={{marginTop: mvs(20)}}
            label={'WAQAS AHMED '}
          />
          <DisplayText
            containerStyle={{marginTop: mvs(20)}}
            label={'0344*********'}
          />
          <DisplayText
            containerStyle={{marginTop: mvs(20)}}
            label={'Customers'}
          />
          <View style={styles.termsAndConditionContainer}>
            <Text style={styles.termsHeadingText}>Terms And Condition</Text>
            <Text style={styles.termsAndConditionLiteText}>
              Because of GDPR regulations, developers and publishers need to
              make more clear the acceptance of the terms and conditions and
              privacy policy. I was looking around for a component that allows
              me to make the user read the terms and conditions first and then
              enable the call to action button but couldn’t find one, so I
              decided to create one quickly.
            </Text>
          </View>
          <View
            style={{
              ...styles.termsAndConditionContainer,
              paddingTop: mvs(5),
            }}>
            <Text style={styles.termsHeadingText}>Privacy Policy Policy </Text>
            <Text style={styles.termsAndConditionLiteText}>
              At React Native App, accessible from
              http://www.reactnative-themes.com, one of our main priorities is
              the privacy of our visitors. This Privacy Policy document contains
              types of information that is collected and recorded by React
              Native App and how we use it. If you have additional questions or
              require more information about our Privacy Policy, do not hesitate
              to contact us through email at reactnativeapp4u@gmail.com
            </Text>
          </View>
          <Buttons.ButtonPrimary
            // disabled={loading}
            // loading={loading}
            onClick={() => logout()}
            style={{...styles.button}}
            title={'Sign Out'}
          />
        </ScrollView>
      </View>
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
