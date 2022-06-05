import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { Bg } from '../../assets/images';
import Buttons from '../../components/atoms/Button';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import ThemeContext from '../../context/theme-context';
import SERVICES from '../../services/common-services';
import { mvs } from '../../services/metrices';
import validation from '../../services/validation';
import DIVIY_API from '../../store/api-calls';
import { STYLES as styles } from './style';
const BusinessProfile = (props) => {
  const {user_info,} = props;
  const {colors} = useTheme();
  const [payload, setPayload] = React.useState({
    image: '',
    last_name: '',
    first_name: '',
  });
  const {showAlert} = React.useContext(ThemeContext);
  const [loading, setLoading] = React.useState(false);
  const [theme, setTheme] = React.useState('light');

  //save to update profile
  const onSave = async() => {
   try {
     const res= validation.personalInfoValidation(payload);
     if (!res.status) {
      showAlert('error', res.message);
       return
     }
     setLoading(true);
    //  await updatePersonalInfo({...payload,image:payload?.image?.type?payload?.image:null,user_id:user_info?.id});
   } catch (error) {
     showAlert('error',error)
   }finally{
     setLoading(false);
   }
  };

  const onCamera = async () => {
    const res = await SERVICES._returnImageGallery();
    setPayload({...payload, image: res});
  };
  
  React.useEffect(() => {
    (async () => {
      const custTheme = await AsyncStorage.getItem('@custTheme');
      if (custTheme != null) {
        setTheme(custTheme);
      }
    })();
  }, []);

  React.useEffect(()=>{
    setPayload({first_name:user_info?.first_name,last_name:user_info?.last_name,image:{
      uri:SERVICES._returnFile(user_info?.image),
    }})
  },[user_info]);


  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* <CustomHeader title="Business Info" allowBackBtn colors={colors} /> */}
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
            <ImagePlaceholder uri={Bg} containerStyle={{width:'100%',height:mvs(210)}}/>
         {/* <ProfilePic/> */}
        </ScrollView>
        <View
          style={{
            ...styles.btn_container,
            backgroundColor:colors.background,
          }}>
          <Buttons.ButtonPrimary
            onClick={onSave}
            disabled={loading}
            loading={loading}
            title="Save"
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  fetchUsers: (user_id) => DIVIY_API.fetchUsers(user_id),
  updatePersonalInfo: (payload,user_id) => DIVIY_API.updatePersonalInfo(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);
