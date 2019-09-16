import React, { Component } from 'react';
import { View, Text, StyleSheet , TouchableHighlight, Image} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Axios from 'axios';
import { Container, Footer, FooterTab, Button, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';

export default class prayPlace extends Component {
  constructor(){
    super()
      this.state = { //ประกาศตัวแปรใน this.state นอกstate = ค่าคงที่
        place2: [],
        category:[]
      }
    }
    componentWillMount() {
      Axios.get('http://10.4.56.94/prayerplace')
      .then(response => this.setState({ place2: response.data }))
    }
    searchPrayerPlace(search){
      if(search==null || search==""){
        Axios.get('http://10.4.56.94/prayerplace')
        .then(response => this.setState({ place2: response.data }))
      }else{
        Axios.get('http://10.4.56.94/searchbyword2/'+search)
        .then(response => this.setState({ place2: response.data }))
      }
    }
    render() {
      return (
        <Container>   
          <Item>
           <Icon name="ios-search" />
           <Input placeholder="Search" value={this.setState.search} onChangeText={(event) => this.searchPrayerPlace(event) }/>
         </Item>
         <Card>
           <CardSection>
             <View style={styles.container1}>
                      <TouchableHighlight onPress={() => this.props.navigation.navigate('RESTAURANTPRAY',{placePrayerRoom :"1"})}>
                        <Image source={require('../image/restaurant.png')} style={{width:90,height:80,marginRight:10}}/>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={() => this.props.navigation.navigate('CATEGORYPRAY',{categoryName :"Shopping Mall"})}>
                        <Image source={require('../image/shop.png')} style={{width:100,height:80,marginRight:10}}/>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={() => this.props.navigation.navigate('CATEGORYPRAY',{categoryName :"Mosque"})}>
                        <Image source={require('../image/masjid.png')} style={{width:90,height:70,marginRight:10}}/>
                      </TouchableHighlight>
                      </View>
         </CardSection>
         </Card>
            <ScrollView>
                    { 
                      this.state.place2.map( (prayerplace,i) =>{ 
                        return <Card key={i}>
                                  <View style={{ marginTop:10,width:'100%'}}>
                                    <CardSection>
                                    <View >
                                      <TouchableHighlight onPress={() => this.props.navigation.navigate('PRAYDETAIL',{placeId:prayerplace.placeId})}>
                                        <Image source={{uri: prayerplace.imageName}} style={{width: 150, height: 100, margin: 7}}></Image>
                                      </TouchableHighlight>
                                    </View>
                                    <View style={styles.container}>
                                        <Text style={{color:'black'}}>{prayerplace.placeName}</Text>
                                        <Text style={{color:'red'}}>Open: {prayerplace.placeOpeningTime}</Text>
                                        <Text style={{color:'red'}}>Close: {prayerplace.placeClosingTime}</Text>
                                        <Text style={{color:'black'}}>Telno : {prayerplace.placeTelno}</Text>
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
              <Button onPress={() => this.props.navigation.navigate('RESTAURANT')}>
                <Icon name="md-restaurant" style={{color:'white'}} size={25}/>
                <Text style={{color:'white',fontSize:10}} >Restaurant</Text>
              </Button>
              <Button>
                <Icons name="home-map-marker" style={{color:'white'}} size={25}/>
                <Text style={{color:'white',fontSize:10}} >Pray Place</Text>
              </Button>
              <Button onPress={() => this.props.navigation.navigate('PRAYTIME')}>
                <Icon name="ios-alarm" style={{color:'white'}} size={25}/>
                <Text style={{color:'white',fontSize:10}} >Pray Time</Text>
              </Button>
              <Button onPress={() => this.props.navigation.navigate('')}>
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
          marginLeft: 20,
          flex: 1,
          width:'100%'
      },
      container1: {
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
      }
  });
