import React from 'react';
import { View, Text, ListView, SectionList, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import {Icon as MaterialIcon} from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Header, Input, Divider, CheckBox } from 'react-native-elements';
import {Icon as ElementIcon} from 'react-native-elements'

import Scrubber from '../contacts/Scrubber';


const itemHeight = 60;

const renderHeader = ({section: section}) => {

  return(
    <View style={styles.sectionComplete}>
      {/*<View style={styles.sectionDivider1}>
        <Divider style={styles.divider1} />
      </View>*/}
      <Text style={styles.sectionHeader}>
        {section.title}
      </Text>
      {/*<View style={styles.sectionDivider2}>
        <Divider style={styles.divider2} />
      </View>*/}
    </View>
    )
}

const renderItem = ({item, section, index}, sendTo, handleFavoritesClick, favoriteContacts, closeContactList) => {
  let heartStyle = favoriteContacts[item.id] ? 'favorite' : 'favorite-border'
    return (
        <TouchableOpacity
        style={styles.item} 
        onPress={() => {
          sendTo(item)
          closeContactList()
        }}>
          <Text style={styles.itemText}>
            {item.name}
          </Text>
          <View style={styles.itemIcon}>
            <ElementIcon
              name={heartStyle}
              type='MaterialIcons'
              size={30}
              style={styles.addToFavorite}
              onPress={() => {
                handleFavoritesClick(item)}}
              />
          </View>
          }

        </TouchableOpacity>
    );
  };


  const getItemLayout = (data, index) => {

    return ({
    index,
    length: itemHeight,
    offset: itemHeight * index
    })
  };

  const scrollToChar = (char) => {
    console.log("go to    ",char)

    this.listRef.scrollToLocation({
      sectionIndex: (char.charCodeAt(0) - 65),
      itemIndex: 0,
      animated: false,
      viewPosition: 0,
      viewOffset: 0
    });
  };


const contactListModal = (props) => {
  let listref = "";

  return(
  <Modal
    animationType="slide"
    transparent={false}
    visible={props.modalState}
    onRequestClose={() => {
      alert('Modal has been closed.');
    }}>

    <View style={styles.overallModal}>

      <View style={{paddingTop: 100}}>
          <IonIcon
            name='ios-arrow-back'
            color='#517fa4'
            size={30}
            onPress={() => {props.closeContactList()}}
          />
      </View>

      <SectionList
          style={styles.list}
          sections={props.contactList}
          renderItem={(item) => renderItem(item, 
            props.addToSendTo, 
            props.handleFavoritesClick,
            props.favoriteContacts,
            props.closeContactList
            )}
          keyExtractor={(item) => {return(item.id)}}
          initialNumToRender="10"
          renderSectionHeader={renderHeader}
          getItemLayout={getItemLayout}
          getSeparatorHeight={() => itemHeight}
          ref={c => (listRef = c)}
        />
      
      <View style={styles.scrubber} pointerEvents="box-none">
        <Scrubber onScrub={scrollToChar} />
      </View>

    </View> 
  </Modal>)

}

const styles = StyleSheet.create({
  // overallModal: {
  //   flexDirection: 'row',
  //   backgroundColor: '#fff'
  // },
  // list: {
  //   flex: 4
  // },
  item: {
    height: itemHeight,
    flexDirection: 'row',
    display: 'flex',
    borderWidth: 1,
    // borderColor: '#CCCCCC',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  itemText: {
    flex: 3,
    // paddingLeft: 90,
    textAlign: 'left',
    fontSize: 20,
    paddingLeft: 10
  },
  itemIcon: {
    flex: 1
  },
  addToFavorite: {
    flex: 1
    // paddingLeft: '80%'
  }, 
  itemCheckBox: {
    flex: 1,
    alignSelf: 'center'
  },
  sectionComplete: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#e6e6e6'
  },
  sectionDivider1: {
    alignItems: 'center',
    flex: 1,
  },
  divider1: {
    backgroundColor: 'black',
    height: 1,
    width: '80%'
  },
  sectionHeader: {
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  sectionDivider2: {
    alignItems: 'center',
    flex: 3,
  },
  divider2: {
    backgroundColor: 'black',
    height: 1,
    width: '80%'
    // flex: 1
    // alignSelf: 'center',
    // width: '80%',
    // position: 'relative',
  },
  scrubber: {
    position: 'absolute',
    right: 0,
    top: '25%',
    bottom: '25%'
    // alignSelf: 'center'
    // flex: 1,
    // justifyContent: 'flex-end'
  }
});

export default {
  ContactListModal: contactListModal
}