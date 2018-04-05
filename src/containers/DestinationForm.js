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
      startDestination: "Loading...",
      endDestination: "",
      startError: "",
      startError: " ",
      endError: " "
    }
  }

  componentDidMount = () => {
    this.getLocation();
  }

  getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyD2_6K7CF1C1ooSwgDxxDq2WBx8bAIihIU`)
            .then(response => response.json())
            .then(json => {
              console.log(json)
              this.setState({
                startDestination: json.results[0].formatted_address
              })
            })
          })
        },
    (error) => alert(error.message),
    )
  }

  sendMessage(event) {
     Communications.text('2253951571', 'React Native is great!')
    },
  (err)=> {console.log(err)}
  

  onPressSubmit(e) {
    e.persist()
    console.log(this.state)

    if (this.state.startDestination.length < 1) {
      this.setState({startError: "must contain a value"});
    } else {
      this.setState({startError: " "});
    }

    if (this.state.endDestination.length < 1) {
      this.setState({endError: "must contain a value"});
      return false; 
    } else {
      this.setState({endError: " "});
    }

    if (this.state.startDestination.length < 1) {return false}

    GoogleMapApi.convertToLatLong(this.state.startDestination)
    .then((startDest) => {
        GoogleMapApi.convertToLatLong(this.state.endDestination)
          .then((endDest) => {
                this.props.navigation.navigate('CommuteOptions2', {
                startDestination: this.state.startDestination,
                endDestination: this.state.endDestination,
                startDestinationLat: startDest.results[0].geometry.location.lat,
                startDestinationLng: startDest.results[0].geometry.location.lng, 
                endDestinationLat: endDest.results[0].geometry.location.lat,
                endDestinationLng: endDest.results[0].geometry.location.lng
              })
        }).catch((err) => {
          console.log(err)
          this.setState({endError: "must be a valid location"})
        })
    }).catch((err) => {
      console.log(err)
      this.setState({startError: "must be a valid location"})
    })  
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Start Destination:</Text>
        <Input
          placeholder= "enter start address"
          value={this.state.startDestination}
          onChangeText={(val) => {this.setState({startDestination: val})}}
          errorStyle={{ color: 'red' }}
          errorMessage={this.state.startError}
        />
        <Text>End Destination:</Text>
        <Input
          style={styles.textInput}
          placeholder='enter end address'
          value={this.state.endDestination}
          onChangeText={(val) => {this.setState({endDestination: val})}}
          errorStyle={{ color: 'red' }}
          errorMessage={this.state.endError}
        />
        <Button
          onPress={(e) => {this.onPressSubmit(e)}}
          title="SUBMIT"
          color="#FFF"
          style={styles.submit}
        />
        <Button
          title="Back"
          onPress={(event) => {this.sendMessage(event).bind(this)}}
        />
      </ScrollView>
    )
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
