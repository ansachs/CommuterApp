import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default class drivePage extends React.Component {
  render() {
    let startLat = this.props.navigation.state.params.startLat
    let startLng = this.props.navigation.state.params.startLng
    let endLat = this.props.navigation.state.params.endLat
    let endLng = this.props.navigation.state.params.endLng
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
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
        </View>

        <Text style={{fontSize: 25}}>Drive</Text>
        <View>
          <Text>Distance:</Text>
          <Text>{this.props.navigation.state.params.duration}</Text>
        </View>
        <View>
          <Text>Price:</Text>
          <Text>{this.props.navigation.state.params.price}</Text>
        </View>
      </View>
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

  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
