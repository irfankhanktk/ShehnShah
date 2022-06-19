import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StarFill, StarOutline } from '../../../assets/common-icons';
import colors from '../../../services/colors';
import { mvs } from '../../../services/metrices';
import Row from '../../atoms/row';
const RatingStar = ({
    size = 16,
    fill = colors.primary,
    stroke = colors.border,
    rate = 4,
    width = '100%',
    disabled=true,
    onPress =(rate)=>{}

}) => {
    return (
        <Row style={{ width: width }}>
            {
                [1, 2, 3, 4, 5].map((item, index) => (
                    //  <AntDesign key={index} name={item>rate?'staro':'star'} size={size} color={item>rate?stroke:fill}/>
                    item > rate ? (
                        <TouchableOpacity onPress={()=>onPress(item)} disabled={disabled}>
                            <StarOutline width={mvs(size)} height={mvs(size)} />
                        </TouchableOpacity>)
                        :
                        (<TouchableOpacity onPress={()=>onPress(item)} disabled={disabled}>
                            <StarFill width={mvs(size)} height={mvs(size)} />
                        </TouchableOpacity>)
                ))
            }
        </Row>
    );
};
export default RatingStar;