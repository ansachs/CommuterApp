import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Divider = () => (
  <View style={{width: 1, backgroundColor: 'black'}}/>
  )

const Row = (obj) => (
  <TouchableOpacity onPress={() => obj.onPress(obj.method, obj.navigationFunction)} style={styles.row} key={obj.method}>
      <View style={[styles.tableCell, obj.cellStyle]}>
        <Text style={styles.tableText, obj.textStyle}> {obj.method} </Text>
      </View>
      <Divider />
      <View style={[styles.tableCell, obj.cellStyle]}>
        <Text style={styles.tableText, obj.textStyle}> {obj.time} </Text>
      </View>
      <Divider />
      <View style={[styles.tableCell, obj.cellStyle]}>
        <Text style={styles.tableText, obj.textStyle}> {obj.price} </Text>
      </View>
  </TouchableOpacity>)

const colors = ['#a2c4f2', '#fff', '#edf0f4'];

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    width: '80%',
    maxHeight: 40,
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  tableCell: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    "fontWeight": 'bold'
  },
  titleCell: {
    "backgroundColor": '#b3b8bf'
  },
  tableContainer: {
    borderStyle: 'solid',
    borderWidth: 1
  },
  tableText: {
    fontSize: 16
  }
})

export default CommuterTable = (props) => {


  let table = props.transpo.map((transportMethod, index)=> {
    let color = colors[index%3]
    let cellStyle = StyleSheet.create({background: {backgroundColor: color}})
    let rowData = {
      method: transportMethod.method,
      time: transportMethod.duration,
      price: transportMethod.price,
      textStyle: null,
      cellStyle: cellStyle.background,
      onPress: props.handleRowOnPress,
      navigationFunction: props.navigationFunction
      }
    return(
      Row(rowData)

    )})

  rowTitle = {
    method: "Type",
    time: "ETA",
    price: "Price",
    textStyle: styles.titleText,
    cellStyle: styles.titleCell,
    onPress: null,
    navigationParams: null
  }

  table.unshift(Row(rowTitle))


  return (
    <View style={styles.tableContainer}>
      {table}
    </View>
  )
}
