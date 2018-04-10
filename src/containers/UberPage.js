import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapContainer from './MapContainer.js';
import { Button } from 'react-native-elements';
import UberApi from '../apis/UberApi.js'
export default class uberPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDestination: this.props.navigation.state.params.startDestination,
      endDestination: this.props.navigation.state.params.endDestination,
      startLat: this.props.navigation.state.params.startLat,
      startLng: this.props.navigation.state.params.startLng,
      endLat: this.props.navigation.state.params.endLat,
      endLng: this.props.navigation.state.params.endLng,
      request_id: '',
      status: ''
    }
  }

  requestRide() {
    let productId = '4bfc6c57-98c0-424f-a72e-c1e2a1d49939';
    let startLat = this.state.startLat;
    let startLng = this.state.startLng;
    let endLat = this.state.endLat;
    let endLng = this.state.endLng;

    UberApi.requestRide(productId, startLat, startLng, endLat, endLng)
    .then((response) => response.json())
    .then((requestJson) => {
      console.log(requestJson)
      this.setState({request_id: requestJson.request_id, status: requestJson.status})
    })
  }

  cancelRide() {
    // requestId = this.state.request_id
    // console.log(requestId)
    UberApi.cancelRide()
  }

  render() {
    console.log(this.state.request_id)
    console.log(this.state.status)
    let { startDestination, endDestination, startLat, startLng, endLat, endLng } = this.state

    return (
      <View style={{flex:1}}>
        <MapContainer
          startDestination={startDestination}
          endDestination={endDestination}
          startLat={startLat}
          startLng={startLng}
          endLat={endLat}
          endLng={endLng}
          mode='driving'
        />
        <View>
          <Button
            title='Request Ride'
            onPress={this.requestRide.bind(this)}
          />

          <Button
            title='Cancel Ride'
            onPress={this.cancelRide.bind(this)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});
