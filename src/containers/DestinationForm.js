import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import GoogleMapApi from '../apis/GoogleMapApi.js'
import CommuteOptions from './CommuteOptions.js'
import SendSMS from 'react-native-sms'
import Communications from 'react-native-communications';


export default class DestinationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      startDestination: '',
      endDestination: '',
      initialPositionlong: '',
      initialPositionlat: '',

    }
  }

  componentDidMount = () => {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
              this.setState({ 
              initialPositionlong: position.coords.longitude, 
              initialPositionlat: position.coords.latitude,  
              endDestination: '',
              startDestination: ''
            })
          position = fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.initialPositionlat},${this.state.initialPositionlong}&key=AIzaSyD2_6K7CF1C1ooSwgDxxDq2WBx8bAIihIU`)
          .then(something => { 
            something.json().then(json => {
              const formattedAddress = json.results[0].formatted_address
              this.setState({
                startDestination: formattedAddress
              })
            })
          })
        },
      (error) => alert(error.message),
      )
    }

  sendMessage(event) {
   Communications.text('2253951571', 'React Native is great!')
  }

  render() {
    let start = this.state.startDestination
  console.log(start)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Start Destination:</Text>
        <Input
          placeholder= {start}
        />
        <Text>End Destination:</Text>
        <Input
          style={styles.textInput}
          placeholder='enter end address'
        />
        <Button
          onPress={(event) => {this.onPressSubmit(event).bind(this)}}
          title="SUBMIT"
          color="#FFF"
          style={styles.submit}
        />
        <Button
          title="Back"
          onPress={(event) => {this.sendMessage(event).bind(this)}}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
