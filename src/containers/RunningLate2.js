import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

export default class RunningLate2 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>To:</Text>
        <Input
          leftIcon={
            <Icon
              type='MaterialIcons'
              name='person-add'
              size={30}
            />
          }
        />

        <Text style={{marginTop:20}}>Message:</Text>
        <Input
            value='I am running late!'
        />

        <Button
          title='Send Text'
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
});
