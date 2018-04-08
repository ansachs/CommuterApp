import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapContainer from './MapContainer.js'

export default class UberPage extends React.Component {
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
