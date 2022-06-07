import React from 'react';
import { View } from 'react-native';
import { mvs } from '../../../services/metrices';
import Medium from './../../../presentation/typography/medium-text';
import colors from './../../../services/colors';
const HeadingTitle = ({
    title = 'I am Title',
}) => {
    return (
        <View style={{justifyContent:'center',paddingHorizontal:mvs(18),marginVertical:mvs(15),backgroundColor:colors.FBF8F8,paddingVertical:mvs(7)}}>
             <Medium size={mvs(20)} label={title} color={colors.black}/>
        </View>
    );
};
export default HeadingTitle;