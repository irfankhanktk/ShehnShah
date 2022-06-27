import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import Buttons from '../../components/atoms/Button';
import { INPUT_FIELD } from '../../components/atoms/Input';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import allColors from '../../services/colors';
import { mvs } from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import { BlackCamera } from '../../assets/common-icons';
import { About_Styles as styles } from './about-styles';
import ImagePlaceholder from '../../components/atoms/Placeholder';
import alertService from '../../services/alert.service';
import DualText from '../../components/atoms/dual-text/dual-text';
import SERVICES from './../../services/common-services';

const About = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const [payload, setPayload] = React.useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    image: ''

  });
  const { colors } = useTheme();

  const onSigin = async () => {

  };

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <CustomHeader colors={colors} title='' allowBackBtn />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(16) }}>

        <View style={styles.body}>

          <Bold label={"More about you"} style={styles.welcomeText} />
          <Regular label={"Enter your personal information and "} style={styles.welcomeSubText} />
          <Regular label={"upload profile image"} style={styles.welcomeSubText} />
          <View style={styles.imageView}>
            <ImagePlaceholder uri={payload?.image?.uri ? { uri: payload?.image?.uri } : null} isUser={true} containerStyle={styles.profileImage} />
            <TouchableOpacity
              style={styles.cameraStyle}
              onPress={async () => {
                try {
                  const res = await SERVICES._returnImageGallery();
                  setPayload({ ...payload, image: res })
                } catch (error) {
                  console.log('error:', error);
                }
              }}>
              <BlackCamera />
            </TouchableOpacity>
          </View>
          <Regular label={"Upload profile picture"} style={styles.welcomeSubText} />
          <View style={styles.input_container}>

            <INPUT_FIELD.InputSecondary
              rightIcon={false}
              leftIcon='User'
              value={payload.name}
              onChangeText={t => setPayload({ ...payload, name: t })}
              label="FULL NAME"
              placeholder="John Doe"

            />

            <INPUT_FIELD.InputSecondary
              value={payload.email}
              leftIcon='User'
              rightIcon='Tick'
              onChangeText={t => setPayload({ ...payload, email: t })}
              label="EMAIL"
              placeholder="lehieuds@gmail.com"

            />
          </View>
          <DualText
            style={{ marginTop: mvs(10), fontSize: 14 }}
            content={"By continuing. you agree to our"}
            highlightTextStyle={{ fontSize: 14 }}
            highlightText={' Terms of use'}>
            <Regular label={' and'} />
          </DualText>

          <DualText style={{ marginTop: mvs(1), fontSize: 14 }}
            highlightTextStyle={{ fontSize: 14 }}
            content={"confirm that you have read "}
            highlightText={'Privacy policy.'} />

          <Buttons.ButtonPrimary
            disabled={loading}
            loading={loading}
            onClick={() => navigation.navigate("MyVehicle")}
            textStyle={{ ...styles.buttonText, color: colors.white }}
            style={{ ...styles.button }}
            title={'Continue'}
          />

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
export default connect(mapStateToProps, mapDispatchToProps)(About);
