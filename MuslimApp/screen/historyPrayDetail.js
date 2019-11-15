import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import { ScrollView } from 'react-native-gesture-handler';
import {Container} from 'native-base';
import Axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';


export default class historyPrayDetail extends Component {
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
            userImage: '',
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
          await Axios.get('https://www.service.muslimdailylife.online/AddPlaceHistoryDetail/'+ this.state.placeId)
          .then(response => {
            this.setState({ place: response.data[0], image: response.data,
              latitude: this.state.latitude + response.data[0].latitude, longitude: this.state.longitude + response.data[0].longitude
            });
          });
        }
        
    
        async componentWillMount() {
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
        const{isImageViewVisible} = this.state;
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
                    </View>  
                </CardSection>
                <CardSection>
                  <View>
                  <Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>รายละเอียดสถานที่:</Text>
                  {/* <Text style={styles.fontStyle}>เปิดให้บริการ: </Text> */}
                  <Text style={styles.fontStyle}>เวลาให้บริการ: </Text>
                  <Text style={styles.fontStyle}>เบอร์โทรศัพท์: </Text>
                  <Text style={styles.fontStyle}>ที่อยู่ของร้าน: </Text>
                  </View>
                  <View style={{marginTop:35,flex:1,width:'100%'}}>
                      {/* <Text style={styles.fontStyle2}>เปิดให้บริการอยู่ในขณะนี้</Text> */}
                      <Text style={styles.fontStyle3}>เปิดให้บริการอยู่ในขณะนี้</Text>
                      <Text style={styles.fontStyle2}>{this.state.place.placeTelno}</Text>
                      <Text style={styles.fontStyle2}>{this.state.place.placeAddress}</Text>
                  </View>
                {/* <Image style={styles.imageStyle} source={{ uri: image }}/> */}
                </CardSection>
                {/* <MapApp 
                  placeName={this.state.place.placeName}
                  jsonMapTest={{latitude: this.state.latitude, longitude: this.state.longitude}}
                /> */}
                <Text style={{color:'black',fontSize:17,fontWeight:'bold',marginTop:5}}>รายละเอียดเพิ่มเติม</Text>
                  <CardSection>
                  <View>
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

                </View>
                <View>
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
                </View>
                <View >
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
                  </CardSection>                 
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
