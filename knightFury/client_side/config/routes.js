import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import AskScreen from './../screens/Ask';
import PostScreen from './../screens/Post';
import App from './../screens/App';
import SnapScreen from './../screens/Snap';
import WaitScreen from './../screens/Wait';
import ChatScreen from './../screens/Chat';
import APP_COLORS from './constants';
import CustomDrawerContentComponent from '../components/sideBar';

const headerNull = {
  navigationOptions: {
    header: null,
  },
};

const drawerConfig = {
  drawerPosition: 'right',
  drawerBackgroundColor: APP_COLORS.BACKGROUND_COLOR,
  drawerWidth: 200,
  minSwipeDistance: 200,
  contentOptions: {
    inactiveTintColor: APP_COLORS.WHITE_SMOKE,
    activeTintColor: APP_COLORS.WHITE_SMOKE,
    activeBackgroundColor: '#7265E3',
    iconContainerStyle: {
      opacity: 1,
    },
    itemStyle: {
      fontFamily: 'Rubik-Bold',
    },
    inactiveLabelStyle: {
      fontFamily: 'Rubik-Bold',
    },
  },
  contentComponent: CustomDrawerContentComponent,
};

// const ServicesStack = createStackNavigator({
//   Service: {
//     screen: ServicesScreen,
//     ...headerNull,
//   },
//   ServiceItem: {
//     screen: ServiceItem,
//     ...headerNull,
//   },
// });

const LoggedInNavigation = createDrawerNavigator(
  {
    Ask: {
      screen: AskScreen,
    },
    Snap: {
      screen: SnapScreen,
    },
    Post: {
      screen: PostScreen,
    },
    Wait: {
      screen: WaitScreen,
    },
    Chat: {
      screen: ChatScreen,
    },
  },
  drawerConfig,
);

const RootNavigation = createStackNavigator({
  Splash: {
    screen: App,
    ...headerNull,
  },
  //   Home: {
  //     screen: LoginScreen,
  //     ...headerNull,
  //   },
  LoggedInRoutes: {
    screen: LoggedInNavigation,
    ...headerNull,
  },
});

export default createAppContainer(RootNavigation);
