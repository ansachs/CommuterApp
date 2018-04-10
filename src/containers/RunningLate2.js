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
          id: '1'
        },
        {
          name: 'jane',
          number: '2222222',
          id: '2'
        }],
      modalVisible: false,
      contacts: [],
      favoriteContacts: 
      {"2E73EE73-C03F-4D5F-B1E8-44E85A70F170": {id: "2E73EE73-C03F-4D5F-B1E8-44E85A70F170", name: "Hank M. Zakroff", phoneNumbers:[
          {countryCode: "us", number: "(555) 766-4823", digits: "5557664823"},
          {countryCode: "us", number: "(707) 555-1854", digits: "7075551854"}
        ]}
      ,
      "AB211C5F-9EC9-429F-9466-B9382FF61035": {id: "AB211C5F-9EC9-429F-9466-B9382FF61035", name: "Daniel Higgins Jr.", phoneNumbers:[
          {countryCode: "us", number: "(555) 766-4823", digits: "5557664823"},
          {countryCode: "us", number: "(707) 555-1854", digits: "7075551854"}
        ]}
      }
  
    }
  }

  componentDidMount() {
    if (this.props.screenProps.contacts) {
      this.setState({contacts: this.props.screenProps.contacts})
    } else {
      this.setState({contacts: "Please login to view contacts"})
    }
  }

  getRecipients = () => {
    let names = ''
    for (const [key, value] of Object.entries(this.state.sendTo)) {
      names += value.name + ", "
    }
    return names
  }

 // sendMessage() {
 //      var smsLink = require('sms-link')
 //      smsLink({phone: '2253951571', body: 'Hello world'})
 //  }

  addToSendTo = (contact) => {
    if (this.state.sendTo.filter((currentContacts)=>currentContacts.id === contact.id).length > 0) {
    } else {
      this.setState({sendTo: [...this.state.sendTo, contact]})
    }
  }

  handleFavoritesClick = (item) => {
    if (this.state.favoriteContacts[item.id]){
      delete this.state.favoriteContacts[item.id];
      this.setState({favoriteContacts: this.state.favoriteContacts});
    } else {
      console.log('added')
      this.setState({favoriteContacts: {...this.state.favoriteContacts, [item.id]: item}})
    }
  }


  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <View>
           <ContactList.ContactListModal 
            closeContactList={() => {this.setState({modalVisible: false})}} 
            modalState={this.state.modalVisible} 
            contactList={this.state.contacts} 
            addToSendTo={this.addToSendTo}
            handleFavoritesClick={this.handleFavoritesClick}
            favoriteContacts={this.state.favoriteContacts}
            />
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
          // onPress={this.sendMessage.bind(this)}
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
