import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Switch, Footer, FooterTab, Button} from 'native-base';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';

export default class prayTime extends Component {
  constructor(){
    super()
      this.state = { //ประกาศตัวแปรใน this.state นอกstate = ค่าคงที่
        timeToDay: '',
        time: [
          {
            "prayTimeId": 1,
            "prayDate": "",
            "prayTime": "",
            "prayTypeId": 1,
            "prayType": "Fajr"
          },
          {
            "prayTimeId": 2,
            "prayDate": "",
            "prayTime": "",
            "prayTypeId": 2,
            "prayType": "Dhuhr"
          },
          {
            "prayTimeId": 3,
            "prayDate": "",
            "prayTime": "",
            "prayTypeId": 3,
            "prayType": "Asr"
          },
          {
            "prayTimeId": 4,
            "prayDate": "",
            "prayTime": "",
            "prayTypeId": 4,
            "prayType": "Maghrib"
          },
          {
            "prayTimeId": 5,
            "prayDate": "",
            "prayTime": "",
            "prayTypeId": 5,
            "prayType": "Ishaa"
          }
        ],
        Fajr: false,
        Dhuhr: false,
        Asr: false,
        Maghrib: false,
        Ishaa: false
      }
    }

    componentWillMount() {
      var that = this;
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      that.setState({
        date:
          date + '/' + month + '/' + year,
      });
    }

    async checkUserSwitch() {
      let user = '';
      try {
        user = await AsyncStorage.getItem('user') || null;
      } catch (error) {
        this.props.navigation.navigate('LOGIN')
      }
      this.getSetSwitch(user)
    }

    async postUserSwitch() {
      let user = '';
      try {
        user = await AsyncStorage.getItem('user') || null;
      } catch (error) {
        this.props.navigation.navigate('LOGIN')
      }
      this.SetChangeSwitch(user)
    }

    getPrayTime(){
      Axios.get('https://www.service.muslimdailylife.online/praytime')
      .then(response => {
        this.setState({ time: response.data })
      })
    }

    getSetSwitch(user){
      Axios.get('https://www.service.muslimdailylife.online/notification/' + user)
      .then(response => {
        var data = response.data[0]
        this.setState({ Fajr: data.Fajr == 0 ? false : true })
        this.setState({ Dhuhr: data.Dhuhr == 0 ? false : true })
        this.setState({ Asr: data.Asr == 0 ? false : true })
        this.setState({ Maghrib: data.Maghrib == 0 ? false : true })
        this.setState({ Ishaa: data.Ishaa == 0 ? false : true })
      })
    }

    SetChangeSwitch(user){
      Axios.put('https://www.service.muslimdailylife.online/statusNotification', 
      { userId: user, Fajr: this.state.Fajr == true ? 1 : 0, Dhuhr: this.state.Dhuhr == true ? 1 : 0, Asr: this.state.Asr == true ? 1 : 0,
        Maghrib: this.state.Maghrib == true ? 1 : 0, Ishaa: this.state.Ishaa == true ? 1 : 0 }
      )
      .then(response => {
        this.checkUserSwitch()
      })
    }

    componentDidMount() {
      this.getPrayTime()
      this.checkUserSwitch()
    }

    render() {
          return (
            <Container>
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
                      praytime.prayType == "Fajr" ?
                      (
                        <ListItem key={praytime.prayerTimeId} thumbnail>
                          <Left>
                            <Icon name="md-alarm" style={{color:'black'}} size={30}/>
                          </Left>
                          <Body>
                            <Text style={{color:'black',fontSize:25}}>{praytime.prayTime}</Text>
                            <Text style={{fontSize:20}}>{praytime.prayType}</Text>
                          </Body>
                          <Right>
                            <Switch onValueChange = {()=>{ this.setState({ Fajr: !this.state.Fajr }); this.postUserSwitch() }} value={this.state.Fajr}/>
                          </Right>
                        </ListItem>
                      ) :
                      praytime.prayType == "Dhuhr" ?
                      (
                        <ListItem key={praytime.prayerTimeId} thumbnail>
                          <Left>
                            <Icon name="md-alarm" style={{color:'black'}} size={30}/>
                          </Left>
                          <Body>
                            <Text style={{color:'black',fontSize:25}}>{praytime.prayTime}</Text>
                            <Text style={{fontSize:20}}>{praytime.prayType}</Text>
                          </Body>
                          <Right>
                            <Switch onValueChange = {()=>{ this.setState({ Dhuhr: !this.state.Dhuhr }); this.postUserSwitch() }} value={this.state.Dhuhr}/>
                          </Right>
                        </ListItem>
                      ) :
                      praytime.prayType == "Asr" ?
                      (
                        <ListItem key={praytime.prayerTimeId} thumbnail>
                          <Left>
                            <Icon name="md-alarm" style={{color:'black'}} size={30}/>
                          </Left>
                          <Body>
                            <Text style={{color:'black',fontSize:25}}>{praytime.prayTime}</Text>
                            <Text style={{fontSize:20}}>{praytime.prayType}</Text>
                          </Body>
                          <Right>
                            <Switch onValueChange = {()=>{ this.setState({ Asr: !this.state.Asr }); this.postUserSwitch() }} value={this.state.Asr}/>
                          </Right>
                        </ListItem>
                      ) :
                      praytime.prayType == "Maghrib" ?
                      (
                        <ListItem key={praytime.prayerTimeId} thumbnail>
                          <Left>
                            <Icon name="md-alarm" style={{color:'black'}} size={30}/>
                          </Left>
                          <Body>
                            <Text style={{color:'black',fontSize:25}}>{praytime.prayTime}</Text>
                            <Text style={{fontSize:20}}>{praytime.prayType}</Text>
                          </Body>
                          <Right>
                            <Switch onValueChange = {()=>{ this.setState({ Maghrib: !this.state.Maghrib }); this.postUserSwitch() }} value={this.state.Maghrib}/>
                          </Right>
                        </ListItem>
                      ) :
                      praytime.prayType == "Ishaa" ?
                      (
                        <ListItem key={praytime.prayerTimeId} thumbnail>
                          <Left>
                            <Icon name="md-alarm" style={{color:'black'}} size={30}/>
                          </Left>
                          <Body>
                            <Text style={{color:'black',fontSize:25}}>{praytime.prayTime}</Text>
                            <Text style={{fontSize:20}}>{praytime.prayType}</Text>
                          </Body>
                          <Right>
                            <Switch onValueChange = {()=>{ this.setState({ Ishaa: !this.state.Ishaa }); this.postUserSwitch() }} value={this.state.Ishaa}/>
                          </Right>
                        </ListItem>
                      ) : null
                  )
                }
                </List> 
              </Content> 
            </View>
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
              <Button>
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