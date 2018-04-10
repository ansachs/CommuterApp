import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Button, ListItem, Icon, CheckBox } from 'react-native-elements';

export default RenderList = (props) => {
    console.log(this)
    return(
    <FlatList
      data={props.favoritesList}
      keyExtractor={item => item.number}
      renderItem={({item, index},) => {
        return(
        <View>
        <ListItem
          title={item.name}
          leftIcon={{
            name: `${item.type}`,
            size: 30,
            // type: 'material-community',
            style: { marginRight: 20}
          }}
          rightIcon={
            // <Button
            //   title='add to favorites'
            //   titleStyle={{fontSize:15}}
            // />
            <Icon
            name = 'ios-remove-circle-outline'
            type = 'ionicon'
            size = {20}
            style = {{ 'marginRight': 20}}
            onPress = {() => {props.handleClick(index)}}
            />
          }
          containerStyle={{backgroundColor: '#fff', marginBottom:5}}
          subtitle={
            <View>
              <Text>name: {item.number}</Text>
            </View>
          }
          // onPress={() => this.handleRowOnPress(item.method)}
        />
        </View>
      )}}
    />
  )
  }
