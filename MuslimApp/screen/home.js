import React, {Component} from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Text } from 'react-native';
import { Container, Content, Footer, FooterTab, Button } from 'native-base';
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
      // this.setNotification()
      this.setState({ test : 'nut'})
      Axios.get('https://www.service.muslimdailylife.online/restaurant')
      .then(response => this.setState({ albums: response.data }))
      Axios.get('https://www.service.muslimdailylife.online/prayerplace')
      .then(response => this.setState({ pray: response.data }))
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
