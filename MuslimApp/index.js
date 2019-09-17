/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Router from './Router';
import {name as appName} from './app.json';
import bgMessaging from './bgMessaging';

AppRegistry.registerComponent(appName, () => Router);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging)