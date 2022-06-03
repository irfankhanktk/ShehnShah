// In App.js in a new project

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StatusBar, View } from 'react-native';
import Otp from '../../screens/otp-screen/otp';
import Splash from '../../screens/splash-screen/splash';
import Onboarding from './../../screens/onboarding-screen/onboarding';
import Signin from './../../screens/signin-screen/signin';
import colors from './../../services/colors';
const Stack = createStackNavigator();
const horizontalAnimation = {
  headerShown: false,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
export const MainNavigator = () => {
  return (
    <View style={{flex:1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white}/>
    <Stack.Navigator screenOptions={horizontalAnimation}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Signin" component={Signin} />
    </Stack.Navigator>
    </View>
  );
};
