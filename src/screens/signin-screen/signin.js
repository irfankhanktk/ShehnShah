import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {SLogo,Facebook,Apple,Google} from '../../assets/common-icons';
import Buttons from '../../components/atoms/Button';
import {DIVIY_INPUT_FIELD} from '../../components/atoms/Input';
import DIVIY_API from '../../store/api-calls';
import {Signin_Styles as styles} from './signin-styles';
import CustomRadio from '../../components/atoms/RadioButton';
import ThemeContext from './../../context/theme-context';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import Light from '../../presentation/typography/light-text';
import allColors  from '../../services/colors';
import { mvs } from '../../services/metrices';
const Signin = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('login');
  const [isSignUpWithPhone, setPhoneSignUp] = React.useState(false);
  const {showAlert} = React.useContext(ThemeContext);

  const [payload, setPayload] = React.useState({
    email: '',
    password: '',
    name:'',
    confirmPassword:''
  });
  const {colors} = useTheme();

  const onSigin = async () => {
      setSelectedTab("login")
   };
  const onSigUp = async () => {
    setSelectedTab("signup")
    setPhoneSignUp(false)
  };
  const onSigUpWithPhone = async () => {
    setPhoneSignUp(true)
  };
  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <ScrollView>
        <View style={styles.body}>
          <View style={{alignItems: 'center'}}>
            <SLogo  />
          </View>
          <View style={styles.tabView}>
            <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={onSigin}
              style={selectedTab=="login"?styles.selectedTabButton:styles.unSelectedTabButton}
              textStyle={selectedTab=="login"?styles.selectedTabButtonText:styles.unSelectedTabButtonText}
              title={'Log in'}
            />
            <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={onSigUp}
              style={selectedTab=="signup"?styles.selectedTabButton:styles.unSelectedTabButton}
              textStyle={selectedTab=="signup"?styles.selectedTabButtonText:styles.unSelectedTabButtonText}
              title={'Register '}
            />
          </View>
          {selectedTab=="login"?
          <>
          <Bold label={"Welcome Back!"} style={styles.welcomeText}/>
          <Regular label={"Please enter your email and password"} style={styles.welcomeSubText}/>
          <Regular label={"to contiue"} style={styles.welcomeSubText}/>
          <View style={styles.input_container}>
            <DIVIY_INPUT_FIELD.InputSecondary
              value={payload.email}
              onChangeText={t => setPayload({...payload, email: t})}
              label="EMAIL"
              placeholder="lehieuds@gmail.com"
              
            />
            <DIVIY_INPUT_FIELD.InputSecondary
              secureTextEntry
              value={payload.password}
              onChangeText={t => setPayload({...payload, password: t})}
              label="PASSWORD"
              placeholder="Password"
            />
          </View>
          <Bold label={"Forgot Password?"} style={styles.forgotText}/>
          <Buttons.ButtonPrimary
            disabled={loading}
            loading={loading}
            onClick={onSigin}
            textStyle={styles.buttonText}
            style={{...styles.button}}
            title={'Login'}
          />
          <Regular label={"Continue With"} style={styles.continueWithText}/>
          <View style={styles.socialIconView}>
              <Google/>
              <Regular label={"Sign in with Google"} style={styles.socialIconText}/>
          </View>
          <View style={styles.socialIconView}>
              <Facebook/>
              <Regular label={"Sign in with Facebook"} style={styles.socialIconText}/>
          </View>
          <View style={styles.socialIconView}>
              <Apple/>
              <Regular label={"Sign in with Facebook"} style={styles.socialIconText}/>
          </View>
          </>:selectedTab=="signup" && isSignUpWithPhone==false?
          <>
          <Bold label={"Create Your Account"} style={styles.welcomeText}/>
          <Regular label={"Enter your full name and email address to"} style={styles.welcomeSubText}/>
          <Regular label={"create your account"} style={styles.welcomeSubText}/>
          
          <View style={styles.input_container}>

          <DIVIY_INPUT_FIELD.InputSecondary
              value={payload.name}
              onChangeText={t => setPayload({...payload, name: t})}
              label="FULL NAME"
              placeholder="John Doe"
              
            />

            <DIVIY_INPUT_FIELD.InputSecondary
              value={payload.email}
              onChangeText={t => setPayload({...payload, email: t})}
              label="EMAIL"
              placeholder="lehieuds@gmail.com"
              
            />
            <DIVIY_INPUT_FIELD.InputSecondary
              secureTextEntry
              value={payload.password}
              onChangeText={t => setPayload({...payload, password: t})}
              label="PASSWORD"
              placeholder="Password"
            />

            <DIVIY_INPUT_FIELD.InputSecondary
              secureTextEntry
              value={payload.confirmPassword}
              onChangeText={t => setPayload({...payload, confirmPassword: t})}
              label="CONFIRM PASSWORD"
              placeholder="Confirm Password"
            />
          </View>
          <Buttons.ButtonPrimary
            disabled={loading}
            loading={loading}
            onClick={onSigin}
            textStyle={{...styles.buttonText,color:colors.white}}
            style={{...styles.button}}
            title={'Continue'}
          />
          <Buttons.ButtonPrimary
            disabled={loading}
            loading={loading}
            onClick={onSigUpWithPhone}
            textStyle={styles.buttonText}
            style={{...styles.button,backgroundColor:colors.white,borderWidth:1.4,borderColor:allColors.primary}}
            title={'Sign up with Phone Number'}
          />

          </>:isSignUpWithPhone==true?
           <>
            <Bold label={"Create Your Account"} style={styles.welcomeText}/>
            <Regular label={"Enter your phone number and we’ll send"} style={styles.welcomeSubText}/>
            <Regular label={"you a four-digit code in SMS."} style={styles.welcomeSubText}/>
            <View style={{...styles.input_container,marginTop:mvs(50)}}>
              <DIVIY_INPUT_FIELD.InputSecondary
                  value={payload.name}
                  keyboardType={'name-phone-pad'}
                  onChangeText={t => setPayload({...payload, name: t})}
                  label="PHONE NUMBER"
                  placeholder="+1 (201) 555-0123"/>
             </View>
              <Buttons.ButtonPrimary
                disabled={loading}
                loading={loading}
                onClick={()=>navigation.navigate("Otp")}
                textStyle={{...styles.buttonText,color:colors.white}}
                style={{...styles.button}}
                title={'Continue'}
              />
              <Buttons.ButtonPrimary
                disabled={loading}
                loading={loading}
                onClick={onSigUpWithPhone}
                textStyle={styles.buttonText}
                style={{...styles.button,backgroundColor:colors.white,borderWidth:1.4,borderColor:allColors.primary}}
                title={'Sign up with Email Address'}
              />
              <Regular label={"Continue With"} style={styles.continueWithText}/>
                <View style={styles.socialIconView}>
                    <Google/>
                    <Regular label={"Sign in with Google"} style={styles.socialIconText}/>
                </View>
                <View style={styles.socialIconView}>
                    <Facebook/>
                    <Regular label={"Sign in with Facebook"} style={styles.socialIconText}/>
                </View>
                <View style={styles.socialIconView}>
                    <Apple/>
                    <Regular label={"Sign in with Facebook"} style={styles.socialIconText}/>
                </View>
          </>:null
           
          }
        </View>

      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  // home_posts: store.state.home_posts,
});

const mapDispatchToProps = {
  signin: payload => DIVIY_API.signin(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
