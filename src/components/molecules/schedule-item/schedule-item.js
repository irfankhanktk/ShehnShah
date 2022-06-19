import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as SVG from '../../../assets/common-icons';
import colors from '../../../services/colors';
import { mvs } from '../../../services/metrices';
import Row from '../../atoms/row';
import Bold from './../../../presentation/typography/bold-text';
const ScheduleItems = ({ onClick, items = [] }) => {
  const RightSvg = SVG['SelectedCard'];

  return (
    <>
      {items.map((item,index) => (
        <TouchableOpacity style={{width:'100%'}} onPress={()=>{
          let copy =[...items];
          copy=copy?.map((item,index)=>({...item,selected:false}));
          copy[index].selected=true;
          onClick(copy);
        }}>
          <Row style={{ ...styles.PAYMENTDROPDOWN, }}>
            <Bold size={12} style={{ flex: 1, marginHorizontal: mvs(8) }} label={'skdk'} />
            <View>
              {items?.selected&&<RightSvg />}
            </View>
          </Row>
        </TouchableOpacity>
      ))}
    </>
  );
};
export default ScheduleItems;
const styles = StyleSheet.create({

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