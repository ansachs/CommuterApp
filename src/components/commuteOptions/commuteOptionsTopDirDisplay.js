import React from 'react';

import { StyleSheet, Text, View } from 'react-native';


export const CommuteOptionsTopDirDisplay = (props) => {

  return(
    <View style={styles.destinationContainer}>
    <View style={{flex:1, borderRightWidth:1, borderColor:'#ccc', paddingLeft:20}}>
      <Text style={styles.destinationText}>Start Destination:</Text>
      <Text style={styles.destinationText} numberOfLines={1}>{props.navParams.startDestination}</Text>
    </View>
    <View style={styles.destinationCol}>
      <Text style={styles.destinationText}>End Destination:</Text>
      <Text style={styles.destinationText} numberOfLines={1}>{props.navParams.endDestination}</Text>
    </View>
  </View>)
}

const styles = StyleSheet.create({
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
})