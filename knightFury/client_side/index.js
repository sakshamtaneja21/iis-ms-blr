/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import RootNav from './config/routes';
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => RootNav);
