import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import ContactList from '../components/contacts/contactListModal'

export default class RunningLate2 extends React.Component {
  constructor() {
    super();
    this.state = {

      sendTo: [],
      modalVisible: false,
      contacts: [],
      favoriteContacts: {
        "410FE041-5C4E-48DA-B4DE-04C15EA3DBAC":{"id":16,"user_id":4,"name":"John","phone_number":"888-555-5512","relative_id":"410FE041-5C4E-48DA-B4DE-04C15EA3DBAC","created_at":"2018-04-11T21:02:43.151Z","updated_at":"2018-04-11T21:02:43.151Z"},"2E73EE73-C03F-4D5F-B1E8-44E85A70F170":{"id":14,"user_id":4,"name":"Hank M. Zakroff","phone_number":null,"relative_id":"2E73EE73-C03F-4D5F-B1E8-44E85A70F170","created_at":"2018-04-11T19:54:59.410Z","updated_at":"2018-04-11T19:54:59.410Z"}
      },

      // {"2E73EE73-C03F-4D5F-B1E8-44E85A70F170": {id: "2E73EE73-C03F-4D5F-B1E8-44E85A70F170", name: "Hank M. Zakroff", phoneNumbers:[
      //     {countryCode: "us", number: "(555) 766-4823", digits: "5557664823"},
      //     {countryCode: "us", number: "(707) 555-1854", digits: "7075551854"}
      //   ]}
      // ,
      // "AB211C5F-9EC9-429F-9466-B9382FF61035": {id: "AB211C5F-9EC9-429F-9466-B9382FF61035", name: "Daniel Higgins Jr.", phoneNumbers:[
      //     {countryCode: "us", number: "(555) 766-4823", digits: "5557664823"},
      //     {countryCode: "us", number: "(707) 555-1854", digits: "7075551854"}
      //   ]}
      // },
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

  componentWillUpdate= () => {
    if ((this.state.clientID.length === 0) && (this.props.screenProps.clientID.length > 0)) {
      this.setState({clientID: this.props.screenProps.clientID})
    } else if (this.state.clientID && this.props.screenProps.clientID.length === 0) {
      this.setState({clientID: "", favoriteContacts: {}})
    }
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

  // sendMessage() {
  //   Linking.openURL('sms://5557664823&body=running late!')
  // }

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
    // console.log(this.state.contacts)
    console.log(this.state.favoriteContacts)
    let names = this.state.sendTo.map((contact, index) => {
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
          //onPress={this.sendMessage.bind(this)}
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
