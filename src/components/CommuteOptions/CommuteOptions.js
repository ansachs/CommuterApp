import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import GoogleMapApi from '../../apis/GoogleMapApi.js'
import UberApi from '../../apis/UberApi.js'

export default class CommuteOptions extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      transpo: []
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
      .then((response) => this.storeData({method:"drive", duration:response.routes[0].legs[0].duration.text, price:"Free"}))
    GoogleMapApi.fetchModeByWalking(startDestination, endDestination)
      .then((response) => this.storeData({method:"walk", duration:response.routes[0].legs[0].duration.text, price:"Free"}));
    GoogleMapApi.fetchModeByBicycling(startDestination, endDestination)
      .then((response) => this.storeData({method:"bike", duration:response.routes[0].legs[0].duration.text, price:"Free"}));
    GoogleMapApi.fetchModeByTransit(startDestination, endDestination)
      .then((response) => this.storeData({method:"transit", duration:response.routes[0].legs[0].duration.text, price:"2.00"}));

    UberApi.getDriverEtaToLocation(UberApi.serverToken, startLatitude, startLongitude, endLatitude, endLongitude)
      .then((response) => this.storeData({method:"UberX", 
        duration:(response.prices.filter(choice => choice.display_name === 'uberX')[0].duration/60).toString() + " mins", 
        price: response.prices.filter(choice => choice.display_name === 'uberX')[0].estimate
      }))
  }

  storeData(obj) {
    let current = {method: obj.method, price: obj.price, duration:obj.duration}
    this.setState({transpo: [...this.state.transpo, current]})
  }


  render() {

    const Divider = () => (
      <View style={{width: 1, backgroundColor: 'black'}}/>
      )
    
    const Row = (method, time, price, textStyle = null, rowStyle = null) => (
            <View style={styles.row} key={method}>
                <View style={[styles.tableCell, rowStyle]}> 
                  <Text style={styles.tableText, textStyle}> {method} </Text>
                </View>
                <Divider />
                <View style={[styles.tableCell, rowStyle]}> 
                  <Text style={styles.tableText, textStyle}> {time} </Text>
                </View>
                <Divider />
                <View style={[styles.tableCell, rowStyle]}> 
                  <Text style={styles.tableText, textStyle}> {price} </Text>
                </View>
            </View> )

    const colors = ['#a2c4f2', '#fff', '#edf0f4'];

    const commuteTable = this.state.transpo.map((transportMethod, index)=> {
        let color = colors[index%3]
        let rowStyle = StyleSheet.create({test: {backgroundColor: color}})
        return(Row(transportMethod.method, transportMethod.duration, transportMethod.price, null, rowStyle.test))
    })

    commuteTable.unshift(Row("Type", "ETA", "Price", styles.titleText,styles.titleCell))

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
    fontSize: 16
  },
  tableContainer: {
    borderStyle: 'solid', 
    borderWidth: 1
  },
  row: { 
    flex: 1, 
    alignSelf: 'stretch', 
    flexDirection: 'row', 
    width: '80%', 
    maxHeight: 40, 
    borderStyle: 'solid', 
    borderBottomWidth: 1
  },
  tableCell: { 
    flex: 1, 
    alignSelf: 'stretch', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  titleText: {
    "fontWeight": 'bold'
  },
  titleCell: {
    "backgroundColor": '#b3b8bf'
  }
})


