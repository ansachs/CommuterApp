import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DestinationForm from './src/components/DestinationForm/DestinationForm.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DestinationForm />
      </View>
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
});
