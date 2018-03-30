import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class DestinationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      startDestination: 'start placeholder',
      endDestination: 'end placeholder'
    }
  }

  onPressSubmit() {
    console.log(this.state.startDestination)
    console.log(this.state.endDestination)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Start Destination:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(startDestination) => this.setState({startDestination})}
          value={this.state.startDestination}
        />

        <Text>End Destination:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(endDestination) => this.setState({endDestination})}
          value={this.state.endDestination}
        />

        <Button
          onPress={this.onPressSubmit.bind(this)}
          title="SUBMIT"
          color="#841584"
          style={styles.submit}
          accessibilityLabel="Learn more about this purple button"
        />
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

  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});
