import * as firebase from 'firebase';

// Initialize Firebase


export default Auth = () => {

//   const firebaseConfig = {
//   apiKey: "AIzaSyBIlpsd3z_mPqH3k2il5vXx6VhNgAQOMqo",
//   authDomain: "commuter-app-4ea22.firebaseapp.com",
//   databaseURL: "https://commuter-app-4ea22.firebaseio.com",
//   storageBucket: "commuter-app-4ea22.appspot.com"
// };

// firebase.initializeApp(firebaseConfig);
// 

async function getUserInfo(accessToken) {
  let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `Bearer ${accessToken}`},
  });

  return userInfoResponse;
}



}

