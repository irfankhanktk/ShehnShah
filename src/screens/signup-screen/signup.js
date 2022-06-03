import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import Buttons from '../../components/atoms/Button';
import DualText from '../../components/atoms/dual-text/dual-text';
import { DIVIY_INPUT_FIELD } from '../../components/atoms/Input';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import SERVICES from '../../services/common-services';
import { mvs } from '../../services/metrices';
import validation from '../../services/validation';
import DIVIY_API from '../../store/api-calls';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import Regular from '../../presentation/typography/regular-text';
import { Signup_Styles as styles } from './signup-styles';
import CustomRadio from './../../components/atoms/RadioButton';
import ThemeContext from './../../context/theme-context';

const Signup = (props) => {
  const { showAlert } = React.useContext(ThemeContext);
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [loadingRegister, setLoadingRegister] = React.useState(false);
  const onChangePayload = (state, actions) => {
    switch (actions.type) {
      case 'image':
        return { ...state, image: actions.payload };
      case 'first_name':
        return { ...state, first_name: actions.payload };
      case 'last_name':
        return { ...state, last_name: actions.payload };
      case 'email':
        return { ...state, email: actions.payload };
      case 'phone':
        return { ...state, phone: actions.payload };
      case 'password':
        return { ...state, password: actions.payload };
      case 'role':
        return { ...state, isProvider: actions.payload };
      default:
        return state;
    }
  };
  const { colors } = useTheme();
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [otp, setOpt] = React.useState({
    received: '',
    input_otp: '',
  });
  const [isOtpModal, setIsOtpModal] = React.useState(false);
  const [state, setState] = React.useReducer(onChangePayload, {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    image: '',
    isProvider: false,
  });

  const renderPersonalInfo = () => {
    return (
      <>
        <DIVIY_INPUT_FIELD.InputSecondary
          value={state.first_name}
          onChangeText={t => setState({ type: 'first_name', payload: t })}
          label="First Name*"
          placeholder="First Name"
        />
        <DIVIY_INPUT_FIELD.InputSecondary
          value={state.last_name}
          onChangeText={t => setState({ type: 'last_name', payload: t })}
          label="Last Name*"
          placeholder="Last Name"
        />
        <DIVIY_INPUT_FIELD.InputSecondary
          keyboardType="email-address"
          value={state.email}
          onChangeText={t => setState({ type: 'email', payload: t })}
          label="Email*"
          placeholder="Email"
        />
        <DIVIY_INPUT_FIELD.InputSecondary
          value={state.phone}
          keyboardType="numeric"
          onChangeText={t => setState({ type: 'phone', payload: t })}
          label="Phone*"
          placeholder="Phone"
        />
        <DIVIY_INPUT_FIELD.InputSecondary
          value={state.password}
          secureTextEntry
          onChangeText={t => setState({ type: 'password', payload: t })}
          label="Password*"
          placeholder="password"
        />
        <DIVIY_INPUT_FIELD.InputSecondary
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          label="Re-Type Password*"
          placeholder="confirmPassword"
        />
      </>
    );
  };

  const onRegister = async () => {
    try {

      if ((otp.input_otp != otp.received)) {
        showAlert('error', 'Otp did not match');
        return;
      }
      setLoadingRegister(true);
      await props?.register(state);
      await props?.signin({ email: state?.email, password: state?.password });
      navigation.pop();
      navigation.replace('Drawer');
      showAlert('success', 'Successfully created account');
    } catch (error) {
      showAlert('error', error);
    } finally {
      setLoadingRegister(false);
    }
  };
  const getOtpCode = async () => {
    try {
      const resp = validation.signupValidation({ ...state, confirmPassword });
      if (!resp.status) {
        showAlert('error', resp.message);
        return;
      }
      setLoading(true);
      const res = await props?.getOtp({ email: state?.email });
      showAlert('success', 'Otp is sent to your email Successfully');
      setOpt({ ...otp, received: res?.otp })
      console.log('res of otp::', res);
      setTimeout(() => {
        setIsOtpModal(true);
      }, 1000);

    } catch (error) {
      showAlert('error', error);
    } finally {
      setLoading(false);
    }
  };
  const onCamera = async () => {
    try {
      const res = await SERVICES._returnImageCamera();
      setState({
        type: 'image',
        payload: res,
      });
    } catch (error) {
      console.log('error:', error);

      showAlert('error', error);
    }
    //    console.log('res:',res?.assets);
  };
  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <CustomHeader
        colors={colors}
        loading={loading}
        title="Sign-Up"
        allowBackBtn
      />
      <View style={styles.body}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: mvs(22),
            paddingTop: mvs(30),
          }}>
          <View
            style={{
              width: mvs(100),
              height: mvs(100),
              marginBottom: mvs(30),
              borderRadius: mvs(50),
              alignSelf: 'center',
              backgroundColor: colors.white,
              ...colors.shadow,
            }}>
            {state?.image !== '' && (
              <ImagePlaceholder
                uri={state?.image?.uri}
                containerStyle={{
                  width: mvs(100),
                  height: mvs(100),
                  marginBottom: mvs(30),
                  borderRadius: mvs(50),
                  alignSelf: 'center',
                }}
              />
            )}
            <AntDesign
              onPress={onCamera}
              name="camera"
              size={mvs(30)}
              color={colors.border}
              style={{ position: 'absolute', alignSelf: 'flex-end' }}
            />
          </View>
          {renderPersonalInfo()}
          <DIVIY_INPUT_FIELD.ReviewInput containerStyle={{minHeight:null,backgroundColor:colors.background,...colors.shadow}} label={'Select your Role'}>
            <CustomRadio style={{marginTop:mvs(10)}} status={state.isProvider} onChange={() => setState({ type: 'role', payload: true })} label={'Provider'} />
            <CustomRadio style={{marginTop:mvs(10)}} status={!state.isProvider} onChange={() => setState({ type: 'role', payload: false })} label={'Customer'} />
          </DIVIY_INPUT_FIELD.ReviewInput>
          <Buttons.ButtonPrimary
            loading={loading}
            disabled={loading}
            onClick={getOtpCode}
            style={{ marginTop: mvs(30) }}
            title={'Sigup'}
          />
          <DualText
            onPress={() => navigation.goBack()}
            style={styles.register}
            content={`Already have an account, `}
            highlightText={'Sigin'}
          />
          <ReactNativeModal

            isVisible={isOtpModal}

            //  swipeDirection={'down'}
            onBackdropPress={() => {
              //  if(!loadingRegister){
              //    setIsOtpModal(false);
              //  }
            }}
            style={{ margin: 0 }}
          >
            <View style={{ backgroundColor: '#fff', alignSelf: 'center', padding: mvs(20), borderRadius: mvs(20) }}>
              <DIVIY_INPUT_FIELD.CustomOtpInput value={otp.input_otp} setValue={(t) => setOpt({ ...otp, input_otp: t })} />
              <View style={{ paddingTop: mvs(10) }}>
                <Regular label={'Otp code is sent to your email'} style={{ alignSelf: 'center', marginBottom: mvs(10) }} />
                <Regular label={state?.email} style={{ alignSelf: 'center', marginBottom: mvs(10), color: colors.primary }} />
                <Buttons.ButtonPrimary loading={loadingRegister} disabled={loadingRegister} onClick={onRegister} title={'Verify Email'} />
              </View>
            </View>
          </ReactNativeModal>
        </ScrollView>
      </View>

    </View>
  );
};
const mapStateToProps = (store) => ({
  // home_posts: store.state.home_posts,
});

const mapDispatchToProps = {
  register: (payload) => DIVIY_API.register(payload),
  signin: (payload) => DIVIY_API.signin(payload),
  getOtp: (payload) => DIVIY_API.getOtp(payload),

};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
