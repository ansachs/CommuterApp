import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import DestinationForm from './containers/DestinationForm.js';
import CommuteOptions from './containers/CommuteOptions.js';
import RunningLate from './RunningLate.js';

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
  }
});

export const Tabs = TabNavigator({
  DestinationForm2: {
    screen: DestinationStack,
    navigationOptions: {
      tabBarLabel: 'Destination',
      tabBarIcon: ({ tintColor }) => <Icon name="map" size={35} color={tintColor} />
    }
  },

  CommuteOptions2: {
    screen: CommuteOptions,
    navigationOptions: {
      tabBarLabel: 'Commute Options',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
    }
  }
},
{
  tabBarPosition: 'bottom'
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
  RunningLate: {
    screen: RunningLateStack
  },
}, {
  mode: 'modal',
  headerMode: 'none'
});
