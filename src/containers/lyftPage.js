import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Button } from 'react-native-elements';

export default class lyftPage extends React.Component {
  constructor() {
    super();
    this.state = {
      lyftChoice: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25}}>Lyft</Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.lyftChoice}
          onValueChange={(itemValue, itemIndex) => this.setState({lyftChoice: itemValue})}>
          <Picker.Item label="Lyft" value="Lyft" />
          <Picker.Item label="Lyft Plus" value="Lyft Plus" />
          <Picker.Item label="Lyft Premier" value="Lyft Premier" />
        </Picker>
        <View>
          <Text>Distance:</Text>
          <Text>{this.props.navigation.state.params.duration}</Text>
        </View> 
        <View>
          <Text>Price:</Text>
          <Text>{this.props.navigation.state.params.price}</Text>
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
    width: '50%',
    marginBottom:100
  }
});
