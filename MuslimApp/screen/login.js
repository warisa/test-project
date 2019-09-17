import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Container, Title, Button, Icon, Left, Right, Body, Content } from "native-base";
import Entypo from 'react-native-vector-icons/Entypo';
import { AccessToken, LoginManager  } from 'react-native-fbsdk';
import Axios from 'axios';

export default class login extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount() {
    //this.loginFacebook()
  }

  async loginFacebook(){
    var loginCheck = await LoginManager.logInWithPermissions(['public_profile']).then(
      function(result) {
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
    if(loginCheck == true){
      const accessData = await AccessToken.getCurrentAccessToken();
      Axios.post('http://10.4.56.94/login', { facebookToken: accessData.accessToken })
      .then(response => {
        console.log(response)
        this.props.navigation.navigate('HOME')
      })
      .catch(error => {
        console.log(error);
      });
    }

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
