import React from 'react';
import { YellowBox, View, Text, StyleSheet } from 'react-native';
import { Root } from './src/config/router.js';
import { Header, Icon } from 'react-native-elements';
import LoginButton from './src/components/authentication/loginButton'


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


  render() {

<<<<<<< HEAD
=======
    let userOrWelcome = this.state.clientID ? this.state.userName : "welcome"
>>>>>>> 9bd97b28b6216aed25565b61c065699f83a62a9d
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
        <Root screenProps={this.state.clientID}/>
      </View>
    )
  }
}
