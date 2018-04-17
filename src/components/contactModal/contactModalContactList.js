import React from 'react';
import { View, Text, ListView, SectionList, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight, Modal, FlatList } from 'react-native';
import {Icon as ElementIcon} from 'react-native-elements'

import contactModalScrubber from './contactModalScrubber';


const itemHeight = 60;
let listref = "";

const renderHeader = ({section: section}) => {
  return(
    <View style={styles.sectionComplete}>
      <Text style={styles.sectionHeader}>
        {section.title}
      </Text>
    </View>
  )
}

const renderItem = ({item, section, index}, {addToSendTo, handleFavoritesClick, favoriteContacts, closeContactList}) => {

  let heartStyle = favoriteContacts[item.id] ? 'favorite' : 'favorite-border'
  
  return (
      <TouchableOpacity
      style={styles.item}
      onPress={() => {
        addToSendTo(item)
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
              handleFavoritesClick(item)
            }}
          />
        </View>
        }
      </TouchableOpacity>
  )
}

const getItemLayout = (data, index) => {
  return ({
  index,
  length: itemHeight,
  offset: itemHeight * index
  })
}

const scrollToChar = (char) => {
  console.log("go to    ",char)
  listRef.scrollToLocation({
    sectionIndex: (char.charCodeAt(0) - 65),
    itemIndex: 0,
    animated: false,
    viewPosition: 0,
    viewOffset: 0
  })
}

export default ContactModalContactList = (props) => {

console.log(props.params)
let {contactList} = props.params;

return (
  <View>
    <SectionList
      style={styles.list}
      sections={contactList}
      renderItem={(item) => renderItem(item, props.params)}
      keyExtractor={(item) => {return(item.id)}}
      initialNumToRender="10"
      renderSectionHeader={renderHeader}
      getItemLayout={getItemLayout}
      getSeparatorHeight={() => itemHeight}
      ref={c => (listRef = c)}
    />
    <View style={styles.scrubber} pointerEvents="box-none">
     {/*} <contactModalScrubber onScrub={scrollToChar} />*/}
    </View>
  </View>
)}

const styles = StyleSheet.create({
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

  },
  scrubber: {
    position: 'absolute',
    right: 0,
    top: '25%',
    bottom: '25%'

  }
})