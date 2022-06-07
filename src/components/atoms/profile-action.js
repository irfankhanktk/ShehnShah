import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Edit } from '../../assets/common-icons';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import fonts from '../../services/fonts';
import { mvs } from '../../services/metrices';
import Row from './row';
import * as SVG from '../../assets/common-icons';
const ProfileAction = ({selected=true,onChange,label,subLabel='',labelStyle,style,subLabelStyle,leftIcon='Coupon',rightIcon='Arrow'}) => {
    const LeftSvg=SVG[leftIcon+(selected==true?"s":"")];
    const RightSvg=SVG[rightIcon+(selected==true?"s":"")];
    return (

       <Row style={{...styles.ACTION,...style,backgroundColor:selected? colors.primary:colors.white}}>
            {LeftSvg &&(<LeftSvg  style={{color:selected? colors.white:colors.primary}}/>)}
                   <View style={styles.CENTERVIEW}>
                       <SemiBold label={label} style={{fontSize:16,marginTop:mvs(5),...labelStyle,color:!selected? colors.black:colors.white}}/>
                       <Regular label={subLabel} style={{fontSize:12,...subLabelStyle,color:!selected? colors.black:colors.white}}/>
                   </View>
          { RightSvg && (<RightSvg style={{tintColor:selected? colors.white:colors.primary}}/>) }
       </Row>
    );
};
export default ProfileAction;
const styles = StyleSheet.create({
   
    ACTION:{
       shadowColor:colors.shadow,
       borderRadius:8,
       borderWidth:1,
       borderColor:colors.gray,
       justifyContent:'space-between',
       alignItems:'center',
       backgroundColor:colors.white,
       height:mvs(58),
       paddingHorizontal:mvs(10),
       marginTop:mvs(10),
       
       
    },
    CENTERVIEW:{
        flex:1,
        justifyContent:"center",
        marginHorizontal:mvs(10)
    }
});