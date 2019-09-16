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
            title: 'Restaurant Details',
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
    }
  }
);
  
export default createAppContainer(StackNavigator);