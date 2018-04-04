import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import GoogleMapApi from '../apis/GoogleMapApi.js'
import CommuteOptions from './CommuteOptions.js'

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

  onPressSubmit() {
    GoogleMapApi.convertToLatLong(this.state.startDestination)
      .then((response) => {
        GoogleMapApi.convertToLatLong(this.state.endDestination)
          .then((response2) => {
            this.props.navigation.navigate('CommuteOptions2', {
            startDestination: this.state.startDestination,
            endDestination: this.state.endDestination,
            startDestinationLat: response.results[0].geometry.location.lat,
            startDestinationLng: response.results[0].geometry.location.lng, 
            endDestinationLat: response2.results[0].geometry.location.lat,
            endDestinationLng: response2.results[0].geometry.location.lng
          })
        });
      } 
    );

  }

  render() {
    let start = this.state.startDestination
  console.log(start)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Start Destination:</Text>
        <Input
          placeholder= {start}
          value={this.state.startDestination}
        />
        <Text>End Destination:</Text>
        <Input
          style={styles.textInput}
          onChangeText={(endDestination) => this.setState({endDestination})}
          placeholder='enter end address'
        />
        <Button
          onPress={this.onPressSubmit.bind(this)}
          title="SUBMIT"
          color="#FFF"
          style={styles.submit}
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
