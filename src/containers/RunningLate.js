import React from 'react';
import { StyleSheet, Text, View, ScrollView,   FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation'
import SendSMS from 'react-native-sms'
import Communications from 'react-native-communications';
import { Button, ListItem } from 'react-native-elements';
import RenderList from '../components/runningLate/renderList'

export default class RunningLate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [
        {name: "ray", number: "2342342342", type: "person"},
        {name: "aaron", number: "2342342344", type: "person"},
        {name: "dan", number: "2343443233", type: "person"}
      ],
      selected: [
        {name: "alex", number: "2121232123", type: "person"},
        {name: "ray", number: "2342342342", type: "person"}
      ],
      all: [
        {name: "alex", number: "2121232123", type: "person"},
        {name: "ray", number: "2342342342", type: "person"},
        {name: "aaron", number: "2342342344", type: "person"},
        {name: "dan", number: "2343443233", type: "person"},
        {name: "jon", number: "2343443233", type: "person"}
      ],
      allVisible: true,
      favoritesVisible: false,
      selectedVisible: false,
      currentList: "all"
    }
  }

  componentDidMount() {
    // call function to retrieve favorites
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
      <View contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <Text
          onPress={()=>{this.setState({currentList: "all"})}}
          style={styles.topText}>
            All
          </Text>
          <Text
          onPress={()=>{this.setState({currentList: "favorites"})}}
          style={styles.topText}>
            Favorites
          </Text>
          <Text
          onPress={()=>{this.setState({currentList: "selected"})}}
          style={styles.topText}>
            Selected
          </Text>
        </View>
        <View style={styles.favoritesList}>

        <View>
          <RenderList currentList={this.state[this.state.currentList]} />
        </View>
          
      </View>
        <Button
        title="Add from contacts list"
        // onPress={this.sendMessage.bind(this)}
        />
      

        <Button
          title="send text"
          onPress={this.sendMessage.bind(this)}
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
  favoritesList: {
    height: 250
  },
  topBar: {
    flexDirection: "row",
    backgroundColor: "#ccc"
  },
  topText: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    paddingBottom: 4
  }
});
