import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'

firebase.initializeApp({
    apiKey: "AIzaSyDtEgB_1sA0XKH-0f07fRRQMJ-9DxljZow",
    authDomain: "daily-life-of-muslims.firebaseapp.com",
    databaseURL: "https://daily-life-of-muslims.firebaseio.com/",
    projectId: "daily-life-of-muslims",
    storageBucket: "gs://daily-life-of-muslims.appspot.com/",
    messagingSenderId: 24339890493
});

export default {
    sendImageToFirebase: async (photo, id) => {
        var imageData = []
        
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        
        for(var i =0; i < photo.length; i++){
            var date = new Date().getDate();
            var month = new Date().getMonth();
            var year = new Date().getFullYear();
            var hours = new Date().getHours();
            var minutes = new Date().getUTCMinutes();
            var seconds = new Date().getMilliseconds();
            let uploadBlob = null
            const imageRef = firebase.storage().ref('posts/'+ id ).child('' + date + month + year + ":" + hours + minutes + seconds + '-' + photo[i].fileName)

            let mime = 'image/png'
            fs.readFile(photo[i].uri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                imageData.push(url);
            })
            .catch((error) => {
                console.log(error);
            })
        }

        return imageData
    },
    sendImage: async (photo, id) => {
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob

        let uploadBlob = null
        const imageRef = firebase.storage().ref('posts/'+ id ).child('test.png')

        let mime = 'image/png'
        fs.readFile(photo.uri, 'base64')
            .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
        })
        .then((url) => {
            console.log(url);
            return url
        })
        .catch((error) => {
            console.log(error);
        })
    }
}