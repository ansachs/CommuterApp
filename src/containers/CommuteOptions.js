import React from 'react';

import { StyleSheet, Text, View, ScrollView, FlatList, Animated, Easing } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Button, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import GoogleMapApi from '../apis/GoogleMapApi.js'
import UberApi from '../apis/UberApi.js'
import LyftApi from '../apis/LyftApi.js'
import ParkWhizApi from '../apis/ParkWhizApi.js'
import { convertTime } from '../components/commuteOptions/commuteOptionsHelper'
import { CommuteOptionsMapView } from '../components/commuteOptions/commuteOptionsMapView'
import { CommuteOptionsTransportationList } from '../components/commuteOptions/commuteOptionsTransportationList'
import { CommuteOptionsTopDirDisplay } from '../components/commuteOptions/commuteOptionsTopDirDisplay'

export default class CommuteOptions extends React.Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0)
    this.state = {
      transpo: [],
      toggle: false,
    }
  }

  handleRowOnPress = (transportMethod) => {
    let commuteOption = this.state.transpo.filter(optionObject => optionObject.method === transportMethod)
    this.props.navigation.navigate("TravelPage", { ...commuteOption[0],...this.props.navigation.state.params})
  }

  componentDidMount() {
    this.getCommuteOptionsData();
  }

  componentWillReceiveProps() {
    this.setState({
      transpo: []
    }, () => this.getCommuteOptionsData());
  }

  getCommuteOptionsData  = async () => {

    const data = this.props.navigation.state.params
    console.log(data)

    GoogleMapApi.fetchModeByDrive(data.startDestinationLat, data.startDestinationLng, data.endDestinationLat, data.endDestinationLng)
      .then((response) => {
        ParkWhizApi.fetchModeByLatLong(data.endDestinationLat, data.endDestinationLng)
          .then((response2) => {
            this.storeData({method:"driving", duration:response.routes[0].legs[0].duration_in_traffic.text, price: `$${response2.min_price}.00`, icon:"car"})
          })
      })
      .catch((err) => {
      console.log("error in api", err)
      });


    GoogleMapApi.fetchModeByWalking(data.startDestinationLat, data.startDestinationLng, data.endDestinationLat, data.endDestinationLng)
      .then((response) => this.storeData({method:"walking", duration:response.routes[0].legs[0].duration.text, price:"Free", icon:"walk"})
        )
      .catch((err) => {
      console.log("error in api", err)
      });

    GoogleMapApi.fetchModeByBicycling(data.startDestinationLat, data.startDestinationLng, data.endDestinationLat, data.endDestinationLng)
      .then((response) => this.storeData({method:"bicycling", duration:response.routes[0].legs[0].duration.text, price:"Free", icon:"bike"})
        )
      .catch((err) => {
      console.log("error in api", err)
      });

    GoogleMapApi.fetchModeByTransit(data.startDestinationLat, data.startDestinationLng, data.endDestinationLat, data.endDestinationLng)
      .then((response) => this.storeData({method:"transit", duration:response.routes[0].legs[0].duration.text, price:"$2.50", icon:"train"})
        )
      .catch((err) => {
      console.log("error in api", err)
      });

      // LyftApi.getLyftUserToken()
      //   .then((token) => {
      //     LyftApi.getRideDetails(token.public_key, this.startDestinationLat, this.startDestinationLng, endDestinationLat, endDestinationLng)
      //     .then((response) => this.storeData({method:"lyft",
      //       duration:Math.round(response.cost_estimates.filter(choice => choice.ride_type === 'lyft')[0].estimated_duration_seconds/60).toString() + " mins",
      //       price: (respon73 2se.cost_estimates.filter(choice => choice.ride_type === 'lyft')[0].estimated_cost_cents_min*0.01).toString(),
      //       icon:"car"
      //     }))
      //   });

    UberApi.getDriverEtaToLocation(UberApi.serverToken, data.startDestinationLat, data.startDestinationLng, data.endDestinationLat, data.endDestinationLng)
      .then((response) => {
        this.storeData({method:"uber",
          duration:(response.prices.filter(choice => choice.display_name === 'uberX')[0].duration/60).toString() + " mins",
          price: response.prices.filter(choice => choice.display_name === 'uberX')[0].estimate,
          icon:"uber"
        })
      })
      .catch((err) => {
      console.log("error in api", err)
      });
  }

  storeData(obj) {
    let current = {method: obj.method, price: obj.price, duration:obj.duration, icon:obj.icon, convert:convertTime(obj.duration)}
    this.setState({transpo: [...this.state.transpo, current]})
  }

  spring() {
    this.setState({
      toggle: !this.state.toggle
    });

    if (this.state.toggle) {
      this.springValue.setValue(1)
      Animated.spring(
        this.springValue,
        {
          toValue: 0,
        }
      ).start()
    } else {
      this.springValue.setValue(0)
      Animated.spring(
        this.springValue,
        {
          toValue: 1,
        }
      ).start()
    }
  }

  render() {
    const maxHeight = this.springValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['6.5%', '100%']
    })

    let dropDownIcon = this.state.toggle ? 'arrow-down-drop-circle' : 'arrow-right-drop-circle'

  return (
    <View style={styles.container}>
      <CommuteOptionsTopDirDisplay navParams={this.props.navigation.state.params} />

      <View style={styles.mapContainer}>
        <CommuteOptionsMapView navParams={this.props.navigation.state.params} />
      </View>

      <Animated.View style={{maxHeight: maxHeight}}>
        <Button
          title='Commute Options'
          onPress={this.spring.bind(this)}
          icon={
            <Icon
              name={dropDownIcon}
              size={20}
              color='white'
              type='material-community'
            />
          }
          iconRight
        />
        <CommuteOptionsTransportationList 
          transportTable={this.state.transpo} 
          handleRowOnPress={this.handleRowOnPress}
          />
      </Animated.View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    // justifyContent: 'center',
  },
  mapContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})


