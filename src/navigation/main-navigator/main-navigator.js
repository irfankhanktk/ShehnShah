// In App.js in a new project

import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import TabBarProvider from '../../navigation/tab-navigator/providerTabBar';
import CategoryDetails from '../../screens/category-details-screen/category-details';
import changePassword from '../../screens/change-password-screen/change-password';
import History from '../../screens/history/history';
import personalInfo from '../../screens/personal-info-screen/personal-info';
import Profile from '../../screens/profile/profile';
import Proposal from '../../screens/proposal-screen/proposal';
import ProviderRequest from '../../screens/providerRequest/providerRequest';
import SelectRoute from '../../screens/selectRoute/selectRoute';
import { Settings } from '../../screens/settings-screen/settings';
import Splash from '../../screens/splash-screen/splash';
import Request from '../../screens/tab-screens/requests-tab/requests-tab';
import Signin from './../../screens/signin-screen/signin';
import Signup from './../../screens/signup-screen/signup';
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
    <Stack.Navigator screenOptions={horizontalAnimation}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="TabBarProvider" component={TabBarProvider} />
      <Stack.Screen name="Request" component={Request} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SelectRoute" component={SelectRoute} />
      <Stack.Screen name="ProviderRequest" component={ProviderRequest} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      {/* <Stack.Screen name="Drawer" component={DrawerNavigator} /> */}
      <Stack.Screen name="Proposal" component={Proposal} />
      <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
      <Stack.Screen name="ChangePassword" component={changePassword} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="PersonalInfo" component={personalInfo} />
    </Stack.Navigator>
  );
};
