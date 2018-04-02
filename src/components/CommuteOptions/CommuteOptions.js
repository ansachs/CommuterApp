import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import GoogleMapApi from '../../apis/GoogleMapApi.js'

export default class CommuteOptions extends React.Component {
  constructor(props) {
    super(props);

     this.state = {
      methods: ["drive", "walk", "bike", "publicTransit"],
      drive: [],
      walk: [],
      bike: [],
      publicTransit: []
    }
  }

  handleRunningLatePress() {
    // console.log('commute options')
    this.props.navigation.navigate('RunningLate');
  }

  componentDidMount() {
    // if(this.props.navigation.state.params) {
      let startDestination = this.props.navigation.state.params.startDestination
      let endDestination = this.props.navigation.state.params.endDestination
      console.log(startDestination)
      GoogleMapApi.fetchModeByDrive(startDestination, endDestination)
        .then((response) => this.setState({
          drive: [
            response.routes[0].legs[0].distance.text,
            response.routes[0].legs[0].duration.text]
        }));
      GoogleMapApi.fetchModeByWalking(startDestination, endDestination)
        .then((response) => this.setState({
          walk: [
            response.routes[0].legs[0].distance.text,
            response.routes[0].legs[0].duration.text]
        }));
      GoogleMapApi.fetchModeByBicycling(startDestination, endDestination)
        .then((response) => this.setState({
          bike: [
            response.routes[0].legs[0].distance.text,
            response.routes[0].legs[0].duration.text]
        }));
      GoogleMapApi.fetchModeByTransit(startDestination, endDestination)
        .then((response) => this.setState({
          publicTransit: [
            response.routes[0].legs[0].distance.text,
            response.routes[0].legs[0].duration.text]
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