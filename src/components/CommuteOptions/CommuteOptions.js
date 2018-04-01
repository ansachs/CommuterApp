import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import GoogleMapApi from '../../apis/GoogleMapApi.js'

export default class CommuteOptions extends React.Component {
  constructor(props) {
    super(props);

     this.state = {
      driveOutput: [],
      walkOutput: [],
      bicyclingOutput: [],
      transitOutput: []
    }
  }

  handleRunningLatePress() {
    this.props.navigation.navigate('RunningLate');
  }

  componentWillReceiveProps() {
    let startDestination = this.props.startDestination
    let endDestination = this.props.endDestination
    console.log(startDestination)
    GoogleMapApi.fetchModeByDrive(startDestination, endDestination)
      .then((response) => this.setState({
        driveOutput: [
          response.routes[0].legs[0].distance.text,
          response.routes[0].legs[0].duration.text]
      }));
    GoogleMapApi.fetchModeByWalking(startDestination, endDestination)
      .then((response) => this.setState({
        walkOutput: [
          response.routes[0].legs[0].distance.text,
          response.routes[0].legs[0].duration.text]
      }));
    GoogleMapApi.fetchModeByBicycling(startDestination, endDestination)
      .then((response) => this.setState({
        bicyclingOutput: [
          response.routes[0].legs[0].distance.text,
          response.routes[0].legs[0].duration.text]
      }));
    GoogleMapApi.fetchModeByTransit(startDestination, endDestination)
      .then((response) => this.setState({
        transitOutput: [
          response.routes[0].legs[0].distance.text,
          response.routes[0].legs[0].duration.text]
      }));
  }
 

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text>Driving DISTANCE:</Text>
          <Text>{this.state.driveOutput[0]}</Text>
          <Text>DURATION:</Text>
          <Text>{this.state.driveOutput[1]}</Text>
          <Text>Walking DISTANCE:</Text>
          <Text>{this.state.walkOutput[0]}</Text>
          <Text>DURATION:</Text>
          <Text>{this.state.walkOutput[1]}</Text>
          <Text>Bicycling DISTANCE:</Text>
          <Text>{this.state.bicyclingOutput[0]}</Text>
          <Text>DURATION:</Text>
          <Text>{this.state.bicyclingOutput[1]}</Text>
          <Text>Rail DISTANCE:</Text>
          <Text>{this.state.transitOutput[0]}</Text>
          <Text>DURATION:</Text>
          <Text>{this.state.transitOutput[1]}</Text>
        </View>

        <Button
          title="Running Late?"
          buttonStyle={{marginTop:20}}
          onPress={this.handleRunningLatePress.bind(this)}
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
})