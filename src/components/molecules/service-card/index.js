import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as SVGS from '../../../assets/common-icons';
import { mvs } from '../../../services/metrices';
import RatingStar from '../rating-star';
import Medium from './../../../presentation/typography/medium-text';
import colors from './../../../services/colors';
import Row from './../../atoms/row';
const ServiceCard = ({
    title = 'Services',
    value = '5 services',
    icon = 'Services',
    middleText,
    div = true,
    onPress,
    rating=3
}) => {
    const Icon = SVGS[icon];
    return (
        <Row alignItems={'center'}>
            <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', width: mvs(85), height: mvs(85) }}>
                <Medium style={{ textTransform: 'uppercase', fontSize: mvs(12), color: colors.G9B9B9B }} label={title} />
                {  
                     middleText ?
                    <Medium style={{ textTransform: 'uppercase', fontSize: mvs(29), color: colors.G9B9B9B }} label={middleText} /> :
                    <Icon />
                }
                {value ? 
                    <Medium style={{ textTransform: 'uppercase', fontSize: mvs(12), color: colors.G9B9B9B }} label={value} /> :
                    <RatingStar rate={rating}/>}
            </TouchableOpacity>
            {div && <View style={{ marginHorizontal: mvs(20), borderLeftWidth: 0.7, borderColor: colors.border, height: mvs(41) }} />}
        </Row>
    );
};
export default ServiceCard;