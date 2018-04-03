import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import GoogleMapApi from '../apis/GoogleMapApi.js'
import CommuteOptions from './CommuteOptions'

export default class DestinationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      startDestination: '1541 n bosworth',
      endDestination: '73 w monroe'
    }
  }

  onPressSubmit() {
    this.props.navigation.navigate('CommuteOptions2', {startDestination: this.state.startDestination, endDestination: this.state.endDestination})
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>Start Destination:</Text>
        <Input
          placeholder='INPUT WITH ICON'
          //onChangeText={(startDestination) => this.setState({startDestination})}
          placeholder='enter start address'
        />
        <Text>End Destination:</Text>
        <Input
          style={styles.textInput}
          //onChangeText={(endDestination) => this.setState({endDestination})}
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
