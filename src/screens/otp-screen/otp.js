//import liraries
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View, Text, StatusBar, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import Regular from '../../presentation/typography/regular-text';
import { mvs } from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import { useNavigation, CommonActions, useTheme } from '@react-navigation/native';
import styles from './otp-styles';
import moment from 'moment';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import colors from './../../services/colors';
import Bold from '../../presentation/typography/bold-text';
import { INPUT_FIELD } from './../../components/atoms/Input';
import { Active } from '../../assets/tabbar-icons';
import Buttons from '../../components/atoms/Button';
const Otp = props => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState('');
  const [isMatch, setIsMatch] = React.useState(true);

  const {
  } = props;


  return (
    <View style={{ ...styles.conntainer, backgroundColor: colors.white }}>
      <CustomHeader colors={colors} title='' allowBackBtn />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(22) }}>
          <Bold size={mvs(24)} style={{ textAlign: 'center', marginTop: mvs(108) }} label={'Enter Verification Code'} />
          <Regular size={mvs(18)} lineHeight={mvs(26)} numberOfLines={2} style={{ textAlign: 'center', }} label={`Enter verification code. We've sent you the PIN at +1  (201) 555-0123`} />
          <INPUT_FIELD.CustomOtpInput isMatch={isMatch} value={value} setValue={setValue} />
          {isMatch ? <View style={{ alignItems: 'center', marginTop: mvs(30), marginBottom: mvs(18) }}>
            <Active />
            <Regular size={mvs(14)} color={colors.B363F4D} label={'Code’ll be active for another 40 seconds'} style={{ textAlign: 'center', marginTop: mvs(4), }} />
          </View> :
            <Regular size={mvs(14)} color={colors.FF0000} label={'Passcode Incorrect'} style={{ textAlign: 'center', marginTop: mvs(45),marginBottom: mvs(28)  }} />}
          <Buttons.ButtonPrimary style={{}} title='Continue' />
        </ScrollView>
      </View>
    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Otp);
