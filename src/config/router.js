import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DestinationForm from '../containers/DestinationForm.js';
import CommuteOptions from '../containers/CommuteOptions.js';
import walkPage from '../containers/walkPage.js';
import bikePage from '../containers/bikePage.js';
import transitPage from '../containers/transitPage.js';
import lyftPage from '../containers/lyftPage.js';
import drivePage from '../containers/drivePage.js';
import uberPage from '../containers/uberPage.js';
import RunningLate from '../containers/RunningLate.js';
import ContactList from '../containers/ContactList'


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

  contactPage: {
    screen: ContactList,
    navigationOptions: {
      title: 'contactList',
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
    screen: uberPage,
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
    screen: RunningLate,
    navigationOptions: {
      tabBarLabel: 'Running Late',
      tabBarIcon: ({ tintColor }) => <Icon name="run-fast" size={35} color={tintColor} />
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
  // RunningLate: {
  //   screen: RunningLateStack
  // },
}, {
  //mode: 'modal',
  headerMode: 'none'
});
