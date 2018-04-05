import React from 'react';
import AppLink from 'react-native-app-link';


export default class ContactPage2 extends React.Component {

onPress = () => {
  AppLink.maybeOpenURL(url, { appName, appStoreId, playStoreId }).then(() => {
  // do stuff
  })
}


  render() {
    // console.log(this.state)

    return (
      <View>
        <Button
          onPress={(e) => {this.onPressSubmit(e)}}
          title="SUBMIT"
          color="#FFF"
          buttonStyle={{marginTop:20}} 
        />
      </View>
    )
  }
}