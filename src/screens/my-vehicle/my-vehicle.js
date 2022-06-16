import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View ,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import Buttons from '../../components/atoms/Button';
import allColors from '../../services/colors';
import { mvs } from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import { INPUT_FIELD } from '../../components/atoms';
import { Vehicle_Styles as styles } from './my-vehicle-styles';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import Row from '../../components/atoms/row';

const MyVehicle = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const [payload, setPayload] = React.useState({
    email: '',
    password: '',
    name:'',
    confirmPassword:''
  });
  const { colors } = useTheme();

  const onSigin = async () => {
      
   };
  
  return (
  <View style={{ ...styles.container, backgroundColor: colors.background }}>
       <CustomHeader colors={colors} title='' allowBackBtn />
       <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(16),paddingBottom:mvs(30) }}>
         
      <View style={styles.body}>
         <Bold label={'My Vehicle'} style={{fontSize:24}}/> 
         <Regular label={'Add your vehicle to use our services'} style={{fontSize:18}}/> 
         <View style={styles.input_container}>

            <INPUT_FIELD.InputDropDown
                value={payload.name}
                onChangeText={t => setPayload({...payload, name: t})}
                label="VEHICLE"
                placeholder='Select your vehicle'/>
            <INPUT_FIELD.InputView
                value={payload.name}
                onChangeText={t => setPayload({...payload, name: t})}
                label="REGISTRATION NUMBER"
                placeholder='Enter you Registration'/>

            <INPUT_FIELD.InputDropDown
                value={payload.name}
                onChangeText={t => setPayload({...payload, name: t})}
                label="TYPE"
                placeholder='Select Type'/>    

            
            <INPUT_FIELD.InputDropDown
                value={payload.name}
                onChangeText={t => setPayload({...payload, name: t})}
                label="VEHICLE MODEL"
                placeholder='Select Model'/>    
            <Row style={{justifyContent:'space-between'}}>
            <INPUT_FIELD.InputDropDown
                value={payload.name}
                style={{width:'46%'}}
                onChangeText={t => setPayload({...payload, name: t})}
                label="YEAR"
                placeholder='Select'/>  

                <INPUT_FIELD.InputDropDown
                value={payload.name}
                style={{width:'46%'}}
                dropdownStyle={{flex: 1,}}
                onChangeText={t => setPayload({...payload, name: t})}
                label="COLOR"
                placeholder='Select'/>  
            </Row>      
            <INPUT_FIELD.InputView
                value={payload.name}
                onChangeText={t => setPayload({...payload, name: t})}
                label="VIN"
                placeholder='Enter VIN number'/>
        </View>
        <Buttons.ButtonPrimary
                disabled={loading}
                loading={loading}
                onClick={()=>navigation.navigate("Congratulation")}
                textStyle={{...styles.buttonText,color:colors.white}}
                style={{...styles.button}}
                title={'Proceed'}/>
      
        </View>

        </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  // home_posts: store.state.home_posts,
});

const mapDispatchToProps = {
  signin: payload => DIVIY_API.signin(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(MyVehicle);
