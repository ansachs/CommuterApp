import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import GoogleMapApi from '../apis/GoogleMapApi.js'
import UberApi from '../apis/UberApi.js'
import CommuterTable from '../components/commuteOptions/commuterOptionsTable'
import ParkWhizApi from '../apis/ParkWhizApi.js'

export default class CommuteOptions extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      transpo: []
    }
  }

  handleRunningLatePress() {
    // console.log('commute options')
    this.props.navigation.navigate('RunningLate');
  }

  componentDidMount() {
     let startDestination = this.props.navigation.state.params.startDestination
    let endDestination = this.props.navigation.state.params.endDestination
    let startDestinationLat = this.props.navigation.state.params.startDestinationLat
    let startDestinationLng = this.props.navigation.state.params.startDestinationLng
    let endDestinationLat = this.props.navigation.state.params.endDestinationLat
    let endDestinationLng = this.props.navigation.state.params.endDestinationLng


    GoogleMapApi.fetchModeByDrive(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => {
        ParkWhizApi.fetchModeByLatLong(endDestinationLat, endDestinationLng)
          .then((response2) => {
            console.log(response2)
            this.storeData({method:"drive", duration:response.routes[0].legs[0].duration.text, price:response2.min_price})})})
      
    GoogleMapApi.fetchModeByWalking(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => this.storeData({method:"walk", duration:response.routes[0].legs[0].duration.text, price:"Free"}));
    GoogleMapApi.fetchModeByBicycling(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => this.storeData({method:"bike", duration:response.routes[0].legs[0].duration.text, price:"Free"}));
    GoogleMapApi.fetchModeByTransit(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => this.storeData({method:"transit", duration:response.routes[0].legs[0].duration.text, price:"2.00"}));

    UberApi.getDriverEtaToLocation(UberApi.serverToken, startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => this.storeData({method:"UberX",
        duration:(response.prices.filter(choice => choice.display_name === 'uberX')[0].duration/60).toString() + " mins",
        price: response.prices.filter(choice => choice.display_name === 'uberX')[0].estimate
      }))
  }

  storeData(obj) {
    let current = {method: obj.method, price: obj.price, duration:obj.duration}
    this.setState({transpo: [...this.state.transpo, current]})
  }


  render() {

    return (
      <ScrollView contentContainerStyle={styles.container}>

        <CommuterTable transpo={this.state.transpo} />

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
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

