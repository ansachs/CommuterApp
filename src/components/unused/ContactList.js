import React from 'react';
import { View, Text, ListView, SectionList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Input, Divider, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Contacts } from 'expo';
import Scrubber from '../components/contacts/Scrubber';
import UsersApi from '../apis/UsersApi.js'

const itemHeight = 60;

const renderHeader = ({section: section}) => {

  return(
    <View style={styles.sectionComplete}>
      <View style={styles.sectionDivider1}>
        <Divider style={styles.divider1} />
      </View>
      <Text style={styles.sectionHeader}>
        {section.title}
      </Text>
      <View style={styles.sectionDivider2}>
        <Divider style={styles.divider2} />
      </View>
    </View>
    )
}

export default class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    contacts: [],
    selectedContact: "",
    sections: [{data:[{name:"Loading"}], key: "d"}]
    }
  }

  renderItem = ({item, section, index}) => {
    // console.log(this.props.checkedInContactsList)
    // let currentIndex = (section.key.charCodeAt(0) - 65) * (index + 1)
    // let isChecked = this.props.checkedInContactsList[currentIndex] ? true : false;
    return (
      <View style={styles.item}> 
        {/*<CheckBox
          style={styles.itemCheckBox}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          size={20} 
          checked={isChecked}
          onPress={() => {
            console.log(section, index)
            this.props.handleContactListCheckClicked(section.key, index)
            }
          }
          
        />*/}
        <TouchableOpacity onPress={() => {this.props.handleContactItemClicked(item)}}>
          <Text style={styles.itemText}>
            {item.name}
          </Text>
          <Icon
              name='favorite-border'
              type='MaterialIcons'
              size={20}
              style={styles.addToFavorite}
              onPress={() => this.props.addContactsToFavorites(section.key, index)}
              />
        </TouchableOpacity>
      </View>
    );
  };


  getItemLayout = (data, index) => {

    return ({
    index,
    length: itemHeight,
    offset: itemHeight * index
    })
  };

  scrollToChar = char => {
    console.log("go to    ",char)

    this.listRef.scrollToLocation({
      sectionIndex: (char.charCodeAt(0) - 65),
      itemIndex: 0,
      animated: false,
      viewPosition: 0,
      viewOffset: 0
    });
  };


  render() {
    
    return (
      <View>
        <View style={{paddingLeft: 10}}>
          <Icon
            name='ios-arrow-back'
            color='#517fa4'
            size={30}
            onPress={()=>{console.log('asdfsad')}}
          />
        </View>
        <Input
          placeHolder="contact name"
          onChangeText={(val) => {this.setState({selectedContact: val})}}
          value={this.state.selectedContact}
        />
        <SectionList
          // style={styles.list}
          sections={this.props.contactList}
          renderItem={(a) => this.renderItem(a)}
          keyExtractor={(item) => {return(item.id)}}
          initialNumToRender="10"
          renderSectionHeader={renderHeader}
          getItemLayout={this.getItemLayout}
          getSeparatorHeight={() => itemHeight}
          ref={c => (this.listRef = c)}
        />
        <View style={styles.scrubber} pointerEvents="box-none">
          <Scrubber onScrub={this.scrollToChar} />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  list: {
    flex: 1
  },
  item: {
    height: itemHeight,
    flexDirection: 'row',
    display: 'flex',
    // borderWidth: 1,
    // borderColor: '#CCCCCC',
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  itemText: {
    flex: 3,
    // paddingLeft: 90,
    textAlign: 'left',
    fontSize: 16
  },
  addToFavorite: {
    flex: 1
    // paddingLeft: '80%'
  }, 
  itemCheckBox: {
    flex: 1,
    alignSelf: 'center'
  },
  sectionComplete: {
    height: itemHeight,
    flexDirection: 'row',
    alignItems: 'center'
  },
  sectionDivider1: {
    alignItems: 'center',
    flex: 1,
  },
  divider1: {
    backgroundColor: 'black',
    height: 1,
    width: '80%'
  },
  sectionHeader: {
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    flex: 1
  },
  sectionDivider2: {
    alignItems: 'center',
    flex: 3,
  },
  divider2: {
    backgroundColor: 'black',
    height: 1,
    width: '80%'
    // flex: 1
    // alignSelf: 'center',
    // width: '80%',
    // position: 'relative',
  },
  scrubber: {
    position: 'absolute',
    right: 0,
    top: 100,
    justifyContent: 'center'
  }
});