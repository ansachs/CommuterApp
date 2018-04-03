import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Divider = () => (
      <View style={{width: 1, backgroundColor: 'black'}}/>
      )
    
const Row = (method, time, price, textStyle = null, rowStyle = null) => (
        <View style={styles.row} key={method}>
            <View style={[styles.tableCell, rowStyle]}> 
              <Text style={styles.tableText, textStyle}> {method} </Text>
            </View>
            <Divider />
            <View style={[styles.tableCell, rowStyle]}> 
              <Text style={styles.tableText, textStyle}> {time} </Text>
            </View>
            <Divider />
            <View style={[styles.tableCell, rowStyle]}> 
              <Text style={styles.tableText, textStyle}> {price} </Text>
            </View>
        </View> )

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
      let rowStyle = StyleSheet.create({test: {backgroundColor: color}})
      return(
        Row(transportMethod.method, transportMethod.duration, transportMethod.price, null, rowStyle.test)
      )})

  table.unshift(Row("Type", "ETA", "Price", styles.titleText,styles.titleCell))

  return (
    <View style={styles.tableContainer}>
      {table}
    </View>

  )

}

