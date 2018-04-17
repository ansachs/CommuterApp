import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions'

export default travelPageMap = (props) => {

let { method, startDestination, endDestination, startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng } = props.params;

  handleGetGoogleMapDirections = () => {
    const data = {
      source: {
        latitude: startDestinationLat,
        longitude: startDestinationLng
      },
      destination: {
        latitude: endDestinationLat,
        longitude: endDestinationLng
      },
      params: [
        {
          key: 'travelmode',
          value: method
        },
        {
          key: 'dir_action',
          value: 'navigate'
        }
      ]
    };

    getDirections(data)
  };

    return (
      <View style={styles.container}>

        <View style={styles.destinationContainer}>
          <View style={{flex:1, borderRightWidth:1, borderColor:'#ccc', paddingLeft:20}}>
            <Text style={styles.destinationText}>Start Destination:</Text>
            <Text style={styles.destinationText} numberOfLines={1}>{startDestination}</Text>
          </View>
          <View style={styles.destinationCol}>
            <Text style={styles.destinationText}>End Destination:</Text>
            <Text style={styles.destinationText} numberOfLines={1}>{endDestination}</Text>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: startDestinationLat,
              longitude: startDestinationLng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
          >

            <MapViewDirections
              origin={{
                latitude: startDestinationLat,
                longitude: startDestinationLng
              }}
              destination={{
                latitude: endDestinationLat,
                longitude: endDestinationLng
              }}
              apikey={'AIzaSyD2_6K7CF1C1ooSwgDxxDq2WBx8bAIihIU'}
              strokeWidth={3}
              strokeColor='red'
              mode={method}
            />

            <MapView.Marker
              coordinate={{
                latitude: startDestinationLat,
                longitude: startDestinationLng
              }}
            >
              <MapView.Callout>
                <Text>Start Destination</Text>
              </MapView.Callout>
            </MapView.Marker>

            <MapView.Marker
              coordinate={{
                latitude: endDestinationLat,
                longitude: endDestinationLng
              }}
              title='End Destination'
            >
              <MapView.Callout onPress={handleGetGoogleMapDirections.bind(this)}>
                <Text>Press to Get Direction</Text>
              </MapView.Callout>
            </MapView.Marker>
          </MapView>
        </View>

      </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },

  destinationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#fff'
  },

  destinationCol: {
    flex: 1,
    padding: 20,
  },

  mapContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    maxHeight: '100%'
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
