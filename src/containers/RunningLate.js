import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import SendSMS from 'react-native-sms'
import Communications from 'react-native-communications';

export default class RunningLate extends React.Component {
  constructor(props) {
    super(props);
  }


  handleBack() {
    this.props.navigation.dispatch(NavigationActions.back())
  }
  
  sendMessage() {
      SendSMS.send({
          body: 'The default body of the SMS!',
          recipients: ['2253951571'],
          successTypes: ['sent', 'queued']
      }, (completed, cancelled, error) => {
   
          console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
   
      });
  }


  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Running Late?</Text>

        <Button
          title="send text"
          onPress={this.sendMessage.bind(this)}
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
