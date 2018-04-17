import React from 'react';
import { ListItem } from 'react-native-elements';
import { Text, View, ScrollView, FlatList } from 'react-native';

export const CommuteOptionsTransportationList = (props) => {
  
  const sortedData = props.transportTable.sort((a , b) => (a.convert) - (b.convert))

  return (
  <FlatList
    data={sortedData}
    renderItem={({item}) => (
      <ListItem
        title={item.method.toUpperCase()}
        leftIcon={{
          name: `${item.icon}`,
          type: 'material-community',
          style: { marginRight: 20, fontSize: 30 }
        }}
        rightIcon={{
          name: 'chevron-right',
          type: 'material-community',
          style: { marginRight: 20, fontSize: 30 }
        }}
        containerStyle={{backgroundColor: '#fff', borderBottomWidth:1}}
        subtitle={
          <View>
            <Text>Duration: {item.duration}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        }
        onPress={() => {props.handleRowOnPress(item.method)}}
      />
    )}
    keyExtractor={item => item.method}
  />)
}