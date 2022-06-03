import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Buttons from '../../components/atoms/Button';
import { INPUT_FIELD } from '../../components/atoms/Input';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import Regular from '../../presentation/typography/regular-text';
import { mvs } from '../../services/metrices';
import { Styles as styles } from './styles';
const CategoryDetails = (props) => {
    const { colors } = useTheme();
    const { route,navigation } = props;
    const { item,prev_screen,user_info } = route?.params||{};

    return (
        <View style={styles.conntainer}>
            <CustomHeader
                allowBackBtn
                title={prev_screen?'Request Details':'Category Details'}
                colors={colors}
            />
            <View style={styles.body}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: mvs(22) }}>
                    <View style={styles.card}>
                        <ImagePlaceholder uri={item?.image} containerStyle={styles.image} />
                        <View style={{ paddingVertical: mvs(10), position: 'absolute', alignItems: 'center', alignSelf: 'center', borderRadius: mvs(10), top: mvs(20), backgroundColor: colors.primary, paddingHorizontal: mvs(20) }}>
                            <Regular style={{ color: colors.white }} label={item?.name} />
                        </View>
                    </View>
                    <INPUT_FIELD.ReviewInput  label={'Description'}>
                         <Regular label={'Here is the description of category, you can read it'}/>
                    </INPUT_FIELD.ReviewInput>
                   {!prev_screen&& <Buttons.ButtonPrimary onClick={()=>navigation?.navigate('Proposal')} style={{marginTop:mvs(20)}} title={'Submit a request'}/>}
                   {prev_screen&& 
                   <View>
                       <Buttons.ButtonSecondary onClick={()=>{}} style={{marginTop:mvs(20)}} title={'Reject'}/>
                       <Buttons.ButtonPrimary onClick={()=>{}} style={{marginTop:mvs(20)}} title={'Approve'}/>
                   </View>
                   }
                </ScrollView>
            </View>
        </View>
    );
};

const mapStateToProps = (store) => ({
    home_categories: store.state.home_categories,
    user_info: store.state.user_info,
});

const mapDispatchToProps = {
    fetchHomePosts: (user_id, page) =>
        DIVIY_API.fetchHomePosts(user_id, page),
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);
