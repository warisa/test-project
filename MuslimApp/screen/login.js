import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import { Container, Title, Button, Icon, Left, Right, Body, Content } from "native-base";
import Entypo from 'react-native-vector-icons/Entypo';
import { AccessToken, LoginManager  } from 'react-native-fbsdk';
import Axios from 'axios';
import firebase from 'react-native-firebase';

export default class login extends Component {

  constructor(props){
    super()
     this.state = { //ประกาศตัวแปรใน this.state นอกstate = ค่าคงที่
        token:""
      }
    }
  

  componentDidMount() {
    this.checkGoHome();
    this.setNotification();
      this.notificationListener;
      this.notificationOpenedListener;
  }

  async checkGoHome(){
    var dataUser = await this.checkUser();
    if(dataUser != 'none' && dataUser != null && dataUser != ''){
      this.props.navigation.navigate('HOME')
    }
  }

  async checkUser() {
    let user = '';
    try {
      user = await AsyncStorage.getItem('user') || null;
      console.log(user)
    } catch (error) {
      console.log(error.message);
    }
    return user;
  }

  async saveUser (user) {
    try {
      await AsyncStorage.setItem('user', '' + user.userId);
      await AsyncStorage.setItem('image', '' + user.userImage);
    } catch (error) {
      console.log(error.message);
    }
  }

  async loginFacebook(){
    var loginCheck = await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function(result) {
        console.log(result)
        if (result.isCancelled) {
          alert('Login was cancelled');
          return false;
        } else {
          return true;
        }
      },
      function(error) {
        alert('Login failed with error: ' + error);
        return false;
      }
    );
    console.log(loginCheck)
    if(loginCheck == true){
      const accessData = await AccessToken.getCurrentAccessToken();
      console.log(accessData.accessToken)
      console.log(this.state.token)
      Axios.post('https://www.service.muslimdailylife.online/login', { facebookToken: accessData.accessToken, firebaseToken: this.state.token })
      .then(response => {
        console.log(response)
        const  user = response.data;
        console.log(user)
        this.saveUser(user)
        this.checkGoHome();
      })
      .catch(error => {
        console.log(error);
      });
    }

  }

    setNotification(){
      this.checkPermission();
      this.createNotificationListeners();
    }
  
    //1
    async checkPermission() {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        this.getToken();
      } else {
        this.requestPermission();
      }
    }
  
    //2
    async requestPermission() {
      try {
        await firebase.messaging().requestPermission();
        this.getToken();
      } catch (error) {
        console.log('permission rejected');
      }
    }
  
    //3
    async getToken() {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          console.log('fcmToken:', fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      }
      this.state.token = fcmToken;
      console.log('fcmToken:', this.state.token);
    }
  
    async createNotificationListeners() {
      this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        console.log('onNotification:');
        
          const localNotification = new firebase.notifications.Notification({
            sound: 'sampleaudio',
            show_in_foreground: true,
          })
          .setSound('sampleaudio.mp3')
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .android.setChannelId('fcm_FirebaseNotifiction_default_channel')
          .android.setColor('#000000')
          .android.setPriority(firebase.notifications.Android.Priority.High);
  
          firebase.notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));
      });
  
      const channel = new firebase.notifications.Android.Channel('fcm_FirebaseNotifiction_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
        .setDescription('Demo app description')
        .setSound('sampleaudio.mp3');
      firebase.notifications().android.createChannel(channel);
  
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        console.log('onNotificationOpened:');
        Alert.alert(title, body)
      });
  
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        console.log('getInitialNotification:');
        Alert.alert(title, body)
      }
      this.messageListener = firebase.messaging().onMessage((message) => {
        console.log("JSON.stringify:", JSON.stringify(message));
        
      });
    }

  render() {
    return (
      <View style={styles.container}>
        <Body style={styles.logo}>
            <Image style={{width:250,height:250,marginBottom:20}} source={require('../image/app_logo.png')}/>
            <Button style={{marginLeft:20}} onPress={() => {this.loginFacebook()}}>
              <Entypo name='facebook' style={{color:'white',margin:10}} size={20}/>
              <Text style={{color:'white',marginRight:10}}>Login with Facebook</Text>
            </Button>
        </Body>
    </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
      container:{
          flex: 1,
          backgroundColor:'#FF8200'
      },
      logo:{
        flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
      }
  });
