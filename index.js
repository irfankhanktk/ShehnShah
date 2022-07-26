/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Business from './src/screens/business-profile-screen';
AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = true;
