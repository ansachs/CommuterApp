import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Button, ListItem } from 'react-native-elements';

export default RenderList = (prop) => {
    return(
    <FlatList
      data={prop.currentList}
      keyExtractor={item => item.number}
      renderItem={({item, index},) => {
        return(
        <ListItem
          onPress={prop.handleClick(index)}
          title={item.name}
          leftIcon={{
            name: `${item.type}`,
            size: 30,
            // type: 'material-community',
            style: { marginRight: 20}
          }}
          rightIcon={{
            name: 'ios-remove-circle-outline',
            type: 'ionicon',
            size: 20,
            style: { marginRight: 20}
          }}
          containerStyle={{backgroundColor: '#fff', borderBottomWidth:1}}
          subtitle={
            <View>
              <Text>name: {item.number}</Text>
            </View>
          }
          // onPress={() => this.handleRowOnPress(item.method)}
        />
      )}}
    />
  )}
