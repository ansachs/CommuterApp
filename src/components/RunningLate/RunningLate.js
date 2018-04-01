import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

export default class RunningLate extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBack() {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Running Late?</Text>
        <Button
          title="Back"
          onPress={this.handleBack.bind(this)}
        />
      </ScrollView>
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
