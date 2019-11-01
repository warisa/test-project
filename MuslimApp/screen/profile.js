import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { List, ListItem,Button,Footer, FooterTab, Container, Content, Left, Right, Body } from 'native-base';
import Axios from 'axios';
import Material from 'react-native-vector-icons/MaterialIcons';
import { AccessToken, LoginManager  } from 'react-native-fbsdk';


export default class profile extends Component {

  constructor(){
    super()
      this.state = { //ประกาศตัวแปรใน this.state นอกstate = ค่าคงที่
        user: {
          userFName: '',
          userLName: '',
          userEMail: '',
          userImage: ''
        }
      }
    }

  componentDidMount() {
    this.checkUser()
    this.clearUser();
  }
  
  
  async clearUser(){
    if (AccessToken.getCurrentAccessToken() != null) {
      await LoginManager.logOut();
  }
}

  async checkUser() {
    let user = '';
    try {
      user = await AsyncStorage.getItem('user') || null;
    } catch (error) {
      this.props.navigation.navigate('LOGIN')
    }
    this.getUser(user)
  }

  async getUser(user){
    await Axios.get('http://10.4.56.94/profile/' + user)
    .then(response => this.setState({ user: response.data[0] }))
    console.log(this.state.user)
  }

  async logout() {
    // if(LoginManager.getInstance()!=null){
    // await LoginManager.getInstance().logOut()
    // }
    try {
      this.clearUser();
      await AsyncStorage.removeItem('user');
      await AsyncStorage.clear();
      this.props.navigation.navigate('LOGIN')
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <Container>
        <Content style={{marginTop:30}}>
        <Image style={styles.avatar} source={{ uri: this.state.user.userImage }}/>
        <Text style={styles.name}>{ this.state.user.userFName }  { this.state.user.userLName }</Text>
        <List>
          <ListItem thumbnail>
            <Left>
              <Text style={{fontWeight:'bold',fontSize:17}}>Email:</Text>
            </Left>
            <Body>
              <Text> { this.state.user.userEmail }</Text>
            </Body>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Icons name='map-marker-plus' style={{color:'black'}} size={20}/>
            </Left>
            <Body>
              <Text>ประวัติการเพิ่มสถานที่: </Text>
            </Body>
            <Right>
              <Icon name="ios-arrow-forward" style={{color:'gray',marginRight:10}} size={25} onPress={()  => this.props.navigation.navigate('ADDHISTORY')}/>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Material name='rate-review' style={{color:'black'}} size={20}/>
            </Left>
            <Body>
              <Text>ประวัติการรีวิว: </Text>
            </Body>
            <Right>
              <Icon name="ios-arrow-forward" style={{color:'gray',marginRight:10}} size={25} onPress={()  => this.props.navigation.navigate('REVIEW')}/>
            </Right>
          </ListItem>
        </List>
        <Button style={styles.buttonContainer} onPress={() => this.logout()}><Text>Logout</Text></Button>
        </Content>
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
              <Button onPress={() => this.props.navigation.navigate('PRAYPLACE')}>
                <Icons name="home-map-marker" style={{color:'white'}} size={25}/>
                <Text style={{color:'white',fontSize:10}} >Pray Place</Text>
              </Button>
              <Button onPress={() => this.props.navigation.navigate('PRAYTIME')}>
                <Icon name="ios-alarm" style={{color:'white'}} size={25}/>
                <Text style={{color:'white',fontSize:10}} >Pray Time</Text>
              </Button>
              <Button>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    // borderWidth: 4,
    // borderColor: "white",
    // marginBottom:10,
    alignSelf:'center',
    // position: 'absolute',
    paddingTop:30
  },
  name:{
    fontSize:22,
    color:"#FF8200",
    fontWeight:'600',
    alignSelf:'center'
  },
  // // body:{
  // //   marginTop:40,
  // // },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:200,
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    alignSelf:'center'
  },
});
 
