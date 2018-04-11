import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';


export default MenuBar = (props) => {
  console.log(props)

return (
  <View style={styles.topBar}>
    <View style={styles.topBarSection}>
      <Text
      onPress={()=> props.handleMenuClick({currentList: "all"})}
      style={styles.topBarText}>
        All
      </Text>
    </View>
    <View style={styles.topBarDivider}>
    </View>
    <View style={styles.topBarSection}>
      <Text
      onPress={() => props.handleMenuClick({currentList: "favorites"})}
      style={styles.topBarText}>
        Favorites
      </Text>
    </View>
  </View>

)}


const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    backgroundColor: "#ccc",
    width: '50%',
  },
  topBarDivider: {
    width: 1,
    backgroundColor: 'blue'
  },
  topBarSection: {
    width: '50%'
  },
  topBarText: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    paddingBottom: 4
  }
})