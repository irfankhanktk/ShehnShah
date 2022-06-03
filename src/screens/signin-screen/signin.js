import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {Login} from '../../assets/common-icons';
import Buttons from '../../components/atoms/Button';
import DualText from '../../components/atoms/dual-text/dual-text';
import {DIVIY_INPUT_FIELD} from '../../components/atoms/Input';
import {mvs} from '../../services/metrices';
import validation from '../../services/validation';
import DIVIY_API from '../../store/api-calls';
import {Signin_Styles as styles} from './signin-styles';
import CustomRadio from '../../components/atoms/RadioButton';
import ThemeContext from './../../context/theme-context';

const Signin = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const {showAlert} = React.useContext(ThemeContext);

  const [payload, setPayload] = React.useState({
    email: '',
    password: '',
  });
  const {colors} = useTheme();

  const onSigin = async () => {
    try {
      // const res = validation.signinValidation(payload);
      // if (!res.status) {
      //   showAlert('error', res.message);
      //   return;
      // }
      setLoading(true);
      // await props?.signin(payload);
      // navigation.replace('ProviderRequest');
      navigation.replace('Drawer');
    } catch (error) {
      showAlert('error', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      <ScrollView>
        <View style={styles.body}>
          <View style={{alignItems: 'center'}}>
            <Login height={mvs(150)} width={mvs(300)} />
          </View>
          <View style={styles.input_container}>
            <DIVIY_INPUT_FIELD.InputSecondary
              value={payload.email}
              onChangeText={t => setPayload({...payload, email: t})}
              label="Email"
              placeholder="Email"
            />
            <DIVIY_INPUT_FIELD.InputSecondary
              secureTextEntry
              value={payload.password}
              onChangeText={t => setPayload({...payload, password: t})}
              label="Password"
              placeholder="Password"
            />
          </View>

          <Buttons.ButtonPrimary
            disabled={loading}
            loading={loading}
            onClick={onSigin}
            style={{...styles.button}}
            title={'Sigin'}
          />
          <DualText
            onPress={() => navigation.navigate('Signup')}
            style={styles.register}
            content={`Don't have an account, `}
            highlightText={'Register'}
          />
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
