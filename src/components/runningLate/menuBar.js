import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';


export default MenuBar = (props) => {
  console.log(props)

return (
  <View style={styles.topBar}>
    <Text
    onPress={()=> props.handleMenuClick({currentList: "all"})}
    style={styles.topText}>
      All
    </Text>
    <Text
    onPress={() => props.handleMenuClick({currentList: "favorites"})}
    style={styles.topText}>
      Favorites
    </Text>
    <Text
    onPress={() => props.handleMenuClick({currentList: "selected"})}
    style={styles.topText}>
      Selected
    </Text>
  </View>

)}


const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    backgroundColor: "#ccc"
  },
  topText: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    paddingBottom: 4
  }
})