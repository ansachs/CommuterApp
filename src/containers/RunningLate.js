import React from 'react';
import { StyleSheet, Text, View, ScrollView,   FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation'
import SendSMS from 'react-native-sms'
import Communications from 'react-native-communications';
import { Button, ListItem } from 'react-native-elements';
import RenderList from '../components/runningLate/renderList'
import UsersApi from '../apis/UsersApi.js'
import MenuBar from '../components/runningLate/menuBar'
import ContactList from './ContactList'


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
      all: [{data: [
        {name: "alex", number: "2121232123", type: "person", id: "567"},
        {name: "ray", number: "2342342342", type: "person", id: "456"}],  key: "A", title: "A"},
      {data:[
        {name: "aaron", number: "2342342344", type: "person", id: "123"},
        {name: "dan", number: "2343443233", type: "person", id: "234"},
        {name: "jon", number: "2343444233", type: "person", id: "345"}
        ], key: "B", title: "B"}],
      allVisible: true,
      favoritesVisible: false,
      selectedVisible: false,
      currentList: "all"
    }
  }


  componentDidMount() {
<<<<<<< HEAD
    // call function to retrieve favorites
   return UsersApi.saveFavoriteContacts(this.state.favorites[0].name, this.state.favorites[0].number)
    console.log(this.state.favorites.name)
  
  }


 

  getContacts() {
    this.props.navigation.navigate('contactPage')
  }
=======
    if (this.props.screenProps.contacts) {
      this.setState({all: this.props.screenProps.contacts})
    } else {
      // this.setState({all: "Please login to view contacts"})
    }
  }

>>>>>>> 51908c0a81cbaccf65c5d51ef901ed258f28eeb1

  sendMessage() {
      SendSMS.send({
          body: 'The default body of the SMS!',
          recipients: ['2253951571'],
          successTypes: ['sent', 'queued']
      }, (completed, cancelled, error) => {

          console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

      });
  }


  removePhoneNumber = (index) => {
    let currentList = this.state[this.state.currentList]
    const newState = currentList.slice(0, index).concat(currentList.slice(index +1, currentList.length +1))
    this.setState({[this.state.currentList]: newState})
  }

  handleMenuClick = (obj) => {
    this.setState(obj);
    // console.log('jlkj')
  }

  render() {
    let currentList = this.state.currentList === "all" ?
      <ContactList
        contactList={this.state.all}
      />
      :
      <RenderList
        currentList={this.state[this.state.currentList]}
        handleClick={this.removePhoneNumber}
      />

    // console.log(this)
    return (
      <View contentContainerStyle={styles.container}>

        <View>
          <MenuBar handleMenuClick={this.handleMenuClick} />
        </View>

        <View>
          {currentList}
        </View>

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
  }
});
