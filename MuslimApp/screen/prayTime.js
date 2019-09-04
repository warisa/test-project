import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert} from 'react-native';
import { Container, Content, Header, Title, List, ListItem, Left, Body, Right, Switch} from 'native-base';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import NotifService from '../NotiService';
import appConfig from '../app.json'; 

export default class prayTime extends Component {
  constructor(){
    super()
      this.state = { //ประกาศตัวแปรใน this.state นอกstate = ค่าคงที่
        timeToDay: '',
        time: [],
        date: '',
        senderId: appConfig.senderID,
        switchValue: false
      }
      this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    }

  componentDidMount() {
    Axios.get('http://10.4.56.94/prayertime')
    .then(response => this.setState({ time: response.data, date: '' + new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() }))
  }

  render() {
        return (
          <Container>
          <Header style={{backgroundColor: '#CC6600'}}>
          <Body>
            <Title>Pray Time</Title>
          </Body>
        </Header>
        <Content>
          <View>
            <View style={{alignItems:'center',justifyContent:'center'}}>
              <ListItem>
                <IconEntypo name="calendar" style={{color:'black',marginRight:10}} size={30}/>
                <Text style={styles.fontStyle}>{this.state.date}</Text>
              </ListItem>
            </View>
            <Content>
              <List>
                  { 
                    this.state.time.map( praytime => 
                      <ListItem key={praytime.prayerTimeId} thumbnail>
                        <Left>
                          <Icon name="md-alarm" style={{color:'black'}} size={30}/>
                        </Left>
                        <Body>
                          <Text style={{color:'black',fontSize:25}}>{praytime.prayerTime}</Text>
                          <Text style={{fontSize:20}}>{praytime.prayerType}</Text>
                        </Body>
                        <Right>
                        <Text style={styles.textStyle}>{this.state.switchValue ? this.notif.localNotif() :'off'}</Text>  
                        <Switch  
                          value={this.state.switchValue}  
                          onValueChange ={(switchValue)=>this.setState({switchValue})}/>
                        </Right>
                      </ListItem>
                      )
                  }
              </List> 
            </Content> 
          </View>
            </Content>
            </Container>
        );
      }
      onRegister(token) {
        Alert.alert("Registered !", JSON.stringify(token));
        console.log(token);
        this.setState({ registerToken: token.token, gcmRegistered: true });
      }
    
      onNotif(notif) {
        console.log(notif);
        Alert.alert(notif.title, notif.message);
      }
    
      handlePerm(perms) {
        Alert.alert("Permissions", JSON.stringify(perms));
      }
    }
  
    const styles = StyleSheet.create({
        container:{
            margin : 10
        },
        card:{
          marginTop:10
        },
        fontStyle:{
          fontSize: 25,
          color: 'black'
        }
    });