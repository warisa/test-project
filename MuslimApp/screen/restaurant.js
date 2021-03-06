import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight,Image } from 'react-native';
import Axios from 'axios';
import { Container, Footer, FooterTab, Button, Item, Input } from 'native-base';
import Card from './Card';
import CardSection from './CardSection';
import { ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class restaurant extends Component {

static navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <AntDesign name="plus" style={{color:'white',marginRight:10}} size={25} onPress={() => navigation.navigate('ADDLOCATION')}/>
    )
  };
};

constructor(){
  super()
    this.state = { //ประกาศตัวแปรใน this.state นอกstate = ค่าคงที่
      place: [],
      category:[],
      menu:[],
      search: null
    }
  }
  componentDidMount() {
    Axios.get('https://www.service.muslimdailylife.online/restaurant')
    .then(response => this.setState({ place: response.data }))
    Axios.get('https://www.service.muslimdailylife.online/category1/1')
    .then(response => this.setState({ menu: response.data }))
  }
    searchRestaurant(search){
    if(search==null || search==""){
      Axios.get('https://www.service.muslimdailylife.online/restaurant')
      .then(response => this.setState({ place: response.data }))
    }else{
      Axios.get('https://www.service.muslimdailylife.online/searchbyword1/'+search)
      .then(response => this.setState({ place: response.data }))
    }
  }

  render() {
    return (
      <Container>   
        <Item>
         <Icon name="ios-search" />
        <Input placeholder="Search" value={this.setState.search} onChangeText={(event) => this.searchRestaurant(event) }/>
       </Item>  
       <Card>
       <CardSection>
       {/* <ScrollView horizontal={true} style={styles.container1}
                showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('CATEGORY',{categoryName :"steak"})}>
                <Image source={require('../image/steak1.png')} style={{width:90,height:80,marginRight:10}}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('CATEGORY',{categoryName :"pizza"})}>
                <Image source={require('../image/pizza.png')} style={{width:100,height:80,marginRight:10}}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('CATEGORY',{categoryName :"grill buffet"})}>
                <Image source={require('../image/buffet.png')} style={{width:90,height:75,marginRight:10}}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('CATEGORY',{categoryName :"shabu"})}>
                <Image source={require('../image/Shabu1.png')} style={{width:90,height:75,marginRight:10}}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('CATEGORY',{categoryName :"Fast food"})}>
                <Image source={require('../image/curry.png')} style={{width:100,height:80,marginRight:10}}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('CATEGORY',{categoryName :"dessert"})}>
                <Image source={require('../image/dessert.png')} style={{width:100,height:90}}/>
              </TouchableHighlight>
         </ScrollView> */}
         <ScrollView horizontal={true} style={styles.container1} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
         { 
            this.state.menu.map( menu => 
                <TouchableHighlight  key={menu.categoryId} onPress={() => this.props.navigation.navigate('CATEGORY',{categoryName : menu.categoryName})}>
                  <Image source={{uri:menu.categoryImage}} style={{width:90,height:80,marginRight:10}}/>
                </TouchableHighlight>
                )
              }
         </ScrollView> 
         </CardSection>
         </Card> 
            <ScrollView>
                  { 
                    this.state.place.map((restaurant, i) => {
                      return <Card key={i}> 
                              <View>
                                  <CardSection>
                                    <View>
                                      <TouchableHighlight onPress={() => this.props.navigation.navigate('RESTAURANTDETAIL',{placeId:restaurant.placeId})}>                             
                                        <Image source={{uri: restaurant.imageName}} style={{width:150,height: 100, margin: 7}}></Image>
                                      </TouchableHighlight>
                                    </View>
                                  <View style={styles.container}>
                                      <Text style={{color:'black'}}>{restaurant.placeName}</Text>
                                      <Text style={{color:'black'}}>Open: {restaurant.placeOpeningTime}</Text>
                                      <Text style={{color:'black'}}>Close: {restaurant.placeClosingTime}</Text>
                                      <Text style={{color:'black'}}>Telno: {restaurant.placeTelno}</Text>
                                    </View>
                                  </CardSection>
                                </View>
                              </Card>;
                    })
                  }        
        </ScrollView>
        <Footer>
          <FooterTab style={{backgroundColor: '#FF8200'}}>
            <Button onPress={() => this.props.navigation.navigate('HOME')}>
              <Icon name="ios-home" style={{color:'white'}} size={25}/>
              <Text style={{color:'white',fontSize:10}} >Home</Text>
            </Button>
            <Button>
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
    container:{
        justifyContent: 'space-around',
        flexDirection:'column',
        marginLeft: 10,
        flex: 1,
        width: '100%'
    },
    container1: {
      flex: 1,
      flexDirection: 'row',
    }
});
