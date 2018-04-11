import React from 'react';
import Expo from 'expo';
import { Icon } from 'react-native-elements';


export default LoginButton = (props) => {

let loggedOn = props.current.clientID !== "" ? 'logout' : 'login'

onLoginPress = async () => {
  if (props.current.clientID === "") {
    const result = await this.signInWithGoogleAsync()
  } else {
    props.handleClick(null)
  }
}

signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '277067014175-3stlk80kbu3o591cjk57ae3s2rd32f6f.apps.googleusercontent.com',
        iosClientId: '277067014175-ehie9e21cqhlr3l9d19bss23kcm18gm4.apps.googleusercontent.com',
        webClientId: "277067014175-5mp1fefmgtq18g3e919567a730vvnva0.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      }).catch((err) => {console.log(err)})

      if (result.type === 'success') {
        props.handleClick(result);
        return result;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: e }
    }
  }

return(
  <Icon 
  name={loggedOn}
  type='material-community'
  color='#fff'
  onPress={()=>{
    this.onLoginPress();}} 
  />)
} 

