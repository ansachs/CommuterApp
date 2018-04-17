import React from 'react';
import { StyleSheet, View } from 'react-native';
import TravelPageMap from '../components/travelPage/travelPageMap.js'
import { Text, Linking, Button } from 'react-native';

const renderMethodSpecific = function(props) {

  let { method, startDestination, endDestination, startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng } = props;

  switch (method) {

    case "driving":
      return (
        <Button 
          title='ParkWhiz'
          style={{color: 'blue'}}
          onPress={() => Linking.openURL(`https://parkwhiz.com/search/?lat=${endDestinationLat}&lng=${endDestinationLng}&start=1522637722&end=1522648522&key=62d882d8cfe5680004fa849286b6ce20`)}>
          ParkWhiz
          </Button>
        );
    default:
    break;
  }
}
 
export default class drivePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let methodSpecific = renderMethodSpecific(this.props.navigation.state.params)

    return (
      <View style={styles.container}>
        <TravelPageMap params={this.props.navigation.state.params}/>
        <View>
          {methodSpecific}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
