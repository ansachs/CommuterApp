import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Button } from 'react-native-elements';

export default class UberPage extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25}}>Type:</Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.uberChoice}
          onValueChange={(itemValue, itemIndex) => this.setState({uberChoice: itemValue})}>
          <Picker.Item label="UberX" value="UberX" />
          <Picker.Item label="UberXL" value="UberXL" />
          <Picker.Item label="UberBlack" value="UberBlack" />
        </Picker>
        <View>
          <Text>Distance:</Text>
          <Text>{this.props.navigation.state.params.uberOutput.uberX[1]}</Text>
        </View>
        <View>
          <Text>Time:</Text>
          <Text>{this.props.navigation.state.params.uberOutput.uberX[0]}</Text>
        </View>
        <View>
          <Text>Price:</Text>
          <Text>{this.props.navigation.state.params.uberOutput.uberX[2]}</Text>
        </View>

        <Button
          onPress={this.onPressSubmit}
          title='Request Ride'
          buttonStyle={{marginTop:20}}
        />
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

  picker: {
    height: 100,
    width: 100,
    marginBottom:100
  }
});
