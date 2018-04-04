import React from 'react';
import { StyleSheet, Text, View, ScrollView, ListView } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Button } from 'react-native-elements';
import GoogleMapApi from '../apis/GoogleMapApi.js'
import UberApi from '../apis/UberApi.js'
import LyftApi from '../apis/LyftApi.js'
import CommuterTable from '../components/commuteOptions/commuterOptionsTable'
import ParkWhizApi from '../apis/ParkWhizApi.js'
import Component5 from '../components/test.js'

export default class CommuteOptions extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
      transpo: [],
      listDataSource: ds
    }
  }

  handleRowOnPress = (method, navigationFunction) => {
    let commuteOption = this.state.transpo.filter(optionObject => optionObject.method === method)
    navigationFunction(`${method}Page`, {...commuteOption[0]})
  }

  renderRow(option, sectionId, rowId, highlightRow) {
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>{option.method} | {option.duration} | {option.price}</Text>
      </View>
    );
  }

  handleRunningLatePress() {
    this.props.navigation.navigate('RunningLate');
  }

  componentDidMount() {
    this.getCommuteOptionsData()
    console.log(this.state.transpo)
  }

  componentWillReceiveProps() {
    this.setState({
      transpo: []
    }, () => this.getCommuteOptionsData());
  }

  async getCommuteOptionsData() {
    let startDestination = this.props.navigation.state.params.startDestination
    let endDestination = this.props.navigation.state.params.endDestination
    let startDestinationLat = this.props.navigation.state.params.startDestinationLat
    let startDestinationLng = this.props.navigation.state.params.startDestinationLng
    let endDestinationLat = this.props.navigation.state.params.endDestinationLat
    let endDestinationLng = this.props.navigation.state.params.endDestinationLng


    GoogleMapApi.fetchModeByDrive(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => {
        ParkWhizApi.fetchModeByLatLong(endDestinationLat, endDestinationLng)
          .then((response2) => {
            this.storeData({method:"drive", duration:response.routes[0].legs[0].duration.text, price:response2.min_price})})})

    GoogleMapApi.fetchModeByWalking(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => this.storeData({method:"walk", duration:response.routes[0].legs[0].duration.text, price:"Free"}));
    GoogleMapApi.fetchModeByBicycling(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => this.storeData({method:"bike", duration:response.routes[0].legs[0].duration.text, price:"Free"}));
    GoogleMapApi.fetchModeByTransit(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => this.storeData({method:"transit", duration:response.routes[0].legs[0].duration.text, price:"2.00"}));

    UberApi.getDriverEtaToLocation(UberApi.serverToken, startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => this.storeData({method:"uber",
        duration:(response.prices.filter(choice => choice.display_name === 'uberX')[0].duration/60).toString() + " mins",
        price: response.prices.filter(choice => choice.display_name === 'uberX')[0].estimate
      }))

    LyftApi.getLyftUserToken()
      .then((token) => {
        LyftApi.getRideDetails(token.public_key, startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
        .then((response) => this.storeData({method:"lyft",
          duration:Math.round(response.cost_estimates.filter(choice => choice.ride_type === 'lyft')[0].estimated_duration_seconds/60).toString() + " mins",
          price: (response.cost_estimates.filter(choice => choice.ride_type === 'lyft')[0].estimated_cost_cents_min*0.01).toString()
        }))
      });
  }

  storeData(obj) {
    let current = {method: obj.method, price: obj.price, duration:obj.duration}
    this.setState({transpo: [...this.state.transpo, current]},
      this.setState({
        listDataSource: this.state.listDataSource.cloneWithRows(this.state.transpo)
      })
    )
  }


  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <CommuterTable
          transpo={this.state.transpo}
          handleRowOnPress={this.handleRowOnPress}
          navigationFunction={this.props.navigation.navigate}
        />

        <ListView
          enableEmptySections={true}
          dataSource={this.state.listDataSource}
          renderRow={this.renderRow.bind(this)}
        />

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f4f4f4',
    marginBottom: 3
  },

  rowText: {
    paddingTop: 10,
    paddingBottom:10
  }
})

