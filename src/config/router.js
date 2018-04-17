import React from 'react';
import { Alert, View } from 'react-native'
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DestinationForm from '../containers/DestinationForm.js';
import CommuteOptions from '../containers/CommuteOptions.js';
// import walkPage from '../containers/walkPage.js';
// import bikePage from '../containers/bikePage.js';
// import transitPage from '../containers/transitPage.js';
// import lyftPage from '../containers/lyftPage.js';
import TravelPage from '../containers/TravelPage.js';
// import UberPage from '../containers/UberPage.js';
import RunningLate from '../containers/RunningLate.js';

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

  TravelPage: {
    screen: TravelPage,
    navigationOptions: {
      title: 'Commute Options',
      header: null
    }
  }
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

  RunningLate: {
    screen: RunningLate,
    navigationOptions: {
      tabBarLabel: 'Running Late',
      tabBarIcon: ({ tintColor }) => <Icon name="run-fast" size={35} color={tintColor} />
    }
  }
},
{
  tabBarPosition: 'bottom',
});

export const RunningLateStack = StackNavigator({
  RunningLate: {
    screen: RunningLate,
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
  
    if (action.routeName === "CommuteOptions2"){
      if (state && !((state.routes && state.routes[1].params) || (action.params))) {
          return null;
      }
    }

    return defaultRoot(action, state);
};
