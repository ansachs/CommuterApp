import React from 'react';
import { View, Text, ListView, SectionList, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight, Modal, FlatList } from 'react-native';
import {Icon as MaterialIcon} from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Header, Input, Divider, Button, ListItem, Icon } from 'react-native-elements';
import {Icon as ElementIcon} from 'react-native-elements'

import contactModalScrubber from '../components/contactModal/contactModalScrubber';
import ContactModalContactList from '../components/contactModal/contactModalContactList'
import ContactModalFavoritesList from '../components/contactModal/contactModalFavoritesList'

const itemHeight = 60;

export default class ContactModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: 'all'
    }
  }


  render() {

    return(
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalState}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={styles.overallModal}>
          <View style={{marginTop:20}}>
              <IonIcon
                name='ios-arrow-back'
                color='#517fa4'
                size={30}
                onPress={() => {this.props.closeContactList()}}
              />
              <View style={{flexDirection:'row', alignSelf:'flex-end'}}>
                <Text
                  style={styles.topMenu}
                  onPress={() => {this.setState({currentList:'all'})}}
                >All
                </Text>
                <Text
                  style={styles.topMenu}
                  onPress={() => {this.setState({currentList:'favorites'})}}
                >Favorites
                </Text>
              </View>
          </View>
          {this.state.currentList === 'all' ? 
            <ContactModalContactList params={this.props}/> :
            <ContactModalFavoritesList params={this.props}/>
          }
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  topMenu: {
    borderWidth:1,
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});