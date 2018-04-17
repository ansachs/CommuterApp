import React from 'react';

import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet} from 'react-native';

export const CommuteOptionsMapView = (props) => {


let startLat = props.navParams.startDestinationLat;
let startLng = props.navParams.startDestinationLng;
let endLat = props.navParams.endDestinationLat;
let endLng = props.navParams.endDestinationLng;

return (
  <MapView
    initialRegion={{
      latitude: startLat,
      longitude: startLng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    style={styles.map}
    >

    <MapViewDirections
      origin={{
        latitude: startLat,
        longitude: startLng
      }}
      destination={{
        latitude: endLat,
        longitude: endLng
      }}
      apikey={'AIzaSyD2_6K7CF1C1ooSwgDxxDq2WBx8bAIihIU'}
      strokeWidth={3}
      strokeColor="red"
    />

    <MapView.Marker
      coordinate={{
        latitude: startLat,
        longitude: startLng
      }}
      title='Start Destination'
    />
    <MapView.Marker
      coordinate={{
        latitude: endLat,
        longitude: endLng
      }}
      title='End Destination'
    />
  </MapView>
)}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

})