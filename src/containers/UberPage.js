import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class UberPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Uber Page</Text>
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
  },
});
