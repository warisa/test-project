import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage,Linking,TouchableHighlight  } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import { ScrollView } from 'react-native-gesture-handler';
import {Left,Right,Body, Container,Input , List, ListItem,Button} from 'native-base';
import MapApp from '../component/MapApp';
import Axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

export default class restaurantDetail extends Component {


  constructor(props){
    super(props)
      this.state = { //ประกาศตัวแปรใน this.state นอกstate = ค่าคงที่
        place: [],
        image:[],
        ImageUrl: [],
        ImageIndex: 0,
        isImageViewVisible: false,
        latitude: 0.0, 
        longitude: 0.0,
        review:[],
        placeId: props.navigation.getParam('placeId'),
        userId: '',
        userImage: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
        reviewTextContent: '',
        datetime:''
      }
    }

    async checkImage() {
      let user = '';
      let image = '';
      try {
        user = await AsyncStorage.getItem('user') || null;
        image = await AsyncStorage.getItem('image') || null;
      } catch (error) {
      }
      this.setState({ userId: user, userImage: image })
    }

    async getrestaurant() {
      await Axios.get('https://www.service.muslimdailylife.online/restaurant/'+ this.state.placeId)
      .then(response => {
        this.setState({ place: response.data[0], image: response.data,
          latitude: this.state.latitude + response.data[0].latitude, longitude: this.state.longitude + response.data[0].longitude
        });
      });
    }
    

    async componentDidMount() {
      await this.checkImage();
      await this.getrestaurant();
      await this.getReview();
      await this.setImage();
      await this.getDateTime();
  }

  getReview(){
    Axios.get('https://www.service.muslimdailylife.online/review/'+ this.state.placeId)
      .then(response => {
        this.setState({ review: response.data});
      });
  }

  getDateTime(){
    Axios.get('https://www.service.muslimdailylife.online/datetime/'+ this.state.placeId)
      .then(response => {
        this.setState({ datetime: response.data});
      });
  }

  setImage(){
    console.log(this.state.image)
    this.state.image.map( images => {
      this.setState({ ImageUrl: [ ...this.state.ImageUrl, { source: {  uri: images.imageName } }] })
    });
  }
  
  addReview(){
    Axios.post('https://www.service.muslimdailylife.online/addreview', { userId: this.state.userId, placeId: this.state.placeId, reviewContent: this.state.reviewTextContent })
    .then(response => {
      if(response.data){
        this.getReview();
        this.setState({ reviewTextContent: '' })
      }
    });
  }

  render() {
    // const { navigation } = this.props;
    // const placeId = navigation.getParam('placeId');
    // const Name = navigation.getParam('placeName');
    return (
      <Container>
        <ScrollView>
        <Card>
          <Image source={{uri:this.state.place.imageName}}
                  style={{width: '100%', height: 200}}/>
          <CardSection>
            <View >
              <View style={{borderRadius:30,backgroundColor:'#FFDAB9'}}>
                <Text style={{color:'black',fontSize:20,fontWeight:'bold'}}> Title: {this.state.place.placeName}</Text>
              </View>
              </View>
            </CardSection>
            <CardSection>
                <View>
                    <Text style={{color:'black',marginBottom:10}}>{this.state.place.placeDescription}</Text>
                    <ScrollView horizontal={true} style={{flexDirection:'row'}} 
                    showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                         {
                            this.state.image.map( (images, i) => (
                            <TouchableOpacity key={images.imageId} 
                            // style={{alignItems: 'center', marginTop:10, width:130,height:150}}
                                onPress={() => this.props.navigation.navigate('FULLIMAGE',{imageName:images.imageName})}>
                                  <Image 
                                    source={{uri: images.imageName}} 
                                    style={{width: 120, height: 100,margin:7}} />
                            </TouchableOpacity>
                            ))
                          }      
                  </ScrollView>
                </View>  
            </CardSection>
            <CardSection>
              <View>
              <Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>รายละเอียดร้าน:</Text>
              {/* <Text style={styles.fontStyle}>เปิดให้บริการ: </Text> */}
              <Text style={styles.fontStyle}>เวลาให้บริการ: </Text>
              <Text style={styles.fontStyle}>ช่วงราคา: </Text>
              <Text style={styles.fontStyle}>เบอร์โทรศัพท์: </Text>
              <Text style={styles.fontStyle}>ที่อยู่ของร้าน: </Text>
              <Text style={styles.fontStyle}>เพจของร้าน: </Text>
              </View>
              <View style={{marginTop:35,flex:1,width:'100%'}}>
                  {/* <Text style={styles.fontStyle2}>เปิดให้บริการอยู่ในขณะนี้</Text> */}
                  <Text style={styles.fontStyle2}>
                    {this.state.datetime == 1 ?
                    (    
                        <Text style={styles.fontStyle3}>เปิดให้บริการอยู่ในขณะนี้</Text>
                    )
                    :
                    (
                        <Text style={styles.fontStyle4}>ปิดให้บริการอยู่ในขณะนี้</Text>
                    )}
                  </Text>
                  <Text style={styles.fontStyle2}>{this.state.place.placePriceRange}</Text>
                  <Text style={styles.fontStyle2}>{this.state.place.placeTelno}</Text>
                  <Text style={styles.fontStyle2}>{this.state.place.placeAddress}</Text>
                  {this.state.place.placeLinkPage == '' || this.state.place.placeLinkPage == null ?
                  ( 
                    <Text style={styles.fontStyle2}>ไม่มี</Text>
                  )
                  :
                  (
                    <TouchableHighlight  onPress={ ()=>{ Linking.openURL(this.state.place.placeLinkPage)}}>
                      <Text style={styles.fontStyle5}>{this.state.place.placeLinkPage}</Text>
                    </TouchableHighlight>
                  )
                  }
              </View>
            {/* <Image style={styles.imageStyle} source={{ uri: image }}/> */}
            </CardSection>
            <MapApp 
              placeName={this.state.place.placeName}
              jsonMapTest={{latitude: this.state.latitude, longitude: this.state.longitude}}
            />
            <Text style={{color:'black',fontSize:17,fontWeight:'bold',marginTop:5}}>รายละเอียดร้านเพิ่มเติม</Text>
              <CardSection>
                <View >
                {
                  this.state.place.placeCarParking == 1 ?
                  (
                    <CardSection>
                      <AntDesign name="checkcircleo" style={{color:'green'}} size={20}/>
                      <Text style={styles.fontStyle3}>ที่จอดรถ </Text>
                    </CardSection>
                  )
                  :
                  (
                    <CardSection>
                      <Feather name="x-circle" style={{color:'red'}} size={20}/>
                      <Text style={styles.fontStyle4}>ที่จอดรถ </Text>
                    </CardSection>
                  )
                }

                {
                  this.state.place.placePrayerRoom == 1 ?
                  (
                    <CardSection>
                      <AntDesign name="checkcircleo" style={{color:'green'}} size={19}/>
                      <Text style={styles.fontStyle3}>ห้องละหมาด</Text>
                    </CardSection>
                  )
                  :
                  (
                    <CardSection>
                      <Feather name="x-circle" style={{color:'red'}} size={20}/>
                      <Text style={styles.fontStyle4}>ห้องละหมาด</Text>
                    </CardSection>
                  )
                }
                </View>
                <View >
                 {
                  this.state.place.placeAirconditioner == 1 ?
                  (
                    <CardSection>
                      <AntDesign name="checkcircleo" style={{color:'green'}} size={19}/>
                      <Text style={styles.fontStyle3}>เครื่องปรับอากาศ </Text>
                    </CardSection>
                  )
                  :
                  (
                    <CardSection>
                      <Feather name="x-circle" style={{color:'red'}} size={20}/>
                      <Text style={styles.fontStyle4}>เครื่องปรับอากาศ </Text>
                    </CardSection>
                  )
                }
                {
                  this.state.place.placeCreditCard == 1 ?
                  (
                    <CardSection>
                      <AntDesign name="checkcircleo" style={{color:'green'}} size={19}/>
                      <Text style={styles.fontStyle3}> - รับบัตรเครดิต </Text>
                    </CardSection>
                  )
                  :
                  (
                    <CardSection>
                      <Feather name="x-circle" style={{color:'red'}} size={20}/>
                      <Text style={styles.fontStyle4}>รับบัตรเครดิต </Text>
                    </CardSection>
                  )
                }
                </View>
                <View>
                {
                  this.state.place.placeReserve == 1 ?
                  (
                    <CardSection>
                      <AntDesign name="checkcircleo" style={{color:'green'}} size={19}/>
                      <Text style={styles.fontStyle3}>จองล่วงหน้า </Text>
                    </CardSection>
                  )
                  :
                  (
                    <CardSection>
                      <Feather name="x-circle" style={{color:'red'}} size={20}/>
                      <Text style={styles.fontStyle4}>จองล่วงหน้า </Text>
                    </CardSection>
                  )
                }
                </View>
              </CardSection>
              <Text style={{color:'black',fontSize:17,fontWeight:'bold'}}>รีวิวร้านอาหาร</Text>
              <List>
              <ListItem thumbnail>
                <Left>
                <Image style={styles.avatar} source={{ uri: this.state.userImage }}/>
                </Left>
                <Body>
                  <Input onChangeText={(text) => this.setState({ reviewTextContent: text })} value={this.state.reviewTextContent} placeholder="แสดงความคิดเห็น..." />
                </Body>
                <Right>
                  <FontAwesome name="send-o" style={{color:'gray',marginRight:10}} size={25} onPress={() => { this.addReview() }}/>
                </Right>
              </ListItem>
              { 
                this.state.review.map( review => 
                  <ListItem key={review.reviewId} thumbnail>
                  <Left>
                    <Image style={styles.avatar} source={{uri:review.userImage}}/>
                  </Left>
                  <Body>
                    <Text>{review.userFName} {review.userLName}</Text>
                    <Text>{review.reviewContent}</Text>
                  </Body>
                  <Right>
                  <Text style={{fontSize:10,color:'gray'}}>{Moment(review.reviewDate).format('DD MMM YYYY')}</Text>
                  <Text style={{fontSize:10,color:'gray'}}>{review.reviewTime}</Text>
                  </Right>
                  </ListItem>
                )
              }
              </List>
                      
            </Card>
        </ScrollView>
        </Container>
    );
  }
}
const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 10
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 63,
  },
  thumbnailStyle: {
    height: 90,
    width: 90
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  fontStyle: {
    color:'black',
    fontSize:15,
    fontWeight:'bold',
    marginTop: 10,
  },
  fontStyle2:{
    marginTop: 10,
    color: 'black',
    fontSize: 12
  },
  fontStyle3:{
    marginTop: 10,
    color: 'green',
    fontSize: 12
  },
  fontStyle4:{
    marginTop: 10,
    color: 'red',
    fontSize: 12
  },
  fontStyle5:{
    marginTop: 10,
    color: 'blue',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  image:{
    width:100,
    height:100,
    marginRight: 10,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin:20,
    width:100,
    borderRadius:30,
  },
  reviewButton: {
    backgroundColor: '#FF8200',
  }
};