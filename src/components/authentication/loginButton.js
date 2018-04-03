import React from 'react';
import Expo from 'expo';
import { Icon } from 'react-native-elements';


export default LoginButton = () => {

onLoginPress = async () => {
    const result = await this.signInWithGoogleAsync()
    // if there is no result.error or result.cancelled, the user is logged in
    // do something with the result
  }

signInWithGoogleAsync = async () => {
  console.log('this button')
    try {
      const result = await Expo.Google.logInAsync({
        webClientId: '<my web client id>',
        androidClientId: '<my android client id>',
        iosClientId: '<my ios client id>',
        scopes: ['profile', 'email'],
      })

      console.log(result);

      if (result.type === 'success') {
        return result
      }
      return { cancelled: true }
    } catch (e) {
      console.log(e);
      return { error: e }
    }
  }

return(
  <Icon 
  name='login'
  type='material-community'
  color='#fff'
  onPress={()=>{console.log('hit');
  this.onLoginPress();}} 
  />)
} 

