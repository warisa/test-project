/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Image,StyleSheet,View,Text,TouchableHighlight} from 'react-native';
import Axios from 'axios';
import { Content } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import restaurantDetail from './screen/restaurantDetail';
import prayDetail from './screen/prayDetail';
import category from './screen/category';
import categoryPrayer from './screen/categoryPrayer';
import restaurantPrayer from './screen/restaurantPrayer';
import restaurant from './screen/restaurant';
import prayPlace from './screen/prayPlace';
import prayTime from './screen/prayTime';
import account from './screen/account';
import review from './screen/review';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator,} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

class App extends Component {
  constructor(){
    super()
      this.state = { //ประกาศตัวแปรใน this.state นอกstate = ค่าคงที่
        albums: [],
        pray: []
      }
    }
    
  componentDidMount() {
    this.setState({ test : 'nut'})
    Axios.get('http://10.4.56.94/restaurant')
    .then(response => this.setState({ albums: response.data }))
    Axios.get('http://10.4.56.94/prayerplace')
    .then(response => this.setState({ pray: response.data }))
  }
  render() {
    return (
      <Content>
        <View>
          <Image source={require('./image/Halallogo.png')} style={{width:'100%',height:150}} />
              <TouchableHighlight onPress={() => this.props.navigation.navigate('restaurant')}>
                <Text style={{marginTop:10,fontSize:15, color:'black'}}>Restaurant</Text>
              </TouchableHighlight>
              
              <ScrollView horizontal={true} style={styles.container}
                showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                  {
                    this.state.albums.map((shop, i) => {
                      return <View key={i} style={{alignItems: 'center', marginTop:10, width:130,height:150}}>
                              <TouchableHighlight onPress={() => this.props.navigation.navigate('detail',{placeId:shop.placeId})}>
                                <Image source={{uri: shop.imageName}} style={{width: 120, height: 100, margin: 7}} />
                              </TouchableHighlight>
                              <Text style={{fontSize:10}}>{shop.placeName}</Text>
                            </View>;
                    })
                  }
            </ScrollView>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('prayPlace')}>
                <Text style={{marginTop:10,fontSize:15, color:'black'}}>Prayer Place</Text>
              </TouchableHighlight>
            <ScrollView horizontal={true} style={styles.container}
                showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                  {
                    this.state.pray.map((pray, i) => { 
                      return <View key={i} style={{alignItems: 'center', marginTop:10, width:130,height:150}}>
                              <TouchableHighlight onPress={() => this.props.navigation.navigate('detail1',{placeId:pray.placeId})}>
                                <Image source={{uri: pray.imageName}} style={{width: 120, height: 100, margin: 7}} />
                              </TouchableHighlight>
                              <Text style={{fontSize:10}}>{pray.placeName}</Text>
                            </View>;
                    })
                  }
            </ScrollView>
         </View>
      </Content>
    );
  }
}

const StackNavigator = createStackNavigator(
  {
    Navigate:{ screen: App,
     navigationOptions:{
     }},
      detail:{ screen: restaurantDetail,
        navigationOptions:{
          title:"Detail"
        }
      },
      detail1:{ screen: prayDetail,
        navigationOptions:{
          title:"Detail"
        }
      },

  },
  {
    initialRouteName : 'Navigate',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#CC6600',
      },
      headerTintColor: '#fff',
      headerTitleStyle: { 
        flex:1,
      },
      headerRight: (<View />)
    },
  }
);
const StackNavigator2 = createStackNavigator(
  {
    restaurant:{ screen: restaurant,
     navigationOptions:{
       title:"Restaurant"
     }},
     restaurantDetail:{ screen: restaurantDetail,
      navigationOptions:{
        title:"Detail"
      }},
      category:{screen: category,
        navigationOptions:{
          title:"Restautant"
      }},
      review:{ screen: review,
        navigationOptions:{
          title:"Review"
      }}
  },
  {
    initialRouteName : 'restaurant',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#CC6600',
      },
      headerTintColor: '#fff',
      headerTitleStyle: { 
        flex:1,
      },
      headerRight: (<View />)
    },
  }
);
const StackNavigator3 = createStackNavigator(
  {
    prayerPlace:{ screen: prayPlace,
     navigationOptions:{
       title:"Pray Place"
     }},
     prayerDetail:{ screen: prayDetail,
      navigationOptions:{
        title:"Detail"
      }},
      restaurantPrayer:{screen: restaurantPrayer,
        navigationOptions:{
          title:"Prayer Place"
      }},
      categoryPrayer:{screen: categoryPrayer,
        navigationOptions:{
          title:"Prayer Place"
      }},
      review:{ screen: review,
        navigationOptions:{
          headerVisible: false,
      }}
  },
  {
    initialRouteName : 'prayerPlace',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#CC6600',
      },
      headerTintColor: '#fff',
      headerTitleStyle: { 
        flex:1,
      },
      headerRight: (<View />)
    },
  }
);
const TabNavigator = createBottomTabNavigator(
  {
    Home: {screen: StackNavigator,
      navigationOptions:{
      tabBarIcon:()=>(
        <Icon name="ios-home" style={{color:'white'}} size={25}/>
      )
    }
  },
    Restaurant:{screen: StackNavigator2,
      navigationOptions:{
        tabBarIcon:()=>(
          <Icon name="md-restaurant" style={{color:'white'}} size={25}/>
        )
      }
    },
    PrayPlace:{screen: StackNavigator3,
      navigationOptions:{
        tabBarIcon:()=>(
          <Icons name="home-map-marker" style={{color:'white'}} size={25}/>
        )
      }
    },
    PrayTime:{screen: prayTime,
      navigationOptions:{
        tabBarIcon:()=>(
          <Icon name="ios-alarm" style={{color:'white'}} size={25}/>
        )
      }
    },
    Account:{screen: account,
      navigationOptions:{
        tabBarIcon:()=>(
          <Icon name="ios-contact" style={{color:'white'}} size={25}/>
        )
      }
    },
  },
  {
    tabBarOptions: {
      style: {
           height:60,
          backgroundColor: '#CC6600',
          padding: 8,
      },
       indicatorStyle: {
          borderBottomColor: '#ffffff',
          borderBottomWidth: 3,
      },
      tabStyle: {
          borderColor: '#CC6600',
          borderRightWidth: 1,
      },
      labelStyle: {
        fontSize: 10,
         marginTop: 0,
         color :'#ffffff'
      },
    }
  },
    {
      initialRouteName : 'Home'
    }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'orange'
  },
}
);
export default createAppContainer(TabNavigator);