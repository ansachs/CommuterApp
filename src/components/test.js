import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, StyleSheet } from 'react-native';

export default class Test extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      userDataSource: ds
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          userDataSource: this.state.userDataSource.cloneWithRows(response)
        });
      });
  }

  renderRow(user, sectionId, rowId, highlightRow) {
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>{user.name}: {user.email}</Text>
      </View>
    );
  }

  render() {
    return(
      <ListView
        dataSource={this.state.userDataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f4f4f4',
    marginBottom: 3
  },

  rowText: {
    paddingTop: 10,
    paddingBottom:10
  }
});

AppRegistry.registerComponent('Test', () => Test);
