/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Business from './src/screens/service-details-screen';
AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = true;
