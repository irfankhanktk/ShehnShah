import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { mvs, width } from '../../../services/metrices';
import colors from './../../../services/colors';
import ScheduleItems from './../schedule-item/schedule-item';
import Row from './../../atoms/row';
import { SelectedCard } from '../../../assets/common-icons';
import Bold from './../../../presentation/typography/bold-text';
const ScheduleModal = ({
    visible,
    setVisible = false,
    items = [{ title: 'item A' }, { title: 'item B' }, { title: 'item C' }],
    setItems = (items) => { }
}) => {

    return (
        <ReactNativeModal
            propagateSwipe
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
            onSwipeComplete={() => setVisible(false)}
            swipeDirection='up'
            style={{ margin: 0 }}>
            <View style={styles.container}>
                <>
                    {items.map((item, index) => (
                        <TouchableOpacity style={{ width: '100%' }} onPress={() => {
                            let copy = [...items];
                            copy = copy?.map((item, index) => ({ ...item, selected: false }));
                            copy[index].selected = true;
                            setItems(copy);
                        }}>
                            <Row style={{ ...styles.PAYMENTDROPDOWN, }}>
                                <Bold size={12} style={{ flex: 1, marginHorizontal: mvs(8) }} label={'skdk'} />
                                <View>
                                    {item?.selected && <SelectedCard />}
                                </View>
                            </Row>
                        </TouchableOpacity>
                    ))}
                </>
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
        alignItems: 'center',
        alignSelf: 'center',
    },
    PAYMENTDROPDOWN: {
        justifyContent: 'space-between',
        height: mvs(50),
        alignItems: 'center',
        borderRadius: 10,
        top: mvs(8),
        borderBottomWidth: 1,
        borderColor: colors.gray,
        paddingHorizontal: mvs(11)
      }
});