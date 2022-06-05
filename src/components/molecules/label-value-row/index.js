import React from 'react';
import SemiBold from '../../../presentation/typography/semibold-text';
import colors from '../../../services/colors';
import { mvs } from '../../../services/metrices';
import Regular from './../../../presentation/typography/regular-text';
import Row from './../../atoms/row';
import { StyleSheet } from 'react-native';
const LabelValue = ({
    label = 'I am Title',
    value='value here',
    mb=mvs(10),
    vColor=colors.B323232,
    lcolor=colors.B323232,
    bw=StyleSheet.hairlineWidth,
}) => {
    return (
        <Row style={{justifyContent:'space-between',marginHorizontal:mvs(18),paddingVertical: mvs(6),marginBottom:mb,borderBottomWidth: bw,borderColor: colors.GE1E1E1,}}>
             <Regular size={mvs(14)} label={label} color={colors.B323232}/>
             <SemiBold size={mvs(14)} label={value} color={vColor}/>
        </Row>
    );
};
export default LabelValue;