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
      endDestination: ''
    }
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
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Start Destination:</Text>
        <Input
          onChangeText={(startDestination) => this.setState({startDestination})}
          placeholder='enter start address'
          value={this.startDestination}
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
