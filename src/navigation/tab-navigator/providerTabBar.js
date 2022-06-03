import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import BottomMenu from '../../components/atoms/BottomMenu';
import BottomMenuIcon from '../../components/atoms/BottomMenuIcon';
import Home from '../../screens/tab-screens/home-tab/home-tab';
import Requests from '../../screens/tab-screens/requests-tab/requests-tab';
import Profile from '../../screens/profile/profile';
import {Settings as Setting} from '../../screens/settings-screen/settings';
import History from '../../screens/history/history';

const BottomTab = createBottomTabNavigator();

const ProviderTabBar = () => {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <BottomTab.Navigator
        // options={{tabBarHideOnKeyboard:true}}
        screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
        tabBar={props => <BottomMenu {...props} colors={colors} />}>
        {/* <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            tabBarIcon: focused => (
              <BottomMenuIcon name="home" focused={focused} />
            ),
          }}
        /> */}
        <BottomTab.Screen
          name="Requests"
          component={Requests}
          options={{
            title: 'Requests',
            tabBarIcon: focused => (
              <BottomMenuIcon name="order" focused={focused} />
            ),
          }}
        />
        <BottomTab.Screen
          name="History"
          component={History}
          options={{
            title: 'History',
            tabBarIcon: focused => (
              <BottomMenuIcon name="history" focused={focused} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            tabBarIcon: focused => (
              <BottomMenuIcon name="user" focused={focused} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
};

export default ProviderTabBar;
