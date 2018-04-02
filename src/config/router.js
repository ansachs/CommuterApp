import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import DestinationForm from '../components/DestinationForm/DestinationForm.js';
import CommuteOptions from '../components/CommuteOptions/CommuteOptions.js';
import UberPage from '../components/UberPage/UberPage.js';
import RunningLate from '../components/RunningLate/RunningLate.js';

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

  UberPage: {
    screen: UberPage,
    navigationOptions: {
      title: 'UberPage',
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
