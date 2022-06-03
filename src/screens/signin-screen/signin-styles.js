import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";

export const Signin_Styles = StyleSheet.create({
    container:{
       flex:1,
      backgroundColor:colors.white,
    },
    body:{
        flex:1,
        paddingHorizontal:mvs(22),
        paddingTop:mvs(80),
    },
    logo:{
        alignSelf:'center'
    },
    input_container:{
        marginTop:mvs(60),
    },
    button:{
        marginTop:mvs(50),
    },
    register:{
        marginTop:mvs(30),
        alignSelf:'center',
    }
});