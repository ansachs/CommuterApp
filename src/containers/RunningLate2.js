import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import ContactList from '../components/contacts/contactListModal'
import UsersApi from '../apis/UsersApi.js'

export default class RunningLate2 extends React.Component {
  constructor() {
    super();
    this.state = {
      startError: '',
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
      {
      },
      clientID: ""
  
    }
  }

  componentDidMount() {


    if (this.props.screenProps.contacts) {
      this.setState({contacts: this.props.screenProps.contacts})
    } else {
      this.setState({contacts: "Please login to view contacts"})
    }
   
  
  }


  componentWillUpdate = () => {
    if ((this.state.clientID.length === 0) && (this.props.screenProps.clientID.length > 0)) {
      this.setState({clientID: this.props.screenProps.clientID})
    } else if (this.state.clientID && this.props.screenProps.clientID.length === 0) {
      this.setState({clientID: "", favoriteContacts: {}})

    }
    console.log(this.state.clientID)
    console.log(Object.keys(this.state.favoriteContacts).length === 0)
        if (this.state.clientID.length > 0 && Object.keys(this.state.favoriteContacts).length === 0) {
          UsersApi.getFavoriteContacts(this.state.clientID)
          .then((response) => this.setState({favoriteContacts: response}))
    console.log(this.state.favoriteContacts)
    
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

  getRecipients = () => {
    let names = ''
    for (const [key, value] of Object.entries(this.state.sendTo)) {
      names += value.name + ", "
    }
    return names

  }

  addToSendTo = (contact) => {
    console.log(contact)
    console.log(this.state.clientID)

    if (this.state.sendTo.filter((currentContacts)=>currentContacts.id === contact.id).length > 0) {

    } else {
      this.setState({sendTo: [...this.state.sendTo, contact]})
    }

  }

  handleFavoritesClick = (item) => {
  if (this.state.clientID.length > 0) {
    if (this.state.favoriteContacts[item.id]){
      UsersApi.deleteContact(this.state.clientID, item.id)
      console.log(this.state.clientID)
      delete this.state.favoriteContacts[item.id];
      this.setState({favoriteContacts: this.state.favoriteContacts});
    } else {
      this.setState({favoriteContacts: {...this.state.favoriteContacts, [item.id]: item}})
      UsersApi.saveFavoriteContacts(item.firstName, item.phoneNumbers[0].number, item.id, this.state.clientID)
      }
    } else {
      return alert("You must Login To Add Favorites")
    }
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
        <Icon
          type='MaterialIcons'
          name='person-add'
          size={30}
          onPress={() => this.setState({modalVisible: true})}
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