import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight, Linking } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import ContactList from '../components/contacts/contactListModal'
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
      UsersApi.getFavoriteContacts(this.props.screenProps.clientID)
      .then((response)=> { this.setState({clientID: this.props.screenProps.clientID, favoriteContacts: response}) })
    } else if (this.state.clientID && this.props.screenProps.clientID.length === 0) {
      this.setState({clientID: "", favoriteContacts: {}})
    }
    //console.log(this.state.clientID)
    //console.log(Object.keys(this.state.favoriteContacts).length === 0)
    // if (this.state.clientID.length > 0 && Object.keys(this.state.favoriteContacts).length === 0) {
    //   UsersApi.getFavoriteContacts(this.state.clientID)
    //   .then((response) => this.setState({favoriteContacts: response}))
    //console.log(this.state.favoriteContacts)
    // }
  }

  removePhoneNumber = (index) => {
    let currentList = this.state.sendTo
    const newState = currentList.slice(0, index).concat(currentList.slice(index +1, currentList.length +1))
    this.setState({sendTo: newState})
  }

  // getRecipients = () => {
  //   let names = ''
  //   for (const [key, value] of Object.entries(this.state.sendTo)) {
  //     names += value.name + ", "
  //   }
  //   return names

  // }

  sendMessage(numbers) {
    numbers = numbers.slice(0, numbers.length-2)
    Linking.openURL(`sms://open?addresses=${numbers}&body=running late!`)
  }


  addToSendTo = (contact) => {
    // console.log(contact)
    // console.log(this.state.clientID)
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
    // console.log(this.state.contacts)
    // console.log(this.state.favoriteContacts)
    let number = ""
    let names = this.state.sendTo.map((contact, index) => {
      number += contact.phoneNumbers[0].digits + ","
      return (
        <Text
          key={index}
          style={styles.names}
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
           <ContactList
            closeContactList={() => {this.setState({modalVisible: false})}}
            modalState={this.state.modalVisible}
            contactList={this.state.contacts}
            favoritesList={this.state.favoriteContacts}
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
          value='I am running late!'
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
