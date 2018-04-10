import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';

export default RenderList = (props) => {
    return(
    <FlatList
      data={props.favoritesList}
      keyExtractor={item => item.number}
      renderItem={({item, index},) => {
        return(
        <ListItem
          title={item.name}
          leftIcon={{
            name: `${item.type}`,
            size: 30,
            // type: 'material-community',
            style: { marginRight: 20}
          }}
          rightIcon={
            <Icon
            name = 'ios-remove-circle-outline'
            type = 'ionicon'
            size = {20}
            style = {{ 'marginRight': 20}}
            onPress = {() => {props.handleClick(index)}}
            />
          }
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
  )
  }
