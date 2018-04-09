import React from 'react';
import { View, Text, ListView, SectionList, StyleSheet, ScrollView } from 'react-native';
import { Header, Input, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { Contacts } from 'expo';
import Scrubber from '../components/contacts/Scrubber';

const itemHeight = 40;

const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

const renderHeader = ({section: section}) => {

  return(
    <View style={styles.sectionComplete}>
    <Text style={styles.sectionHeader}>
      {section.title}
    </Text>
    <View style={styles.sectionDivider}>
      <Divider style={styles.divider} />
    </View>
  </View>
    )
}

export default class ContactList extends React.Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
    contacts: [],
    selectedContact: "",
    sections: [{data:[{name:"Loading"}], key: "d"}]
    }
  }


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


  // componentDidMount() {

  //   const sections =[];

  //   for (i = 0; i < 26; i++) {
  //     sections[i] = {data:[], key: String.fromCharCode(i + 65), title: String.fromCharCode(i + 65)}
  //   }

  //   this.showFirstContactAsync()
  //   .then((contacts)=>{
  //     console.log('first out of async')
  //     console.log(contacts)
  //     if (!contacts || !contacts.data) {
  //       throw "error"
  //     } else {
  //       this.setState({contacts: contacts.data})
  //       contacts.data.forEach((contact)=>{
  //         if (contact.name) {
  //           if (isNaN((contact.name)[0]) === true) {
  //             const key = (contact.name)[0].toUpperCase()
  //             sections[key.charCodeAt(0) - 65].data.push(contact)
  //           }
  //         }

  //       })
  //       this.setState({sections: sections})
  //     }


  //   }).catch((err) => {console.log(err)})

  // }

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
          renderItem={renderItem}
          keyExtractor={(item) => {return(item.id)}}
          initialNumToRender="10"
          renderSectionHeader={renderHeader}
          getItemLayout={this.getItemLayout}
          getSeparatorHeight={() => itemHeight}
          // windowSize={3}
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
    // borderWidth: 1,
    // borderColor: '#CCCCCC',
    justifyContent: 'center'

  },
  sectionComplete: {
    height: itemHeight
  },
  itemText: {
    paddingLeft: 50,
    textAlign: 'left'
  },
  sectionHeader: {
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left'
  },
  divider: {
    backgroundColor: 'black',
    width: '75%',
    position: "relative",
    bottom: 10
  },
  sectionDivider: {
    alignItems: "center"
  },
  scrubber: {
    position: 'absolute',
    right: 0,
    top: 100,
    justifyContent: 'center'
  }
});
