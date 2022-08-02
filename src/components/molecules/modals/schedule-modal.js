import moment from 'moment';
import React from 'react';
import {StyleSheet, TouchableOpacity, ScrollView, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {
  LeftBlackArrow,
  RightBlackArrow,
  SelectedCard,
  UnSelectedCard,
} from '../../../assets/common-icons';
import {mvs, width} from '../../../services/metrices';
import Buttons from '../../atoms/Button';
import Bold from './../../../presentation/typography/bold-text';
import colors from './../../../services/colors';
import Row from './../../atoms/row';
const ScheduleModal = ({
  date,
  setDate = arg => {},
  value,
  setValue,
  visible,
  setVisible = bool => {},
  items = [],
  setItems = items => {},
}) => {
  return (
    <ReactNativeModal
      propagateSwipe
      isVisible={visible}
      // onBackdropPress={setVisible}
      onSwipeComplete={setVisible}
      swipeDirection="down"
      style={{margin: 0}}>
      <View style={styles.container}>
        <Row style={{width: '100%'}} alignItems={'center'}>
          <TouchableOpacity
            style={{padding: 20}}
            onPress={() => setDate(moment(date).subtract(1, 'd'))}>
            <LeftBlackArrow />
          </TouchableOpacity>
          <Bold size={mvs(16)} label={date?.format('DD MMMM YYYY')} />
          <TouchableOpacity
            style={{padding: 20}}
            onPress={() => setDate(moment(date).add(1, 'd'))}>
            <RightBlackArrow />
          </TouchableOpacity>
        </Row>

        {items.map((item, index) => (
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => {
              setValue(item);
              // setVisible(false);
            }}>
            <Row style={{...styles.PAYMENTDROPDOWN}}>
              <Bold
                size={15}
                style={{flex: 1, marginHorizontal: mvs(8)}}
                label={item}
              />
              <View>
                {item === value ? <SelectedCard /> : <UnSelectedCard />}
              </View>
            </Row>
          </TouchableOpacity>
        ))}

        <Buttons.ButtonPrimary
          onClick={() => setVisible(false)}
          style={{marginVertical: mvs(30)}}
          title={'Continue'}
        />
      </View>
    </ReactNativeModal>
  );
};
export default ScheduleModal;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(15),
    borderTopRightRadius: mvs(15),
    padding: 10,
    //alignItems: 'center',
    alignSelf: 'center',
  },
  priceView: {
    marginLeft: mvs(20),
  },
  PAYMENTDROPDOWN: {
    justifyContent: 'space-between',
    height: mvs(50),
    alignItems: 'center',
    borderRadius: 10,
    top: mvs(8),
    borderBottomWidth: 0.7,
    borderColor: colors.gray,
    paddingHorizontal: mvs(11),
  },
});
