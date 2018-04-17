import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight, Linking, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

import ContactModal from './ContactModal'
import UsersApi from '../apis/UsersApi.js'

export default class RunningLate2 extends React.Component {
  constructor() {
    super();
    this.state = {
      sendTo: [],
      modalVisible: false,
      contacts: [],
      favoriteContacts: {},
      startError: '',
      clientID: '',
      message: 'I am running late!'
    }
  }

  componentDidMount() {
    if (this.props.screenProps.contacts) {
      this.setState({contacts: this.props.screenProps.contacts})
    } else {
      this.setState({contacts: "Please login to view contacts"})
    }
  }

  componentDidUpdate = function(prevProps, prevState) {
    this.addClientIDAndFavorites(); 
  }

  addClientIDAndFavorites = () => {
    if ((this.state.clientID.length === 0) && (this.props.screenProps.clientID.length > 0)) {
      UsersApi.getFavoriteContacts(this.props.screenProps.clientID)
      .then((response)=> {  
        this.setState({clientID: this.props.screenProps.clientID, favoriteContacts: response}) })
    } else if (this.state.clientID && this.props.screenProps.clientID.length === 0) {
      this.setState({clientID: "", favoriteContacts: {}}, ()=>{console.log("after set state", this.state)})
    }
  }

  removePhoneNumber = (id) => {
    delete this.state.sendTo[id]
    this.setState({sendTo: this.state.sendTo})
  }

  sendMessage(numbers) {
    numbers = numbers.slice(0, numbers.length-1)
    Linking.openURL(`sms://open?addresses=${numbers}&body=${this.state.message}`)
  }

  addToSendTo = (contact) => {
    // console.log(contact)
    if (!this.state.sendTo[contact.id]) {
      this.state.sendTo[contact.id] = contact
      this.setState({sendTo: {...this.state.sendTo}})
    } 
  }

  handleFavoritesClick = (item) => {
    if (this.state.clientID.length > 0) {
      if (this.state.favoriteContacts[item.id]){
        UsersApi.deleteContact(this.state.clientID, item.id)
        delete this.state.favoriteContacts[item.id];
        this.setState({favoriteContacts: this.state.favoriteContacts});
      } else {
        UsersApi.saveFavoriteContacts(item.firstName, item.phoneNumbers[0].number, item.id, this.state.clientID)
        this.setState({favoriteContacts: {...this.state.favoriteContacts, [item.id]: item}})
        }
      }
     else {
      alert("You must Login To Add Favorites")
    }
  }

  render() {

    let number = ""
    let names = Object.values(this.state.sendTo).map((contact) => {
      number += contact.phoneNumbers[0].digits + ","
      return (
        <Text
          key={contact.id}
          style={styles.names}
          onPress={() => this.removePhoneNumber(contact.id)}
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
           <ContactModal
            closeContactList={() => {this.setState({modalVisible: false})}}
            modalState={this.state.modalVisible}
            contactList={this.state.contacts}
            addToSendTo={this.addToSendTo}
            handleFavoritesClick={this.handleFavoritesClick}
            favoriteContacts={this.state.favoriteContacts}
            showFavoritesTab={this.showFavoritesTab}
            />
        </View>
        <Icon
          containerStyle={styles.iconContainer}
          type='MaterialIcons'
          name='person-add'
          size={30}
          onPress={() => this.setState({modalVisible: true})}
        />
        <Text style={styles.toTitle}>To: </Text>
        <View style={styles.namesContainer}>
        {names}
        </View>

        <Text style={styles.messageTitle}>Message:</Text>
        <Input
          value={this.state.message}
          onChangeText={(message) => this.setState({message})}
          inputContainerStyle={{borderBottomColor:'#fff'}}
          containerStyle={styles.message}
          inputStyle={{height:120}}
          multiline={true}
        />

        <Button
          title='Send Text'
          buttonStyle={styles.button}
          onPress={() => {this.sendMessage(number)}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:40,
    justifyContent: 'center'
  },
  names: {
    fontSize:18,
    marginRight:10,
    marginBottom:5
  },
  iconContainer: {
    alignItems:'flex-end'
  },
  namesContainer: {
    flexDirection:'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    padding:5,
    minHeight: 40
  },
  toTitle: {
    marginBottom:5
  },

  messageTitle: {
    marginTop:20,
    marginBottom:5
  },
  message: {
    width:'100%',
    backgroundColor: '#fff',
    flexWrap: 'wrap'
  },
  button : {
    marginTop:15
  }
});