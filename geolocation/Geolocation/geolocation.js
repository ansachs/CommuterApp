import React, { Component } from 'react'
import { View, Text, Switch, StyleSheet} from 'react-native'

class Geolocation extends Component {
   state = {
      initialPosition: '',
      lastPosition: 'pivotal labs',
   }

   componentDidMount = () => {

         navigator.geolocation.getCurrentPosition(
         (position) => {
          
            const initialPosition = JSON.stringify(position);
            this.setState({ initialPosition });
         },

         (error) => alert(error.message),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      // this.state.watchID = navigator.geolocation.watchPosition((position) => {
      //    const lastPosition = JSON.stringify(position);
      //    this.setState({ lastPosition });
      // });
   }
   componentWillUnmount = () => {
      navigator.geolocation.clearWatch(this.watchID);
   }
   render() {
      
      var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
      };

      function success(pos) {
         latitude = (pos.coords.latitude)
         longitude = (pos.coords.longitude)
         pos = `${latitude},${longitude}`
            `https://maps.googleapis.com/maps/api/geocode/json?address=${pos}&key=AIzaSyD2_6K7CF1C1ooSwgDxxDq2WBx8bAIihIU`).then((something) => {
            console.log(something)
          })
         
         
         const convertToLatLong = (pos) => {
         return 
         }

      var crd = pos.coords;

      console.log(`Your current position is: ${convertToLatLong}`);
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      }

      function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      }

   navigator.geolocation.getCurrentPosition(success, error, options);
      return (



         <View style = {styles.container}>
            <Text style = {styles.boldText}>
               Initial position:
            </Text>
            <Text>
               {this.state.initialPosition}
            </Text>

            <Text style = {styles.boldText}>
               Current position:
            </Text>
             
            <Text>
              
            </Text>
                         
         </View>
      )
   }
}
export default Geolocation

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50
   },
   boldText: {
      fontSize: 30,
      color: 'red',
   }
})
