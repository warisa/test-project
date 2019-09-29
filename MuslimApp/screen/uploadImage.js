// import React, { Component } from 'react';
// import {StyleSheet,Text,PermissionsAndroid} from 'react-native';
// import * as firebase from 'firebase'
// import RNFetchBlob from 'react-native-fetch-blob'
// import CameraRollPicker from 'react-native-camera-roll-picker'
// import { Container } from 'native-base';

// firebase.initializeApp({
//     apiKey: "AIzaSyDtEgB_1sA0XKH-0f07fRRQMJ-9DxljZow",
//     authDomain: "daily-life-of-muslims.firebaseapp.com",
//     databaseURL: "https://daily-life-of-muslims.firebaseio.com/",
//     projectId: "daily-life-of-muslims",
//     storageBucket: "gs://daily-life-of-muslims.appspot.com/",
//     messagingSenderId: 24339890493
//   // storageBucket: "gs://daily-life-of-muslims.appspot.com/",
// });

// export default class uploadImage extends Component {

//   componentDidMount(){
//     this.requestExternalStoreageRead();
//   }
//   async requestExternalStoreageRead() {
//     try {
//         const granted = await PermissionsAndroid.request(
//                   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//                   {
//                        'title': 'Cool App ...',
//                        'message': 'App needs access to external storage'
//                    }
//         );

//         return granted == PermissionsAndroid.RESULTS.GRANTED
// } 
// catch (err) {
//   //Handle this error
//   return false;
// }
// }
// getSelectedImages = (selectedImages, currentImage) => {
    
//   const image = currentImage.uri

//   const Blob = RNFetchBlob.polyfill.Blob
//   const fs = RNFetchBlob.fs
//   window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
//   window.Blob = Blob

 
//   let uploadBlob = null
//   const imageRef = firebase.storage().ref('posts').child(image)
//   let mime = 'image/jpg'
//   fs.readFile(image, 'base64')
//     .then((data) => {
//       return Blob.build(data, { type: `${mime};BASE64` })
//   })
//   .then((blob) => {
//       uploadBlob = blob
//       return imageRef.put(blob, { contentType: mime })
//     })
//     .then(() => {
//       uploadBlob.close()
//       return imageRef.getDownloadURL()
//     })
//     .then((url) => {
//       // URL of the image uploaded on Firebase storage
//       console.log(url);
      
//     })
//     .catch((error) => {
//       console.log(error);

//     })  

// }
//   render() {

//     return (
//       <Container
//        style={styles.gallery}>
//         <CameraRollPicker maximum={5} callback={this.getSelectedImages} />
//         <Text style={styles.welcome}>
//           Image Gallery
//         </Text>        
//       </Container>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   gallery: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   }
// });




