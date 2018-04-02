import React from 'react';
import { YellowBox, View } from 'react-native';
import { Root } from './src/config/router.js';
import { Header, Icon } from 'react-native-elements';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Remote debugger'
]);

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
