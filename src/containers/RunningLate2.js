import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import ContactList from '../components/contacts/contactListModal'

export default class RunningLate2 extends React.Component {
  constructor() {
    super();
    this.state = {
      sendTo: [{
          name: 'john',
          number: '1111111',
          relativeId: '1'
        },
        {
          name: 'jane',
          number: '2222222',
          relativeId: '2'
        }],
      modalVisible: false
    }
  }

  getRecipients() {
    let names = ''
    for (let contact in this.state.sendTo) {
      names += `${this.state.sendTo[contact].name}, `
    }
    return names
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
           <ContactList.ContactListModal 
            closeContactList={() => {this.setState({modalVisible: false})}} 
            modalState={this.state.modalVisible} />
        </View>
        <Text>To:</Text>
        <Input
          value={this.getRecipients()}
          rightIcon={
            <Icon
              type='MaterialIcons'
              name='person-add'
              size={30}
              onPress={()=>{this.setState({modalVisible: true})}}
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
