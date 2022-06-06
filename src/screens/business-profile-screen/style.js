import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";

export const STYLES = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
    },
    body:{
        flex:1,
    },
    scroll:{
        flexGrow:1,
        // paddingHorizontal:mvs(22),
        paddingTop:mvs(20),
    },
    item:{
        marginBottom:mvs(15),
        paddingVertical:mvs(10),
        borderBottomWidth:StyleSheet.hairlineWidth,
    },
    camera:{
        width: mvs(100),
        height: mvs(100),
        borderRadius: mvs(50),
        marginTop: mvs(10),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: mvs(30),
    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: mvs(50),
    },
    btn_container:{
        position: 'absolute',
        width: '100%',
        paddingBottom: mvs(40),
        paddingHorizontal: mvs(22),
        bottom: 0,
    }
});