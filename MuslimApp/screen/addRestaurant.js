import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, ListItem,
        Item, Input, Picker,Textarea, Form,Left,Body,Right, Radio, List, Button,CheckBox } from 'native-base';
import Axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import DatePicker from 'react-native-datepicker'

export default class addRestaurant extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          user: {
            userId:'',
            userFName: '',
            userLName: '',
            userEmail: '',
            userImage: ''
          },
          menu:[],
          placeName:'',
          placeOpeningTime:'',
          placeClosingTime:'',
          placeTelno:'',
          placeDescription:'',
          placePriceRange:'',
          placeCarParking:false,
          placePrayerRoom:false,
          placeAirconditioner:false,
          placeReserve:false,
          placeCreditcard:false,
          placeAddress:'',
          placeLinkPage:'',
          latitude:'',
          longtitude:'',
          placeTypeId:'1',
          Monday: false,
          Tuesday:false,
          Wednesday:false,
          Thursday:false,
          Friday:false,
          Saturday:false,
          Sunday:false,
          categoryId:''
        };
      }

      componentWillMount() {
        this.checkUser()
        this.getMenu()
      }

      async getMenu() {
        Axios.get('http://10.4.56.94/category1/1')
        .then(response => {
          response.data.map( value => {
            var dataValue =   {
              "categoryId": value.categoryId,
              "categoryName": value.categoryName,
              "categoryImage": value.categoryImage,
              "placeTypeId": value.placeTypeId,
              "placeType": value.placeType,
              "value": false
            }
            this.setState({ menu: [ ...this.state.menu, dataValue ] })
          })
        })
        console.log(this.state.menu)
      }

      async setItemMenu(index, valueCheck) {
        var menuChoose = []
        this.state.menu.map( (value, i) => {
          var dataValue;
          if(i == index) {
            dataValue = {
              "categoryId": value.categoryId,
              "categoryName": value.categoryName,
              "categoryImage": value.categoryImage,
              "placeTypeId": value.placeTypeId,
              "placeType": value.placeType,
              "value": valueCheck
            }
          }else {
            dataValue = {
              "categoryId": value.categoryId,
              "categoryName": value.categoryName,
              "categoryImage": value.categoryImage,
              "placeTypeId": value.placeTypeId,
              "placeType": value.placeType,
              "value": value.value
            }
          }
          menuChoose.push(dataValue)
        })
        this.setState({ menu: menuChoose })
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

      addPlace(){
        Axios.post('http://10.4.56.94/addPlace', { userId: this.state.userId, placeId: this.state.placeId, reviewContent: this.state.reviewTextContent })
        .then(response => {
          if(response.data){
            this.setState({ reviewTextContent: '' })
          }
        });
      }

      setTrueNumber(value){
        if(value == true){
          return 1
        }else {
          return 0
        }
      }
      
      async submit(){
        if(this.state.placeName != '' && this.state.placeOpeningTime != '' && this.state.placeClosingTime != '' && this.state.placeTelno != '' 
        && this.state.placeDescription != '' && this.state.placeAddress != ''  ){
          var category = []
          this.state.menu.map(value => {
            if(value.value == true){
              category.push(value.categoryId)
            }
          })
          var bodyData = {
            userId: this.state.user.userId,
            placeName: this.state.placeName,
            placeOpeningTime: this.state.placeOpeningTime + ':00',
            placeClosingTime: this.state.placeClosingTime + ':00',
            placeTelno: this.state.placeTelno,
            placeDescription: this.state.placeDescription,
            placePriceRange: this.state.placePriceRange,
            placeCarParking: this.setTrueNumber(this.state.placeCarParking),
            placePrayerRoom: this.setTrueNumber(this.state.placePrayerRoom),
            placeAirconditioner: this.setTrueNumber(this.state.placeAirconditioner),
            placeReserve: this.setTrueNumber(this.state.placeReserve),
            placeCreditcard: this.setTrueNumber(this.state.placeCreditcard),
            placeAddress: this.state.placeAddress,
            placeLinkPage: this.state.placeLinkPage,
            latitude:'13.51214',
            longtitude:'100.23645',
            placeTypeId: this.state.placeTypeId,
            Monday: this.setTrueNumber(this.state.Monday),
            Tuesday: this.setTrueNumber(this.state.Tuesday),
            Wednesday: this.setTrueNumber(this.state.Wednesday),
            Thursday: this.setTrueNumber(this.state.Thursday),
            Friday: this.setTrueNumber(this.state.Friday),
            Saturday: this.setTrueNumber(this.state.Saturday),
            Sunday: this.setTrueNumber(this.state.Sunday),
            categoryId: category
          }
          console.log((bodyData))
          await Axios.post('http://10.4.56.94/addPlace', bodyData)
          .then(response => {
            if(response.data){
              alert('Complete !!!');
            }else{
              alert('Error !!!');
            }
          });
        }else {
          alert('Please enter all information.');
        }
      }
      
  render() {
    return (
      <Container>
          <Content>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: this.state.user.userImage}} />
                  <Body>
                    <Text style={{fontSize:17}}>{this.state.user.userFName} {this.state.user.userLName}</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            {/* <Image style={styles.avatar} source={{ uri: this.state.user.userImage }}/> */}
            <Item regular style={styles.input}>
              <Entypo active name='home' size={20} style={styles.iconStyle}/>
              <Input onChangeText={(text) => this.setState({ placeName: text })} value={this.state.placeName} placeholder='ชื่อร้านอาหาร' />
            </Item>
            <Text style={styles.fontStyle}>ประเภทของอาหาร</Text>
            { 
            this.state.menu.map( (menu, i) => 
            <ListItem key={menu.categoryId} thumbnail>
              <Left>
              <CheckBox checked={menu.value} onPress={() => this.setItemMenu(i, !menu.value) }/>
              </Left>
              <Body>
                <Text >{menu.categoryName}</Text>
              </Body>
            </ListItem>
            )
            }
            <Text style={styles.fontStyle}>รายละเอียดของร้าน</Text>
            <Form style={styles.input}>
              <Textarea onChangeText={(text) => this.setState({ placeDescription: text })} value={this.state.placeDescription} rowSpan={5} bordered placeholder="รายละเอียดเพิ่มเติม" />
            </Form>
            <Text style={styles.fontStyle}>เวลาเปิดให้บริการ</Text>
            <Item regular style={styles.input} onPress={() => {}}>
            <CardItem >
              <Left>
                <MaterialCommunityIcons active name="timetable" size={20} style={styles.iconStyle}/>
              </Left>
              <Body>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.placeOpeningTime}
                  mode="time"
                  format="HH:mm"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  minuteInterval={10}
                  onDateChange={(time) => {this.setState({placeOpeningTime: time});}}
                />
              </Body>
              <Right>
              </Right>
             </CardItem>
             </Item>
             <Text style={styles.fontStyle}>เวลาปิดให้บริการ</Text>
            <Item regular style={styles.input}>
            <CardItem>
              <Left>
                <MaterialCommunityIcons active name="timetable" size={20} style={styles.iconStyle}/>
              </Left>
              <Body>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.placeClosingTime}
                  mode="time"
                  format="HH:mm"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  minuteInterval={10}
                  onDateChange={(time) => {this.setState({placeClosingTime: time});}}
                />
                </Body>
              <Right>
              </Right>
             </CardItem>
            </Item>
            <Text style={styles.fontStyle}>วันที่ปิดให้บริการ</Text>
              <ListItem thumbnail>
              <Left>
                <CheckBox checked={this.state.Monday} onPress={() => this.setState({ Monday: !this.state.Monday }) }/>
              </Left>
              <Body>
                <Text>Monday</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <CheckBox checked={this.state.Tuesday} onPress={() => this.setState({ Tuesday: !this.state.Tuesday }) }/>
              </Left>
              <Body>
                <Text>Tuesday</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <CheckBox checked={this.state.Wednesday} onPress={() => this.setState({ Wednesday: !this.state.Wednesday }) }/>
              </Left>
              <Body>
                <Text>Wednesday</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <CheckBox checked={this.state.Thursday} onPress={() => this.setState({ Thursday: !this.state.Thursday }) }/>
              </Left>
              <Body>
                <Text>Thursday</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <CheckBox checked={this.state.Friday} onPress={() => this.setState({ Friday: !this.state.Friday }) }/>
              </Left>
              <Body>
                <Text>Friday</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <CheckBox checked={this.state.Saturday} onPress={() => this.setState({ Saturday: !this.state.Saturday }) }/>
              </Left>
              <Body>
                <Text>Saturday</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <CheckBox checked={this.state.Sunday} onPress={() => this.setState({ Sunday: !this.state.Sunday }) }/>
              </Left>
              <Body>
                <Text>Sunday</Text>
              </Body>
            </ListItem>
            <Item regular style={styles.input}>
              <FontAwesome5 active name='coins'size={20} style={styles.iconStyle} />
              <Input onChangeText={(text) => this.setState({ placePriceRange: text })} value={this.state.placePriceRange} placeholder='ช่วงราคา' />
            </Item>
            <Form style={styles.input}>
              <Textarea onChangeText={(text) => this.setState({ placeAddress: text })} value={this.state.placeAddress} rowSpan={5} bordered placeholder="ที่อยู่ของสถานที่..." />
            </Form>
            <Item regular style={styles.input}>
              <Entypo active name='old-mobile' size={20} style={styles.iconStyle}/>
              <Input onChangeText={(text) => this.setState({ placeTelno: text })} value={this.state.placeTelno} placeholder='เบอร์โทรศัพท์' />
            </Item>
            <Item regular style={styles.input}>
              <MaterialIcons active name='find-in-page' size={20} style={styles.iconStyle}/>
              <Input onChangeText={(text) => this.setState({ placeLinkPage: text })} value={this.state.placeLinkPage} placeholder='เพจของร้าน' />
            </Item>
            <Text style={styles.fontStyle}>ที่จอดรถ</Text>
            <ListItem thumbnail>
              <Left>
                <Radio selected={this.state.placeCarParking == true} onPress={() => this.setState({ placeCarParking: true }) }/>
              </Left>
              <Body>
                <Text>มี</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={this.state.placeCarParking == false} onPress={() => this.setState({ placeCarParking: false }) } />
              </Left>
              <Body>
                <Text>ไม่มี</Text>
            </Body>
            </ListItem>
            <Text style={styles.fontStyle}>เครื่องปรับอากาศ</Text>
            <ListItem thumbnail>
              <Left>
                <Radio selected={this.state.placeAirconditioner == true} onPress={() => this.setState({ placeAirconditioner: true }) } />
              </Left>
              <Body>
                <Text>มี</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={this.state.placeAirconditioner == false} onPress={() => this.setState({ placeAirconditioner: false }) } />
              </Left>
              <Body>
                <Text>ไม่มี</Text>
            </Body>
            </ListItem>
            <Text style={styles.fontStyle}>จองล่วงหน้า</Text>
            <ListItem thumbnail>
              <Left>
                <Radio selected={this.state.placeReserve == true} onPress={() => this.setState({ placeReserve: true }) } />
              </Left>
              <Body>
                <Text>มี</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={this.state.placeReserve == false} onPress={() => this.setState({ placeReserve: false }) } />
              </Left>
              <Body>
                <Text>ไม่มี</Text>
            </Body>
            </ListItem>
            <Text style={styles.fontStyle}>ห้องละหมาด</Text>
            <ListItem thumbnail>
              <Left>
                <Radio selected={this.state.placePrayerRoom == true} onPress={() => this.setState({ placePrayerRoom: true }) } />
              </Left>
              <Body>
                <Text>มี</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={this.state.placePrayerRoom == false} onPress={() => this.setState({ placePrayerRoom: false }) } />
              </Left>
              <Body>
                <Text>ไม่มี</Text>
            </Body>
            </ListItem>
            <Text style={styles.fontStyle}>รับบัตรเครดิต</Text>
            <ListItem thumbnail>
              <Left>
                <Radio selected={this.state.placeCreditcard == true} onPress={() => this.setState({ placeCreditcard: true }) } />
              </Left>
              <Body>
                <Text>มี</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={this.state.placeCreditcard == false} onPress={() => this.setState({ placeCreditcard: false }) } />
              </Left>
              <Body>
                <Text>ไม่มี</Text>
            </Body>
            </ListItem>
            <Button style={{alignSelf:'center',marginTop:10,backgroundColor:'#FF8200'}} onPress={() => this.submit()}>
              <Text>Submit</Text>
            </Button>
        </Content>
      </Container>
    );
  }

}

const styles = {
  input: {
    margin: 10,
    marginLeft: 10,
  },
  fontStyle:{
    fontSize: 17,
    marginLeft: 10,

  },
  iconStyle:{
    marginLeft: 10,
  }
}
