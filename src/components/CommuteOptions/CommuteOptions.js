import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import GoogleMapApi from '../../apis/GoogleMapApi.js'
import UberApi from '../../apis/UberApi.js'

export default class CommuteOptions extends React.Component {
  constructor(props) {
    super(props);

     this.state = {
      driveOutput: [],
      walkOutput: [],
      bicyclingOutput: [],
      transitOutput: [],
      uberOutput: {
        uberX: []
      }
    }
  }



  handleRunningLatePress() {
    this.props.navigation.navigate('RunningLate');
  }

  componentDidMount() {
    let startDestination = this.props.navigation.state.params.startDestination
    let endDestination = this.props.navigation.state.params.endDestination
    let startLatitude = '41.8803557' // 73 w monroe latitude
    let startLongitude = '-87.630245' // 73 w monroe longitude
    let endLatitude = '41.8884096' // 222 merchandise mart latitude
    let endLongitude = '-87.6354498' // 222 merchandise mart longitude

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

    UberApi.getDriverEtaToLocation(UberApi.serverToken, startLatitude, startLongitude, endLatitude, endLongitude)
      .then((response) => this.setState({
        uberOutput: {
          uberX: [
            `${response.prices.filter(choice => choice.display_name === 'uberX')[0].duration/60} mins`,
            `${response.prices.filter(choice => choice.display_name === 'uberX')[0].distance} miles`,
            `${response.prices.filter(choice => choice.display_name === 'uberX')[0].estimate}`
          ]
        }
      }));
  }


  render() {

    console.log(this.state)
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
          <Text>Uber DISTANCE:</Text>
          <Text>{this.state.uberOutput.uberX[0]}</Text>
          <Text>DURATION:</Text>
          <Text>{this.state.uberOutput.uberX[1]}</Text>
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
