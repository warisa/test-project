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
        switchValue: [
          {
            name: "Fajr",
            value: false
          },
          {
            name: "Dhuhr",
            value: false
          },
          {
            name: "Asr",
            value: false
          },
          {
            name: "Maghrib",
            value: false
          },
          {
            name: "Ishaa",
            value: false
          }
        ]
      }
      this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    }

  componentDidMount() {
    Axios.get('http://10.4.56.94/prayertime')
    .then(response => this.setState({ time: response.data, date: '' + new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() }))
  }

  parseTime( t ) {
    var d = new Date();
    var time = t.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
    d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
    d.setMinutes( parseInt( time[2]) || 0 );
    return d;
  }

  setNotif(name, time){
    if(name == "Fajr"){
      this.notif.scheduleNotif();
      //this.notif.fajrNotif(this.parseTime(time))
    }
    if(name == "Dhuhr"){
      this.notif.DhuhrNotif(this.parseTime(time))
    }
    if(name == "Asr"){
      this.notif.AsrNotif(this.parseTime(time))
    }
    if(name == "Maghrib"){
      this.notif.MaghribNotif(this.parseTime(time))
    }
    if(name == "Ishaa"){
      this.notif.IshaaNotif(this.parseTime(time))
    }
  }

  onChangeFunction = (data, i, time) => {
    let newData = JSON.parse(JSON.stringify(this.state.switchValue))
    newData[i].value = data

    this.setState({
      switchValue: newData 
    })
    if(data == true){
      this.setNotif(newData[i].name, time)
    }
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
                    this.state.time.map( (praytime, i) => 
                      <ListItem key={praytime.prayerTimeId} thumbnail>
                        <Left>
                          <Icon name="md-alarm" style={{color:'black'}} size={30}/>
                        </Left>
                        <Body>
                          <Text style={{color:'black',fontSize:25}}>{praytime.prayerTime}</Text>
                          <Text style={{fontSize:20}}>{praytime.prayerType}</Text>
                        </Body>
                        <Right>
                        <Text style={styles.textStyle}>{this.state.switchValue[i].value ? 'on' :'off'}</Text>  
                        <Switch  
                          value={this.state.switchValue[i].value}  
                          onValueChange = {(value) => this.onChangeFunction(value,i,praytime.prayerTime)}  
                          />
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