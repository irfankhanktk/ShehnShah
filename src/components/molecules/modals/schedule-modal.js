import moment from 'moment';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from 'react-native';
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
  items,
  setVisible = bool => {},
  //items = [],
  // morningShiftsitems = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'],
  // afterNoonShiftsitems = [1, 2, 3, 4, 5, 6, 7, 8],
  // eveningShiftsitems = [1, 2, 3, 4, 5, 6, 7, 8],
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#FFF',
        }}>
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
        <View style={{...styles.priceView}}>
          <Bold label={'Morning'} size={20} />
          <Bold label={items?.Morning?.timing} size={14} />
        </View>
        <View style={styles.timingView}>
          {items?.Morning?.slots?.length > 0 ? (
            items?.Morning?.slots?.map((morning, index) => (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <TouchableOpacity
                  key={index}
                  style={{width: '100%'}}
                  onPress={() => {
                    setValue(morning);
                    // setVisible(false);
                  }}>
                  <Row style={{...styles.PAYMENTDROPDOWN}}>
                    <Bold
                      size={15}
                      style={{flex: 1, marginHorizontal: mvs(8)}}
                      label={morning?.slice(1)}
                    />
                    <View>
                      {morning === value ? (
                        <SelectedCard />
                      ) : (
                        <UnSelectedCard />
                      )}
                    </View>
                  </Row>
                </TouchableOpacity>
              </ScrollView>
            ))
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>No time slots available</Text>
            </View>
          )}
        </View>

        <View style={{...styles.priceView}}>
          <Bold label={'Afternoon'} size={20} />
          <Bold label={items?.Afternoon?.timing} size={14} />
        </View>
        <View style={styles.timingView}>
          {items?.Afternoon?.slots?.length > 0 ? (
            items?.Afternoon?.slots?.map((afternoon, index) => (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() => {
                    setValue(afternoon);
                    // setVisible(false);
                  }}>
                  <Row style={{...styles.PAYMENTDROPDOWN}}>
                    <Bold
                      size={15}
                      style={{flex: 1, marginHorizontal: mvs(8)}}
                      label={afternoon}
                    />
                    <View>
                      {afternoon === value ? (
                        <SelectedCard />
                      ) : (
                        <UnSelectedCard />
                      )}
                    </View>
                  </Row>
                </TouchableOpacity>
              </ScrollView>
            ))
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>No time slots available</Text>
            </View>
          )}
        </View>

        <View style={{...styles.priceView}}>
          <Bold label={'Evening'} size={20} />
          <Bold label={items?.Evening?.timing} size={14} />
        </View>
        <View style={styles.timingView}>
          {items?.Evening?.slots?.length > 0 ? (
            items?.Evening?.slots?.map((evening, index) => (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() => {
                    setValue(evening);
                    // setVisible(false);
                  }}>
                  <Row style={{...styles.PAYMENTDROPDOWN}}>
                    <Bold
                      size={15}
                      style={{flex: 1, marginHorizontal: mvs(8)}}
                      label={evening}
                    />
                    <View>
                      {evening === value ? (
                        <SelectedCard />
                      ) : (
                        <UnSelectedCard />
                      )}
                    </View>
                  </Row>
                </TouchableOpacity>
              </ScrollView>
            ))
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>No time slots available</Text>
            </View>
          )}
        </View>
        <View style={{width: '95%', alignSelf: 'center'}}>
          <Buttons.ButtonPrimary
            onClick={() => setVisible(false)}
            style={{
              marginVertical: mvs(30),
            }}
            title={'Continue'}
          />
        </View>
      </ScrollView>
    </ReactNativeModal>
  );
};
export default ScheduleModal;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    width: width,
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(15),
    borderTopRightRadius: mvs(15),
    padding: 10,
    //alignItems: 'center',
    alignSelf: 'center',
  },
  priceView: {
    //borderWidth: 1,
    width: '95%',
    //paddingVertical: 10,
    alignSelf: 'center',
    marginVertical: 10,
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
  timingView: {
    // height: '45%',
  },
});
