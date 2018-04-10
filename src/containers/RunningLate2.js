import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

export default class RunningLate2 extends React.Component {
  constructor() {
    super();
    this.state = {
      sendTo: {
        123: {
          name: 'john',
          number: '1111111',
          relativeId: '1'
        },
        456: {
          name: 'jane',
          number: '2222222',
          relativeId: '2'
        }
      }
    }
  }

  getRecipients() {
    let names = ''
    for (let contact in this.state.sendTo) {
      names += `${this.state.sendTo[contact].name}, `
    }
    return names
  }

 sendMessage() {
      var smsLink = require('sms-link')
      smsLink({phone: '2253951571', body: 'Hello world'})
  }





  render() {
    return (
      <View style={styles.container}>
        <Text>To:</Text>
        <Input
          value={this.getRecipients()}
          rightIcon={
            <Icon
              type='MaterialIcons'
              name='person-add'
              size={30}
            />
          }
        />

        <Text style={{marginTop:20}}>Message:</Text>
        <Input
            value='I am running late!'
        />

        <Button
          title='Send Text'
          buttonStyle={{marginTop:20}}
          onPress={this.sendMessage.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
