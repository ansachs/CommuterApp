import React from 'react';
import { Linking, View, Text, Button } from 'react-native';


export default class Test extends React.Component {

onPress = () => {
  // Linking.canOpenURL('contacts:').then(supported => {

  // if (!supported) {
  //   console.log('Can\'t handle settings url');
  // } else {
  //   return Linking.openURL('app-settings:');
  // }
  // }).catch(err => console.error('An error occurred', err));
  // 
  console.log(Linking.canOpenURL('sms'))
}


  render() {
    // console.log(this.state)

    return (
      <View>
        <Text> button </Text>
        <Button
          title="open settings" 
          onPress={() => this.onPress}
        />
      </View>
    )
  }
}