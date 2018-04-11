import React from 'react';
import { YellowBox, View, Text, StyleSheet } from 'react-native';
import { Root } from './src/config/router.js';
import { Header, Icon } from 'react-native-elements';
import LoginButton from './src/components/authentication/loginButton'
import UsersApi from './src/apis/UsersApi.js'
import GetContacts from './src/components/contacts/getContacts'

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Remote debugger'
]);


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      clientID: "",
      contacts: [],
      sections: []
    }
  }

  handleClick = (details) => {
    if (details !== null) {
      this.setState({
        userName: details.user.name,
        clientID: details.user.id
      })
    } else {
      this.setState({
        userName: "welcome",
        clientID: ""
      })
    }

  }

  componentDidMount = () => {
    this.getContacts()
  }

  getContacts = async () => {
    const sections =[];

    for (i = 0; i < 26; i++) {
      sections[i] = {data:[], key: String.fromCharCode(i + 65), title: String.fromCharCode(i + 65)}
    }

    GetContacts.getContactsAsync()
    .then((contacts)=>{
      // console.log('first out of async')
      // console.log(contacts)
      if (!contacts || !contacts.data) {
        throw "error"
      } else {
        this.setState({contacts: contacts.data})
        contacts.data.forEach((contact)=>{
          if (contact.name) {
            if (isNaN((contact.name)[0]) === true) {
              const key = (contact.name)[0].toUpperCase()
              sections[key.charCodeAt(0) - 65].data.push(contact)
            }
          }
        })
        this.setState({sections: sections})
        }
    }).catch((err) => {console.log(err)})

  }

  checkClientWithServer() {
    UsersApi.getGoogleId(this.state.userName, this.state.clientID)
  // console.log(this.state.userName)
  }


  render() {
    console.log(this)
    if (this.state.clientID.length > 0) {
      this.checkClientWithServer()
    } 
    let userOrWelcome = this.state.clientID ? this.state.userName : "welcome"

    return (
      <View style={{flex: 1}}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: userOrWelcome, style: { color: '#fff' } }}
          rightComponent={
            <LoginButton
              handleClick={(details)=>{this.handleClick(details)}}
              current={this.state}
            />}
        />
        <Root screenProps={{contacts: this.state.sections, clientID: this.state.clientID}}/>
      </View>
    )
  }
}
