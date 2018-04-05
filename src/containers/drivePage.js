import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class drivePage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25}}>Drive</Text>
        <View>
          <Text>Distance:</Text>
          <Text>{this.props.navigation.state.params.duration}</Text>
        </View>
        <View>
          <Text>Price:</Text>
          <Text>{this.props.navigation.state.params.price}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
