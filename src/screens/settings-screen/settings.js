import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import Regular from '../../presentation/typography/regular-text';
import {mvs} from '../../services/metrices';
export const Settings = props => {
  const {colors} = useTheme();

  return (
    <View style={[styles.CONTAINER, {backgroundColor: colors.background}]}>
      <CustomHeader spacebetween title="Settings" colors={colors} />
      <View style={styles.BODY}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.SCROLL}>
          <TouchableOpacity
            onPress={() => props?.navigation?.navigate('PersonalInfo')}
            style={{...styles.LIST_LABEL, borderColor: colors.border}}>
            <Regular
              label={'Personal account info'}
              style={{color: colors.text}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props?.navigation?.navigate('ChangePassword')}
            style={{...styles.LIST_LABEL, borderColor: colors.border}}>
            <Regular label={'Change Password'} style={{color: colors.text}} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  CONTAINER: {
    flex: 1,
  },
  BODY: {
    flex: 1,
  },
  SCROLL: {
    // paddingTop: mvs(28),
    paddingHorizontal: mvs(22),
    paddingBottom: mvs(10),
  },
  LIST_LABEL: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: mvs(15),
  },
});
