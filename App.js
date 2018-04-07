import React from 'react';
import { YellowBox, View, Text, StyleSheet } from 'react-native';
import { Root } from './src/config/router.js';
import { Header, Icon } from 'react-native-elements';
import LoginButton from './src/components/authentication/loginButton'
import UsersApi from './src/apis/UsersApi.js'
import ContactList from './src/containers/ContactList'


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
    clientID: ""
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

    putUsersToRails() {
    return UsersApi.getGoogleId(this.state.userName, this.state.clientID)
    console.log(this.state.userName)
  }


  render() {
    if (this.state.clientID.length > 0) {
      this.putUsersToRails()
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
        <Root />
      </View>
    )
  }
}
