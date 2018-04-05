// import React from 'react';
// import { View, Text, ListView, SectionList, StyleSheet } from 'react-native';
// import { Header, Icon, Input, Divider } from 'react-native-elements';
// import { Contacts } from 'expo';
// import Scrubber from '../components/contacts/Scrubber'


// export default class ContactPage extends React.Component {
// constructor(props) {
//   super(props);
//   // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//   this.state = {
//   contacts: [],
//   selectedContact: "",
//   sections: [{data:[{name:"Daniel Higgins Jr."}], key: "d"}]
//   }
// }

// async showFirstContactAsync() {
//   // Ask for permission to query contacts.
//   sections =[];
//   const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
//   console.log(permission)
//   if (permission.status !== 'granted') {
//     // Permission was denied...
//     return;
//   }

//   const contacts = await Expo.Contacts.getContactsAsync({
//     fields: [
//       Expo.Contacts.PHONE_NUMBERS,
//       Expo.Contacts.EMAILS,
//     ],
//     pageSize: 10,
//     pageOffset: 0,
//   })
  
//   this.setState({contacts: contacts.data})
//   return contacts.data;
// }

//   renderItem = ({ item }) => {
//     // console.log(item)
//     return (
//       <View style={styles.item}>
//         <Text style={styles.itemText}>{item.name}</Text>
//       </View>
//     );
//   };

//   renderHeader = ({section: section}) => 
//   <View>
//     <Text style={styles.sectionHeader}>
//       {section.title}
//     </Text>
//     <View style={styles.sectionDivider}>
//       <Divider style={styles.divider} />
//     </View>
//   </View>

//   getItemLayout = (__, index) => ({
//     // index,
//     // length: itemHeight,
//     // offset: itemHeight * index
//   });

//   scrollToChar = char => {
//     // let itemIndex = 0;

//     // if (char !== '#') {
//     //   itemIndex = sections[0].data.findIndex(item => {
//     //     const itemFirstChar = item.slice(0, 1);

//     //     return (
//     //       char.localeCompare(itemFirstChar, 'nl', {
//     //         sensitivity: 'base'
//     //       }) <= 0
//     //     );
//     //   });
//     //   if (itemIndex === -1) {
//     //     itemIndex = sections[0].data.length;
//     //   }
//     // }
//     // this.listRef.scrollToLocation({
//     //   sectionIndex: 0,
//     //   itemIndex,
//     //   animated: false,
//     //   viewPosition: 0.5
//     // });
//   };


// componentDidMount() {

//   const sections =[];
//   for (i = 0; i < 26; i++) {
//     sections[i] = {data:[], key: String.fromCharCode(i + 97), title: String.fromCharCode(i + 97)}
//   }

//   console.log(sections)

//   this.showFirstContactAsync()
//   .then((contacts)=>{
//     contacts.forEach((contact)=>{

//       const key = (contact.name)[0].toLowerCase()
//       console.log(key.toLowerCase().charCodeAt(0) - 97)
//       sections[key.toLowerCase().charCodeAt(0) - 97].data.push(contact)
//       })
//     console.log(sections)
//     this.setState({sections: sections})
//   })
  
// }



//   render() {
//     // console.log(this.state)

//     return (
//       <View>
//         <Input
//           placeHolder="contact name"
//           onChangeText={(val) => {this.setState({selectedContact: val})}}
//           value={this.state.selectedContact}
//         />
//         <SectionList
//           // style={styles.list}
//           sections={this.state.sections}
//           renderItem={this.renderItem}
//           keyExtractor={(item) => {return(item.id)}}
//           initialNumToRender="10"
//           renderSectionHeader={this.renderHeader}
//           // getItemLayout={this.getItemLayout}
//           // windowSize={3}
//           // ref={c => (this.listRef = c)}
//         />
//         <View style={styles.scrubber} pointerEvents="box-none">
//           <Scrubber onScrub={this.scrollToChar} />
//         </View>
//       </View>
//     )
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff'
//   },
//   list: {
//     flex: 1
//   },
//   item: {
//     height: 40,
//     // borderWidth: 1,
//     // borderColor: '#CCCCCC',
//     justifyContent: 'center'
    
//   },
//   itemText: {
//     paddingLeft: 50,
//     textAlign: 'left'
//   },
//   sectionHeader: {
//     paddingLeft: 10,
//     fontWeight: 'bold',
//     fontSize: 16,
//     textAlign: 'left'
//   },
//   divider: {
//     backgroundColor: 'black', 
//     width: '75%',
//     position: "relative",
//     bottom: 10
//   },
//   sectionDivider: {
//     alignItems: "center"
//   },t
//   scrubber: {
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     bottom: 0,
//     justifyContent: 'center'
//   }
// });

