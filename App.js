import React from 'react';
import { YellowBox, View, Text, Switch, StyleSheet } from 'react-native';
import { Root } from './src/config/router.js';
import { Header, Icon } from 'react-native-elements';

state = {
      initialPosition: '',
      lastPosition: 'pivotal labs',
   }
   
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Remote debugger'
]);
componentDidMount = () => {

         navigator.geolocation.getCurrentPosition(
         (position) => {
          
            const initialPosition = JSON.stringify(position);
            this.setState({ initialPosition });
         },

         (error) => alert(error.message),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Commuter App', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Root />
      </View>
    )
  }
}
