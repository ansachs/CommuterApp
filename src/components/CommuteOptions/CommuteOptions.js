import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import GoogleMapApi from '../../apis/GoogleMapApi.js'

export default class CommuteOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      driveOutput: [],
      walkOutput: []
    }
  }

  handleRunningLatePress() {
    this.props.navigation.navigate('RunningLate');
  }

  componentDidMount() {
    let startDestination = '73 w monroe st, chicago, il'
    let endDestination = '3847 n claremont st, chicago, il'
    GoogleMapApi.fetchModeByDrive(startDestination, endDestination)
      .then((response) => this.setState({
        driveOutput: [
          response.routes[0].legs[0].distance.text,
          response.routes[0].legs[0].duration.text]
      }));
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text>DISTANCE:</Text>
          <Text>{this.state.driveOutput[0]}</Text>
          <Text>DURATION:</Text>
          <Text>{this.state.driveOutput[1]}</Text>
        </View>

        <Button
          title="Running Late?"
          buttonStyle={{marginTop:20}}
          onPress={this.handleRunningLatePress.bind(this)}
        />
      </ScrollView>
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
})
