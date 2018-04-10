import React from 'react';
import { StyleSheet, Text, View, ScrollView,   FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation'
import SendSMS from 'react-native-sms'
import Communications from 'react-native-communications';
import { Button, ListItem } from 'react-native-elements';
import RenderList from '../components/runningLate/renderList'
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
      all: [{data: [
        {name: "alex", number: "2121232123", type: "person", id: "567"},
        {name: "ray", number: "2342342342", type: "person", id: "456"}],  key: "A", title: "A"},
      {data:[
        {name: "aaron", number: "2342342344", type: "person", id: "123"},
        {name: "dan", number: "2343443233", type: "person", id: "234"},
        {name: "jon", number: "2343444233", type: "person", id: "345"}
        ], key: "B", title: "B"}],
      currentUserID: "",
      checkedInContactsList: [],
      checkedInFavoritesList: {}
    }
  }

  componentDidMount() {
    if (this.props.screenProps.contacts) {
      this.setState({all: this.props.screenProps.contacts})
    } else {
      this.setState({all: "Please login to view contacts"})
    }
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


  removePhoneNumber = (index) => {
    let currentList = this.state.favorites;
    const newState = currentList.slice(0, index).concat(currentList.slice(index +1, currentList.length +1))
    this.setState({favorites: newState});
  }

  handleMenuClick = (obj) => {
    this.setState(obj);
    // console.log('jlkj')
  }

  addContactsToFavorites = (key, index) => {
    console.log(key, index)
  }

  handleContactListCheckClicked = (key, index) => {
    let currentIndex = (key.charCodeAt(0) - 65) * (index + 1)
    let newValue = this.state.checkedInContactsList[currentIndex] ? false : true;
    this.state.checkedInContactsList[currentIndex] = newValue;
    this.setState({checkedInContactsList: this.state.checkedInContactsList})
    // if (this.state.checkedInContactsList[key] && this.state.checkedInContactsList[key][index] ) {
    //   this.setState({checkedInContactsList: {...this.state.checkedInContactsList, [key][index] = !state.checkedInContactsList[key][index]}})
    // } else {
    //   this.setState({checkedInContactsList: {...this.state.checkedInContactsList, [key]: newArray[index] = true}})
    // }
  }

  handleContactItemClicked = (item) => {
    this.setState({checkedInContactsList: [...this.state.checkedInContactsList, item]})
  }
    

  handleFavoritesListCheckClicked = (key, index) => {
    console.log(key, index)
  }



  whichListToDisplay = () => {
    if (this.state.currentList === "all") {
      if (this.state.all.length > 0) {
        return (
          <ContactList 
            contactList={this.state.all}
            addContactsToFavorites={this.addContactsToFavorites}
            handleContactItemClicked={this.handleContactItemClicked}
            checkedInContactsList={this.state.checkedInContactsList}
          />)
      } else {
        return (
          <View>
            <Text> Contact list is loading... </Text>
          </View>)
      }
    } else if (!this.state.currentUserID) {
        return this.state.currentList === "favorites"? 
          <View>
            <Text> Login to view favorites </Text>
          </View> : 
          <RenderList 
            favoritesList={this.state.favorites}
            handleClick={this.removePhoneNumber}
          /> 
    } else {
      return(
        <RenderList 
        favoritesList={this.state.favorites}
        handleClick={this.removePhoneNumber}
      />)
    } 
  } 

  render() {

    let currentList = this.whichListToDisplay()

    console.log(this)
    return (
      <View contentContainerStyle={styles.container}>

        <View style={styles.menuBar}>
          <MenuBar 
            handleMenuClick={this.handleMenuClick} 
          />
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
  }, 
  menuBar: {
    alignItems: 'center'
  }
});



