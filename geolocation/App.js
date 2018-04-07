import React, { Component } from 'react';
import { Text, View, BackHandler } from 'react-native';
import Geolocation from './Geolocation/geolocation.js'
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";


class Home extends Component {
    
   render() {

      return (
      <Geolocation />
    )
  }
}
export default Home;


// 41.896854
// -87.629397
