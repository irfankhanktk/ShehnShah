import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";

export const Signup_Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    body: {
        flex: 1,
    },
    logo: {
        alignSelf: 'center',
        marginBottom:mvs(30),
    },
    input_container: {
        marginTop: mvs(30),
        // marginBottom:mvs(60),
    },
    wrapper: {
       height:'100%'
    },
    button: {
        width: mvs(50),
        height: mvs(50),
        borderRadius: mvs(25),
    },
    btn_txt: {
        fontSize: mvs(13),

    },
    register: {
        alignSelf: 'center',
        // position: 'absolute',
        // bottom: mvs(0),
        // right:mvs(10),
        marginTop:mvs(20),
        marginBottom:mvs(10)
        // alignSelf:'center',
    },
    heading: {
        color: colors.primary,
        marginLeft:mvs(15),
        fontSize: mvs(23),
    },
    dot:{
        backgroundColor: colors.dot,
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    activeDot:{
        backgroundColor:colors.black,
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    buttonWrapperStyle:{
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    }
});