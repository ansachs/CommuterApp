import React from 'react';
import { View, Text, ListView, SectionList, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight, Modal, FlatList } from 'react-native';
import { Header, Input, Divider, Button, ListItem, Icon } from 'react-native-elements';

const favoriteItem = ({item}, props) => {
  
  let {addToSendTo, closeContactList} = props;

  return(
   <TouchableOpacity
      onPress={() => {
        addToSendTo(item)
        closeContactList()
      }}
    >
    <ListItem
      title={item.name}
      subtitle={
        <View>
          <Text>{item.phoneNumbers[0].digits}</Text>
        </View>}
      containerStyle={{backgroundColor: '#fff', borderBottomWidth:1}}
    />
    </TouchableOpacity>)
}

export default contactModalFavoritesList = (props) => {

  let {favoriteContacts} = props.params;

  return(
     <FlatList
        data={Object.values(favoriteContacts)}
        keyExtractor={item => item.id}
        renderItem={(val)=> favoriteItem(val, props.params)}
    />)
}