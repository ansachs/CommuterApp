import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Button, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleMapApi from '../apis/GoogleMapApi.js'
import UberApi from '../apis/UberApi.js'
import LyftApi from '../apis/LyftApi.js'
import CommuterTable from '../components/commuteOptions/commuterOptionsTable'
import ParkWhizApi from '../apis/ParkWhizApi.js'

export default class CommuteOptions extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      transpo: []
    }
  }

  handleRowOnPress(transportMethod) {
    let commuteOption = this.state.transpo.filter(optionObject => optionObject.method === transportMethod)
    this.props.navigation.navigate(`${transportMethod}Page`, {...commuteOption[0]})
  }

  handleRunningLatePress() {
    this.props.navigation.navigate('RunningLate');
  }

  componentDidMount() {
    this.getCommuteOptionsData();
  }

  componentWillReceiveProps() {
    this.setState({
      transpo: []
    }, () => this.getCommuteOptionsData());
  }

  getCommuteOptionsData() {
    let startDestination = this.props.navigation.state.params.startDestination
    let endDestination = this.props.navigation.state.params.endDestination
    let startDestinationLat = this.props.navigation.state.params.startDestinationLat
    let startDestinationLng = this.props.navigation.state.params.startDestinationLng
    let endDestinationLat = this.props.navigation.state.params.endDestinationLat
    let endDestinationLng = this.props.navigation.state.params.endDestinationLng


  try {
    GoogleMapApi.fetchModeByDrive(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => {
        ParkWhizApi.fetchModeByLatLong(endDestinationLat, endDestinationLng)
          .then((response2) => {
            this.storeData({method:"drive", duration:response.routes[0].legs[0].duration.text, price:response2.min_price, icon:"car"})})})

    GoogleMapApi.fetchModeByWalking(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => this.storeData({method:"walk", duration:response.routes[0].legs[0].duration.text, price:"Free", icon:"walk"}));
    GoogleMapApi.fetchModeByBicycling(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => this.storeData({method:"bike", duration:response.routes[0].legs[0].duration.text, price:"Free", icon:"bike"}));
    GoogleMapApi.fetchModeByTransit(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => this.storeData({method:"transit", duration:response.routes[0].legs[0].duration.text, price:"2.00", icon:"train"}));

    LyftApi.getLyftUserToken()
      .then((token) => {
        LyftApi.getRideDetails(token.public_key, startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
        .then((response) => this.storeData({method:"lyft",
          duration:Math.round(response.cost_estimates.filter(choice => choice.ride_type === 'lyft')[0].estimated_duration_seconds/60).toString() + " mins",
          price: (response.cost_estimates.filter(choice => choice.ride_type === 'lyft')[0].estimated_cost_cents_min*0.01).toString(),
          icon:"car"
        }))
      });

    UberApi.getDriverEtaToLocation(UberApi.serverToken, startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => this.storeData({method:"uber",
        duration:(response.prices.filter(choice => choice.display_name === 'uberX')[0].duration/60).toString() + " mins",
        price: response.prices.filter(choice => choice.display_name === 'uberX')[0].estimate,
        icon:"uber"
      }))
    } catch(err) {console.log(err)}
  }

  storeData(obj) {
    let current = {method: obj.method, price: obj.price, duration:parseInt(obj.duration.replace(/\D+/,'')), icon:obj.icon}
    this.setState({transpo: [...this.state.transpo, current]})
  }


  render() {
    const list = [...this.state.transpo]
    return (
      <ScrollView contentContainerStyle={styles.container}>

        {/*<CommuterTable
          transpo={this.state.transpo}
          handleRowOnPress={this.handleRowOnPress}
          navigationFunction={this.props.navigation.navigate}
        />*/}

        <View style={styles.destinationContainer}>
          <View style={{flex:1, padding:20, borderRightWidth:1, borderColor:'#ccc', borderBottomWidth:1}}>
            <Text style={styles.destinationText}>Start Destination:</Text>
            <Text style={styles.destinationText}>{this.props.navigation.state.params.startDestination}</Text>
          </View>
          <View style={styles.destinationCol}>
            <Text style={styles.destinationText}>End Destination:</Text>
            <Text style={styles.destinationText}>{this.props.navigation.state.params.endDestination}</Text>
          </View>
        </View>

        <View style={{backgroundColor:'#737373', flexDirection:'row', justifyContent:'center', paddingVertical:10}}>
          <Text style={{color:'#fff'}}>Fastest Option</Text>
        </View>
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.method.toUpperCase()}
              leftIcon={{
                name: `${item.icon}`,
                type: 'material-community',
                style: { marginRight: 20, fontSize: 30 }
              }}
              style={styles.listItem}
              containerStyle={{backgroundColor: '#fff', marginBottom:5}}
              subtitle={
                <View>
                  <Text>Duration: {item.duration}</Text>
                  <Text>Price: {item.price}</Text>
                </View>
              }
              onPress={() => this.handleRowOnPress(item.method)}
              component={TouchableOpacity}
            />
          ))
        }

        <Button
          title="Running Late?"
          buttonStyle={{marginTop:5}}
          onPress={this.handleRunningLatePress.bind(this)}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    // justifyContent: 'center',
  },

  listItem: {
    flexDirection: 'row',
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
    borderBottomWidth:1,
    borderColor:'#ccc'
  },

  // destinationText: {
  //   color: 'white'
  // }
  // headingContainer: {
  //   alignItems: 'center',
  //   marginBottom: 20
  // },

  // headingText: {
  //   fontSize: 25,
  //   fontWeight: 'bold'
  // },
})

