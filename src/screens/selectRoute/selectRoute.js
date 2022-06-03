import React from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';
// import {Login} from '../../assets/common-icons';
import {mvs} from '../../services/metrices';
import styles from './selectRoute.styles';
 import Buttons from '../../components/atoms/Button';
import {useNavigation, useTheme} from '@react-navigation/native';
const SelectRoute = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.conntainer}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <View style={{alignItems: 'center', marginTop: mvs(80)}}>
        {/* <Login height={mvs(150)} width={mvs(300)} /> */}
      </View>

      <Buttons.ButtonPrimary
        // disabled={loading}
        // loading={loading}
        onClick={() => navigation.replace('Signin')}
        style={{...styles.button}}
        title={'Customer'}
      />
      <Buttons.ButtonPrimary
        // disabled={loading}
        // loading={loading}
        onClick={() => navigation.replace('Drawer',{isProvider:true})}
        style={{...styles.button, marginTop: mvs(10)}}
        title={'Provider'}
      />
    </SafeAreaView>
  );
};
export default SelectRoute;
