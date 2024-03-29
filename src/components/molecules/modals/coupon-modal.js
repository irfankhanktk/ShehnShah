import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {SelectedCard, UnSelectedCard} from '../../../assets/common-icons';
import Bold from '../../../presentation/typography/bold-text';
import colors from '../../../services/colors';
import {mvs, width} from '../../../services/metrices';
import Row from '../../atoms/row';
import Coupon from '../coupon';
const CouponModal = ({
  title,
  value = 1,
  setValue = arg => {},
  visible,
  setVisible = bool => {},
  items = [1, 2, 3],
}) => {
  return (
    <ReactNativeModal
      propagateSwipe
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      swipeDirection="up"
      style={{margin: 0}}>
      <View style={styles.container}>
        <>
          <Bold label={`Select ${title}`} style={{marginVertical: mvs(10)}} />
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{width: '100%'}}
              onPress={() => {
                setValue(item);
              }}>
              <Row
                style={{
                  borderTopWidth: 0.9,
                  borderColor: colors.GE0E0E0,
                  paddingVertical: mvs(10),
                  alignItems: 'center',
                }}>
                <Coupon />
                <View style={{marginRight: mvs(10), justifyContent: 'center'}}>
                  {item === value ? <SelectedCard /> : <UnSelectedCard />}
                </View>
              </Row>
            </TouchableOpacity>
          ))}
        </>
      </View>
    </ReactNativeModal>
  );
};
export default CouponModal;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(15),
    borderTopRightRadius: mvs(15),
    paddingHorizontal: 15,
    alignItems: 'center',
    alignSelf: 'center',
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
