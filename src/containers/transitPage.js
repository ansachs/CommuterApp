import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapContainer from './MapContainer.js'

export default class transitPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDestination: this.props.navigation.state.params.startDestination,
      endDestination: this.props.navigation.state.params.endDestination,
      startLat: this.props.navigation.state.params.startLat,
      startLng: this.props.navigation.state.params.startLng,
      endLat: this.props.navigation.state.params.endLat,
      endLng: this.props.navigation.state.params.endLng
    }
  }

  render() {
    let { startDestination, endDestination, startLat, startLng, endLat, endLng } = this.state

    return (
      <View style={styles.container}>
        <MapContainer
          startDestination={startDestination}
          endDestination={endDestination}
          startLat={startLat}
          startLng={startLng}
          endLat={endLat}
          endLng={endLng}
          mode='transit'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
