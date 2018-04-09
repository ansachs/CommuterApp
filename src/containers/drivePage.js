import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapContainer from './MapContainer.js'
import { Text, Linking, Button } from 'react-native';

export default class drivePage extends React.Component {
  render() {

    let startLat = this.props.navigation.state.params.startLat;
    let startLng = this.props.navigation.state.params.startLng;
    let endLat = this.props.navigation.state.params.endLat;
    let endLng = this.props.navigation.state.params.endLng;

    return (
      <View style={styles.container}>
        <MapContainer
          startLat={startLat}
          startLng={startLng}
          endLat={endLat}
          endLng={endLng}
          mode='driving'
        />
        <View>
          <Button 
          title='ParkWhiz'
          style={{color: 'blue'}}
          onPress={() => Linking.openURL(`https://parkwhiz.com/search/?lat=${endLat}&lng=${endLng}&start=1522637722&end=1522648522&key=62d882d8cfe5680004fa849286b6ce20`)}>
          ParkWhiz
          </Button>
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
});
