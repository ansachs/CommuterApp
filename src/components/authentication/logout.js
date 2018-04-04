import React from 'react';
import { WebView, View, Modal } from 'react-native';

// const WebViewModal = () =>




  


export default LogoutModal = (props) => 

  <Modal
  animationType="slide"
  transparent={false}
  visible={props.state.modalVisible}
  onRequestClose={() => { props.onLogout }}
  >
  <WebView
      source={{uri: 'https://www.nyt.com/'}}
      onNavigationStateChange={()=> props.onLogout}
      //style={{'width':100, 'height': 200}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  
</Modal>




