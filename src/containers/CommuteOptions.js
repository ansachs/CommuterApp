import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Animated, Easing } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Button, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import GoogleMapApi from '../apis/GoogleMapApi.js'
import UberApi from '../apis/UberApi.js'
import LyftApi from '../apis/LyftApi.js'
import CommuterTable from '../components/commuteOptions/commuterOptionsTable'
import ParkWhizApi from '../apis/ParkWhizApi.js'

export default class CommuteOptions extends React.Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0)
    this.state = {
      transpo: [],
      toggle: false,
    }
  }

  handleRowOnPress(transportMethod) {
    let commuteOption = this.state.transpo.filter(optionObject => optionObject.method === transportMethod)
    this.props.navigation.navigate(`${transportMethod}Page`, {
      ...commuteOption[0],
      startLat: this.props.navigation.state.params.startDestinationLat,
      startLng: this.props.navigation.state.params.startDestinationLng,
      endLat: this.props.navigation.state.params.endDestinationLat,
      endLng: this.props.navigation.state.params.endDestinationLng,
      startDestination: this.props.navigation.state.params.startDestination,
      endDestination: this.props.navigation.state.params.endDestination
    })
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


    GoogleMapApi.fetchModeByDrive(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      .then((response) => {
        ParkWhizApi.fetchModeByLatLong(endDestinationLat, endDestinationLng)
          .then((response2) => {
            this.storeData({method:"drive", duration:response.routes[0].legs[0].duration_in_traffic.text, price:response2.min_price, icon:"car"})
          })
        })
        .catch((err) => {
        console.log("error in api", err)
        });


      GoogleMapApi.fetchModeByWalking(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
        .then((response) => this.storeData({method:"walk", duration:response.routes[0].legs[0].duration.text, price:"Free", icon:"walk"})
          )
        .catch((err) => {
        console.log("error in api", err)
        });
      GoogleMapApi.fetchModeByBicycling(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
        .then((response) => this.storeData({method:"bike", duration:response.routes[0].legs[0].duration.text, price:"Free", icon:"bike"})
          )
        .catch((err) => {
        console.log("error in api", err)
        });
      GoogleMapApi.fetchModeByTransit(startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
        .then((response) => this.storeData({method:"transit", duration:response.routes[0].legs[0].duration.text, price:"2.00", icon:"train"})
          )
        .catch((err) => {
        console.log("error in api", err)
        });

      // LyftApi.getLyftUserToken()
      //   .then((token) => {
      //     LyftApi.getRideDetails(token.public_key, startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
      //     .then((response) => this.storeData({method:"lyft",
      //       duration:Math.round(response.cost_estimates.filter(choice => choice.ride_type === 'lyft')[0].estimated_duration_seconds/60).toString() + " mins",
      //       price: (respon73 2se.cost_estimates.filter(choice => choice.ride_type === 'lyft')[0].estimated_cost_cents_min*0.01).toString(),
      //       icon:"car"
      //     }))
      //   });

      UberApi.getDriverEtaToLocation(UberApi.serverToken, startDestinationLat, startDestinationLng, endDestinationLat, endDestinationLng)
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
<<<<<<< HEAD
  
=======


>>>>>>> 957bf75d9499784987de23fefa2fa5e8b0695801
  convert(duration) {
    if (duration[2] === 'd' && duration[10] === 'h') {
      return ((parseInt(duration[0]) * 24) * (60)) + ((parseInt(duration[7])* 10) * 60) + (parseInt(duration[8])* 60)
    }
    else if (duration[2] === 'd' && duration[9] === 'h'&& duration[5] === 's') {
      return ((parseInt(duration[0]) * 24) * (60)) + (parseInt(duration[7]) * 60)
    }
     else if (duration[2] === 'd' && duration[9] === 'h' && duration[13] === 's') {
      return ((parseInt(duration[0]) * 24) * (60)) + ((parseInt(duration[6]) * 10) * 60) + (parseInt(duration[7])* 60)
    }
    else if (duration[2] === 'd' && duration[8] === 'h') {
      return ((parseInt(duration[0]) * 24) * (60)) + (parseInt(duration[6]) * 60)
    }
    else if (duration[3] === 'h' && duration[12] === 'm') {
      return ((parseInt(duration[0]) * 10) * 60) + (parseInt(duration[1]) * 60) + (parseInt(duration[9]) * 10) + parseInt(duration[10])
    }
    else if (duration[3] === 'h' && duration[11] === 'm') {
      return ((parseInt(duration[0]) * 10) * 60) + (parseInt(duration[1]) * 60) + parseInt(duration[9])  
    }
    else if (duration[2] === 'h' && duration[11] === 'm') {
      return (parseInt(duration[0]) * 60) + ((parseInt(duration[8]) * 10)) + parseInt(duration[9])  
    }
    else if (duration[2] === 'h' && duration[10] === 'm' && duration[13] === 's'&& duration[6] === 's') {
      return (parseInt(duration[0]) * 60) + parseInt(duration[8])  
    }
    else if (duration[2] === 'h' && duration[10] === 'm' && duration[13] === 's') {
      return (parseInt(duration[0]) * 60) + ((parseInt(duration[7]) * 10)) + parseInt(duration[8])
    }
    
    else if (duration[2] === 'h' && duration[9] === 'm') {
      return (parseInt(duration[0]) * 60) + parseInt(duration[7])  
    }
    else if (duration[3] === 'm') {
      return (parseInt(duration[0]) * 10) + parseInt(duration[1])  
    }
    else if (duration[2] === 'm') {
      return parseInt(duration[0])
    }
  }



  storeData(obj) {

    let current = {method: obj.method, price: obj.price, duration:obj.duration, icon:obj.icon, convert:this.convert(obj.duration)}

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
    // const maxHeight = this.springValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['6.5%', '100%']
    // })

    // let dropDownIcon = this.state.toggle ? 'arrow-down-drop-circle' : 'arrow-right-drop-circle'

    // let startLat = this.props.navigation.state.params.startDestinationLat
    // let startLng = this.props.navigation.state.params.startDestinationLng
    // let endLat = this.props.navigation.state.params.endDestinationLat
    // let endLng = this.props.navigation.state.params.endDestinationLng
    // console.log(this.state.transpo)
    return (
      <View style={styles.container}> 
      {/*
        // <View style={styles.destinationContainer}>
        //   <View style={{flex:1, borderRightWidth:1, borderColor:'#ccc', paddingLeft:20}}>
        //     <Text style={styles.destinationText}>Start Destination:</Text>
        //     <Text style={styles.destinationText} numberOfLines={1}>{this.props.navigation.state.params.startDestination}</Text>
        //   </View>
        //   <View style={styles.destinationCol}>
        //     <Text style={styles.destinationText}>End Destination:</Text>
        //     <Text style={styles.destinationText} numberOfLines={1}>{this.props.navigation.state.params.endDestination}</Text>
        //   </View>
        // </View>

        // <View style={styles.mapContainer}>
        //   <MapView
        //     initialRegion={{
        //       latitude: startLat,
        //       longitude: startLng,
        //       latitudeDelta: 0.0922,
        //       longitudeDelta: 0.0421,
        //     }}
        //     style={styles.map}
        //   >

        //     <MapViewDirections
        //       origin={{
        //         latitude: startLat,
        //         longitude: startLng
        //       }}
        //       destination={{
        //         latitude: endLat,
        //         longitude: endLng
        //       }}
        //       apikey={'AIzaSyD2_6K7CF1C1ooSwgDxxDq2WBx8bAIihIU'}
        //       strokeWidth={3}
        //       strokeColor="red"
        //     />

        //     <MapView.Marker
        //       coordinate={{
        //         latitude: startLat,
        //         longitude: startLng
        //       }}
        //       title='Start Destination'
        //     />
        //     <MapView.Marker
        //       coordinate={{
        //         latitude: endLat,
        //         longitude: endLng
        //       }}
        //       title='End Destination'
        //     />
        //   </MapView>
        // </View>

        // <Animated.View
        //   style={{maxHeight: maxHeight}}
        // >
        //   <Button
        //     title='Commute Options'
        //     onPress={this.spring.bind(this)}
        //     icon={
        //       <Icon
        //         name={dropDownIcon}
        //         size={20}
        //         color='white'
        //         type='material-community'
        //       />
        //     }
        //     iconRight
        //   />
        //   <FlatList
        //     data={this.state.transpo.sort((a , b) => (a.convert) - (b.convert))}
        //     data={this.state.transpo}
        //     renderItem={({item}) => (
        //       <ListItem
        //         title={item.method.toUpperCase()}
        //         leftIcon={{
        //           name: `${item.icon}`,
        //           type: 'material-community',
        //           style: { marginRight: 20, fontSize: 30 }
        //         }}
        //         rightIcon={{
        //           name: 'chevron-right',
        //           type: 'material-community',
        //           style: { marginRight: 20, fontSize: 30 }
        //         }}
        //         containerStyle={{backgroundColor: '#fff', borderBottomWidth:1}}
        //         subtitle={
        //           <View>
        //             <Text>Duration: {item.duration}</Text>
        //             <Text>Price: {item.price}</Text>
        //           </View>
        //         }
        //         onPress={() => this.handleRowOnPress(item.method)}
        //       />
        //     )}
        //     keyExtractor={item => item.method}
        //   />
        // </Animated.View> 
        */}
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

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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


