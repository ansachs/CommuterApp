import React from 'react';
import { Alert, View } from 'react-native'
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
  // navigationOptions: ({navigation}) => ({
  //   tabBarOnPress: ({scene, jumpToIndex}) => {

  //     // console.log(scene)
  //     // console.log(jumpToIndex)
  //     if (scene.route.params) {
  //       jumpToIndex(scene.index)
  //     } else if (!scene.route.params && scene.index === 0) {
  //       jumpToIndex(0)
  //     } else if (!scene.route.params && scene.index === 2) {
  //       jumpToIndex(2)
  //     } else {
  //       Alert.alert('Alert', 'Please fill out the form on the destination page', [{text: 'Ok'}]);
  //     }
  //   }
  // })
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

const defaultRoot = Tabs.router.getStateForAction;
Tabs.router.getStateForAction = (action, state) => {

  // console.log(action, state)
  // if(state && state.isTransitioning === false) {
    if (action.routeName === "CommuteOptions2"){
      if (state && !((state.routes && state.routes[1].params) || (action.params))) {
        // console.log("routes", Boolean(state.routes[1].params))
        // if () {
          // console.log(state, action)
    // Alert.alert('Alert', 'Please fill out the form on the destination page', [{text: 'Ok'}]);
          return null;
        // }
      }
    }

    return defaultRoot(action, state);
};
