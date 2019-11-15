import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import login from './screen/login';
import home from './screen/home';
import restaurant from './screen/restaurant';
import category from './screen/category';
import restaurantDetail from './screen/restaurantDetail';
import prayPlace from './screen/prayPlace';
import categoryPray from './screen/categoryPray';
import restaurantPray from './screen/restaurantPray';
import prayDetail from './screen/prayDetail';
import prayTime from './screen/prayTime';
import profile from './screen/profile';
import reviewPage from './screen/reviewPage';
import addRestaurant from './screen/addRestaurant';
import addPlaceHistory from './screen/addPlaceHistory';
import addPrayPlace from './screen/addPrayPlace';
import historyDetail from './screen/historyDetail';
import addMap from './screen/addMap';
import fullImage from './screen/fullImage'
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import historyPrayDetail from './screen/historyPrayDetail';

console.disableYellowBox = true;
const StackNavigator = createStackNavigator(
  {
    LOGIN:{ 
        screen: login,
        navigationOptions:{
            header: null
        }
    },
    HOME:{ 
        screen: home,
        navigationOptions:{
            title: 'Home',
            headerLeft: null,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    RESTAURANT:{
        screen: restaurant,
        navigationOptions:{
            title: 'Restaurant',
            headerLeft: null,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    CATEGORY:{
        screen: category,
        navigationOptions:{
            title: 'Category',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    RESTAURANTDETAIL:{
        screen: restaurantDetail,
        navigationOptions:{
            title: 'Restaurant Details',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    PRAYPLACE:{
        screen: prayPlace,
        navigationOptions:{
            title: 'Pray Place',
            headerLeft: null,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    CATEGORYPRAY:{
        screen: categoryPray,
        navigationOptions:{
            title: 'Category Pray',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    RESTAURANTPRAY:{
        screen: restaurantPray,
        navigationOptions:{
            title: 'Restaurant Pray',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    PRAYDETAIL:{
        screen: prayDetail,
        navigationOptions:{
            title: 'Pray Place Details',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    PRAYTIME:{
        screen: prayTime,
        navigationOptions:{
            title: 'Pray Time',
            headerLeft: null,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    REVIEW:{
        screen: reviewPage,
        navigationOptions:{
            title: 'Review',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    PROFILE:{
        screen: profile,
        navigationOptions:{
            title: 'Profile',
            headerLeft: null,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    ADDLOCATION:{
        screen: addRestaurant,
        navigationOptions:{
            title: 'ADD LOCATION',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    ADDHISTORY:{
        screen: addPlaceHistory,
        navigationOptions:{
            title: 'ADD PLACE HISTORY',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    ADDPRAYPLACE:{
        screen: addPrayPlace,
        navigationOptions:{
            title: 'ADD Pray Place',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    ADDHISTORYDETAIL:{
        screen: historyDetail,
        navigationOptions:{
            title: 'Detail',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    PRAYHISTORYDETAIL:{
        screen: historyPrayDetail,
        navigationOptions:{
            title: 'Pray Place Detail',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FF8200'
            }
        }
    },
    FULLIMAGE:{
        screen: fullImage,
        navigationOptions: ({navigation}) => ({
            headerTintColor: '#fff',
            headerLeft:null,
            headerRight:(
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <AntDesign name="close" size={24} color='white' />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#000000'
            }
        })
    },
    ADDMAP:{
        screen: addMap,
        navigationOptions:{
            header:null
        }
    },
  }
);
  
export default createAppContainer(StackNavigator);