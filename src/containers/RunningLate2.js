import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

export default class RunningLate2 extends React.Component {
  constructor() {
    super();
    this.state = {
      sendTo: [
        {
          name: 'john',
          number: '1111111',
        },
        {
          name: 'jane',
          number: '2222222',
        }
      ]
    }
  }

  getContacts() {
    console.log('open contact list')
  }

  showContacts() {

  }

  removePhoneNumber = (index) => {
    let currentList = this.state.sendTo
    const newState = currentList.slice(0, index).concat(currentList.slice(index +1, currentList.length +1))
    this.setState({sendTo: newState})
  }

 sendMessage() {
      var smsLink = require('sms-link')
      smsLink({phone: '2253951571', body: 'Hello world'})
  }





  render() {
    let names = this.state.sendTo.map((contact, index) => {
      return (
        <Text
          key={index}
          style={{fontSize:18, marginRight:10}}
          onPress={() => this.removePhoneNumber(index)}
        >{contact.name}
          <Icon
            name='ios-remove-circle-outline'
            type='ionicon'
            size={16}
          />
        </Text>
      )
    })
    return (
      <View style={styles.container}>
        <Icon
          type='MaterialIcons'
          name='person-add'
          size={30}
          onPress={this.getContacts}
        />
        <Text>To: </Text>
        <View style={{flexDirection:'row'}}>
        {names}
        </View>

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
