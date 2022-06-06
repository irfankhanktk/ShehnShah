import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Minute, Percent, StarFill } from '../../assets/common-icons';
import { Bg } from '../../assets/images';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import Buttons from '../atoms/Button';
import ImagePlaceholder from '../atoms/Placeholder';
import Row from '../atoms/row';
import HeadingTitle from '../molecules/heading-title';
const ServiceOffering = () => {
    return (
        <View>
            <View>
                <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: mvs(18) }}>
                    {[0, 1, 2, 3, 4].map((ele, index) => (<View style={{ width: mvs(181), marginRight: mvs(7), borderTopRightRadius: mvs(8), borderRadius: mvs(8), overflow: 'hidden' }}>
                        <ImagePlaceholder containerStyle={{ height: mvs(104), width: '100%', }} uri={Bg} />
                        <View style={{ padding: mvs(5), backgroundColor: colors.white }}>
                            <Row alignItems='center'>
                                <Row alignItems='center'>
                                    <StarFill height={mvs(13)} width={mvs(13)} />
                                    <Regular label={` ${4.9} (${2.3}k)`} />
                                </Row>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Buttons.ButtonPrimary title='AED 30' textStyle={{ fontSize: mvs(12), color: colors.primary }} style={{ width: mvs(72), borderRadius: mvs(5), height: mvs(21), backgroundColor: `${colors.primary}30` }} />
                                </View>
                            </Row>
                            <Regular color={colors.black} numberOfLines={2} label={'Subtitle or description Subtitle or...'} />
                            <Regular size={mvs(12)} color={colors.primary} label={'Business Name'} />
                            <Row>
                                <Row justifyContent='flex-start'>
                                    <Minute />
                                    <Regular size={mvs(12)} color={colors.B2E3036} label={' 20 Min'} />
                                </Row>
                                <Row justifyContent='flex-start'>
                                    <Percent />
                                    <Regular size={mvs(12)} color={colors.B2E3036} label={' Get 20% OFF'} />
                                </Row>
                            </Row>
                        </View>
                    </View>))}
                </ScrollView>
            </View>
        </View>
    );
};
export default ServiceOffering;