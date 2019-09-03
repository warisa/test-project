import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight,Image } from 'react-native';
import Axios from 'axios';
import { Content,Item,Icon,Input } from 'native-base';
import Card from './Card';
import CardSection from './CardSection';
import { ScrollView } from 'react-native-gesture-handler';

export default class restaurant extends Component {
constructor(){
  super()
    this.state = { //ประกาศตัวแปรใน this.state นอกstate = ค่าคงที่
      place: [],
      category:[],
      search: null
    }
  }
  componentDidMount() {
    Axios.get('http://10.4.56.94/restaurant')
    .then(response => this.setState({ place: response.data }))
  }
    searchRestaurant(search){
    if(search==null || search==""){
      Axios.get('http://10.4.56.94/restaurant')
      .then(response => this.setState({ place: response.data }))
    }else{
      Axios.get('http://10.4.56.94/searchbyword1/'+search)
      .then(response => this.setState({ place: response.data }))
    }
  }

  render() {
    return (
      <View>   
        <Item>
         <Icon name="ios-search" />
        <Input placeholder="Search" value={this.setState.search} onChangeText={(event) => this.searchRestaurant(event) }/>
       </Item>  
       <Card>
       <CardSection>
       <ScrollView horizontal={true} style={styles.container1}
                showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('category',{categoryName :"steak"})}>
                <Image source={require('../image/steak1.png')} style={{width:90,height:80,marginRight:10}}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('category',{categoryName :"pizza"})}>
                <Image source={require('../image/pizza.png')} style={{width:100,height:80,marginRight:10}}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('category',{categoryName :"grill buffet"})}>
                <Image source={require('../image/buffet.png')} style={{width:90,height:75,marginRight:10}}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('category',{categoryName :"shabu"})}>
                <Image source={require('../image/Shabu1.png')} style={{width:90,height:75,marginRight:10}}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('category',{categoryName :"Fast food"})}>
                <Image source={require('../image/curry.png')} style={{width:100,height:80,marginRight:10}}/>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.navigation.navigate('category',{categoryName :"dessert"})}>
                <Image source={require('../image/dessert.png')} style={{width:100,height:90}}/>
              </TouchableHighlight>
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
                                      <TouchableHighlight onPress={() => this.props.navigation.navigate('restaurantDetail',{placeId:restaurant.placeId})}>                             
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
      </View>
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
