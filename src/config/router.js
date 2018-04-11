import React from 'react';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DestinationForm from '../containers/DestinationForm.js';
import CommuteOptions from '../containers/CommuteOptions.js';
import walkPage from '../containers/walkPage.js';
import bikePage from '../containers/bikePage.js';
import transitPage from '../containers/transitPage.js';
import lyftPage from '../containers/lyftPage.js';
import drivePage from '../containers/drivePage.js';
import UberPage from '../containers/UberPage.js';
import RunningLate2 from '../containers/RunningLate2.js';


export const DestinationStack = StackNavigator({
  DestinationForm: {
    screen: DestinationForm,
    navigationOptions: {
      title: 'Destination',
      header: null
    }
  },

  CommuteOptions: {
    screen: CommuteOptions,
    navigationOptions: {
      title: 'Commute Options',
      header: null
    }
  },

  walkPage: {
    screen: walkPage,
    navigationOptions: {
      title: 'walkPage',
      header: null
    }
  },

  bikePage: {
    screen: bikePage,
    navigationOptions: {
      title: 'bikePage',
      header: null
    }
  },

  transitPage: {
    screen: transitPage,
    navigationOptions: {
      title: 'transitPage',
      header: null
    }
  },

  lyftPage: {
    screen: lyftPage,
    navigationOptions: {
      title: 'lyftPage',
      header: null
    }
  },

  drivePage: {
    screen: drivePage,
    navigationOptions: {
      title: 'drivePage',
      header: null
    }
  },

  uberPage: {
    screen: UberPage,
    navigationOptions: {
      title: 'uberPage',
      header: null
    }
  },
});

export const Tabs = TabNavigator({
  DestinationForm2: {
    screen: DestinationStack,
    navigationOptions: ({navigation}) => ({
      tabBarVisible: true,
      tabBarLabel: 'Destination',
      tabBarIcon: ({ tintColor }) => <Icon name="map" size={35} color={tintColor} />
    })
  },

  CommuteOptions2: {
    screen: CommuteOptions,
    navigationOptions: {
      tabBarLabel: 'Commute Options',
      tabBarIcon: ({ tintColor }) => <Icon name="format-list-bulleted" size={35} color={tintColor} />
    }
  },

  RunningLate2: {
    screen: RunningLate2,
    navigationOptions: {
      tabBarLabel: 'Running Late',
      tabBarIcon: ({ tintColor }) => <Icon name="run-fast" size={35} color={tintColor} />
    }
  }
},
{
  tabBarPosition: 'bottom',
  navigationOptions: ({navigation}) => ({
    tabBarOnPress: ({scene, jumpToIndex}) => {
      if (scene.route.params) {
        jumpToIndex(scene.index)
      } else if (!scene.route.params && scene.index === 0) {
        jumpToIndex(0)
      } else if (!scene.route.params && scene.index === 2) {
        jumpToIndex(2)
      }
    }
  })
});

export const RunningLateStack = StackNavigator({
  RunningLate: {
    screen: RunningLate2,
    navigationOptions: {
      title: 'Running late?',
      header: null
    }
  }
})

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  // RunningLateStack: {
  //   screen: RunningLateStack
  // },
}, {
  // mode: 'modal',
  headerMode: 'none'
});

const defaultRoot = Root.router.getStateForAction;

// console.log(Root())
// Root.router.getStateForAction = (action, state) => {
//   console.log("************")
//   console.log(action, state)
  // if (state && action.type === 'PushTwoProfiles') {
  //   const routes = [
  //     ...state.routes,
  //     {key: 'A', routeName: 'Profile', params: { name: action.name1 }},
  //     {key: 'B', routeName: 'Profile', params: { name: action.name2 }},
  //   ];
  //   return {
  //     ...state,
  //     routes,
  //     index: routes.length - 1,
  //   };
  // }
//   return defaultRoot(action, state);
// };

