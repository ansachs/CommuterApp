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
        androidClientId: '277067014175-3stlk80kbu3o591cjk57ae3s2rd32f6f.apps.googleusercontent.com',
        iosClientId: '277067014175-ehie9e21cqhlr3l9d19bss23kcm18gm4.apps.googleusercontent.com',
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

