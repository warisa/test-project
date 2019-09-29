import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import { StyleSheet, View, Image, TouchableHighlight, Alert, Text, AsyncStorage } from 'react-native';
import { Container, Content, Body, Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export default class home extends Component {
  constructor(){
    super()
      this.state = { //ประกาศตัวแปรใน this.state นอกstate = ค่าคงที่
        albums: [],
        pray: []
      }
    }
    
    componentDidMount() {
      this.setNotification()
      this.setState({ test : 'nut'})
      Axios.get('http://10.4.56.94/restaurant')
      .then(response => this.setState({ albums: response.data }))
      Axios.get('http://10.4.56.94/prayerplace')
      .then(response => this.setState({ pray: response.data }))
    }
  
    componentDidmount() {
      this.notificationListener;
      this.notificationOpenedListener;
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
      console.log('fcmToken:', fcmToken);
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
      <Container>
        <Content>
          <Image source={require('../image/Halallogo.png')} style={{width:'100%',height:150}} />
          <TouchableHighlight onPress={() => this.props.navigation.navigate('RESTAURANT')}>
            <Text style={{marginTop:10,fontSize:15, color:'black'}}>Restaurant</Text>
          </TouchableHighlight>
          
          <ScrollView horizontal={true} style={styles.container}
            showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              {
                this.state.albums.map((shop, i) => {
                  return <View key={i} style={{alignItems: 'center', marginTop:10, width:130,height:150}}>
                          <TouchableHighlight onPress={() => this.props.navigation.navigate('RESTAURANTDETAIL',{placeId:shop.placeId})}>
                            <Image source={{uri: shop.imageName}} style={{width: 120, height: 100, margin: 7}} />
                          </TouchableHighlight>
                          <Text style={{fontSize:10}}>{shop.placeName}</Text>
                        </View>;
                })
              }
        </ScrollView>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('PRAYPLACE')}>
            <Text style={{marginTop:10,fontSize:15, color:'black'}}>Prayer Place</Text>
          </TouchableHighlight>
        <ScrollView horizontal={true} style={styles.container}
            showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              {
                this.state.pray.map((pray, i) => { 
                  return <View key={i} style={{alignItems: 'center', marginTop:10, width:130,height:150}}>
                          <TouchableHighlight onPress={() => this.props.navigation.navigate('PRAYDETAIL',{placeId:pray.placeId})}>
                            <Image source={{uri: pray.imageName}} style={{width: 120, height: 100, margin: 7}} />
                          </TouchableHighlight>
                          <Text style={{fontSize:10}}>{pray.placeName}</Text>
                        </View>;
                })
              }
          </ScrollView>
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor: '#FF8200'}}>
            <Button>
              <Icon name="ios-home" style={{color:'white'}} size={25}/>
              <Text style={{color:'white',fontSize:10}} >Home</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('RESTAURANT')}>
              <Icon name="md-restaurant" style={{color:'white'}} size={25}/>
              <Text style={{color:'white',fontSize:10}} >Restaurant</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('PRAYPLACE')}>
              <Icons name="home-map-marker" style={{color:'white'}} size={25}/>
              <Text style={{color:'white',fontSize:10}} >Pray Place</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('PRAYTIME')}>
              <Icon name="ios-alarm" style={{color:'white'}} size={25}/>
              <Text style={{color:'white',fontSize:10}} >Pray Time</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('PROFILE')}>
              <Icon name="ios-contact" style={{color:'white'}} size={25}/>
              <Text style={{color:'white',fontSize:10}} >Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'orange'
  }
});

// const StackNavigator = createStackNavigator(
//   {
//     Navigate:{ screen: App,
//      navigationOptions:{
//      }},
//       detail:{ screen: restaurantDetail,
//         navigationOptions:{
//           title:"Detail"
//         }
//       },
//       detail1:{ screen: prayDetail,
//         navigationOptions:{
//           title:"Detail"
//         }
//       },

//   },
//   {
//     initialRouteName : 'Navigate',
//     defaultNavigationOptions: {
      // headerStyle: {
      //   backgroundColor: '#CC6600',
      // },
      // headerTintColor: '#fff',
      // headerTitleStyle: { 
      //   flex:1,
      // },
      // headerRight: (<View />)
//     },
//   }
// );
// const StackNavigator2 = createStackNavigator(
//   {
//     restaurant:{ screen: restaurant,
//      navigationOptions:{
//        title:"Restaurant"
//      }},
//      restaurantDetail:{ screen: restaurantDetail,
//       navigationOptions:{
//         title:"Detail"
//       }},
//       category:{screen: category,
//         navigationOptions:{
//           title:"Restautant"
//       }},
//       review:{ screen: review,
//         navigationOptions:{
//           title:"Review"
//       }}
//   },
//   {
//     initialRouteName : 'restaurant',
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: '#CC6600',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: { 
//         flex:1,
//       },
//       headerRight: (<View />)
//     },
//   }
// );
// const StackNavigator3 = createStackNavigator(
//   {
//     prayerPlace:{ screen: prayPlace,
//      navigationOptions:{
//        title:"Pray Place"
//      }},
//      prayerDetail:{ screen: prayDetail,
//       navigationOptions:{
//         title:"Detail"
//       }},
//       restaurantPrayer:{screen: restaurantPrayer,
//         navigationOptions:{
//           title:"Prayer Place"
//       }},
//       categoryPrayer:{screen: categoryPrayer,
//         navigationOptions:{
//           title:"Prayer Place"
//       }},
//       review:{ screen: review,
//         navigationOptions:{
//           headerVisible: false,
//       }}
//   },
//   {
//     initialRouteName : 'prayerPlace',
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: '#CC6600',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: { 
//         flex:1,
//       },
//       headerRight: (<View />)
//     },
//   }
// );
// const TabNavigator = createBottomTabNavigator(
//   {
//     Home: {screen: StackNavigator,
//       navigationOptions:{
//       tabBarIcon:()=>(
//         <Icon name="ios-home" style={{color:'white'}} size={25}/>
//       )
//     }
//   },
//     Restaurant:{screen: StackNavigator2,
//       navigationOptions:{
//         tabBarIcon:()=>(
//           <Icon name="md-restaurant" style={{color:'white'}} size={25}/>
//         )
//       }
//     },
//     PrayPlace:{screen: StackNavigator3,
//       navigationOptions:{
//         tabBarIcon:()=>(
//           <Icons name="home-map-marker" style={{color:'white'}} size={25}/>
//         )
//       }
//     },
//     PrayTime:{screen: prayTime,
//       navigationOptions:{
//         tabBarIcon:()=>(
//           <Icon name="ios-alarm" style={{color:'white'}} size={25}/>
//         )
//       }
//     },
//     Account:{screen: login,
//       navigationOptions:{
//         tabBarIcon:()=>(
//           <Icon name="ios-contact" style={{color:'white'}} size={25}/>
//         )
//       }
//     },
//   },
//   {
//     tabBarOptions: {
//       style: {
//            height:60,
//           backgroundColor: '#CC6600',
//           padding: 8,
//       },
//        indicatorStyle: {
//           borderBottomColor: '#ffffff',
//           borderBottomWidth: 3,
//       },
//       tabStyle: {
//           borderColor: '#CC6600',
//           borderRightWidth: 1,
//       },
//       labelStyle: {
//         fontSize: 10,
//          marginTop: 0,
//          color :'#ffffff'
//       },
//     }
//   },
//     {
//       initialRouteName : 'Home'
//     }
// );