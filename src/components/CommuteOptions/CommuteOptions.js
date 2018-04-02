import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import GoogleMapApi from '../../apis/GoogleMapApi.js'
import UberApi from '../../apis/UberApi.js'

export default class CommuteOptions extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      driveOutput: ["drive", "walk", "bike", "publicTransit"],
      walkOutput: [],
      bicyclingOutput: [],
      transitOutput: [],
      uberOutput: {
        uberX: []
      }
    }
  }

  handleRunningLatePress() {
    // console.log('commute options')
    this.props.navigation.navigate('RunningLate');
  }

  componentDidMount() {
    let startDestination = this.props.navigation.state.params.startDestination
    let endDestination = this.props.navigation.state.params.endDestination
    let startLatitude = '41.8803557' // 73 w monroe latitude
    let startLongitude = '-87.630245' // 73 w monroe longitude
    let endLatitude = '41.8884096' // 222 merchandise mart latitude
    let endLongitude = '-87.6354498' // 222 merchandise mart longitude

    GoogleMapApi.fetchModeByDrive(startDestination, endDestination)
      .then((response) => this.setState({
        driveOutput: [
          response.routes[0].legs[0].distance.text,
          response.routes[0].legs[0].duration.text]
      }));
    GoogleMapApi.fetchModeByWalking(startDestination, endDestination)
      .then((response) => this.setState({
        walkOutput: [
          response.routes[0].legs[0].distance.text,
          response.routes[0].legs[0].duration.text]
      }));
    GoogleMapApi.fetchModeByBicycling(startDestination, endDestination)
      .then((response) => this.setState({
        bicyclingOutput: [
          response.routes[0].legs[0].distance.text,
          response.routes[0].legs[0].duration.text]
      }));
    GoogleMapApi.fetchModeByTransit(startDestination, endDestination)
      .then((response) => this.setState({
        transitOutput: [
          response.routes[0].legs[0].distance.text,
          response.routes[0].legs[0].duration.text]
      }));

    UberApi.getDriverEtaToLocation(UberApi.serverToken, startLatitude, startLongitude, endLatitude, endLongitude)
      .then((response) => this.setState({
        uberOutput: {
          uberX: [
            `${response.prices.filter(choice => choice.display_name === 'uberX')[0].duration/60} mins`,
            `${response.prices.filter(choice => choice.display_name === 'uberX')[0].distance} miles`,
            `${response.prices.filter(choice => choice.display_name === 'uberX')[0].estimate}`
          ]
        }
      }));
  }


  render() {

    let Divider = () => (
      <View style={{width: 1, backgroundColor: 'black', marginRight: 3, marginLeft: 3}}/>
      )
    
    let Row = (method, time, price) => (
            <View style={styles.row} key={method}>
                <View style={styles.tableCell}> 
                  <Text style={styles.tableText}> {method} </Text>
                </View>
                <Divider />
                <View style={styles.tableCell}> 
                  <Text style={styles.tableText}> {time} </Text>
                </View>
                <Divider />
                <View style={styles.tableCell}> 
                  <Text style={styles.tableText}> {price} </Text>
                </View>
            </View> )
            
    const state = this.state

    // debugger;
    const commuteTable = this.state.methods.map((method)=>{
      if (this.state[method].length > 0) {
        return Row(method, this.state[method][0], this.state[method][1]);
      } else {
        return null;
      }
    })

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.tableContainer}>
          {commuteTable}
        </View>

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
  },
  tableText: {
    fontSize: 10
  },
  tableContainer: {
    borderStyle: 'solid', 
    borderWidth: 1
  },
  row: { 
    flex: 1, 
    alignSelf: 'stretch', 
    flexDirection: 'row', 
    width: '40%', 
    maxHeight: 75, 
    borderStyle: 'solid', 
    borderBottomWidth: 1
  },
  tableCell: { 
    flex: 1, 
    alignSelf: 'stretch', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})