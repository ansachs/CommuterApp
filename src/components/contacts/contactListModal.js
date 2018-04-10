import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableHighlight } from 'react-native';

const contactListModal = (props) => {

  return(
  <Modal
    animationType="slide"
    transparent={false}
    visible={props.modalState}
    onRequestClose={() => {
      alert('Modal has been closed.');
    }}>
    <View style={{marginTop: 50}}>
      
        

      <TouchableHighlight
        onPress={() => {props.closeContactList()}}>
        <Text>Hide Modal</Text>
      </TouchableHighlight>

    </View>
  </Modal>)

}

export default {
  ContactListModal: contactListModal
}