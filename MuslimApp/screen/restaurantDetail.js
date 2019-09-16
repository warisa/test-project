import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import { ScrollView } from 'react-native-gesture-handler';
import {Button, Icon,Header,Left,Right,Body, Container,Title} from 'native-base';
import MapApp from '../component/MapApp';
import Axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialIcons';
import ImageView from 'react-native-image-view';



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
        placeId: props.navigation.getParam('placeId')
      }
    }

  componentWillMount() {
    Axios.get('http://10.4.56.94/restaurant/'+ this.state.placeId)
    .then(response => {
      this.setState({ place: response.data[0], image: response.data,
                      latitude: this.state.latitude + response.data[0].latitude, longitude: this.state.longitude + response.data[0].longitude
      });
      this.setImage();
    })
  }

  setImage(){
    this.state.image.map( images => {
      this.setState({ ImageUrl: [ ...this.state.ImageUrl, { source: {  uri: images.imageName } }] })
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
                    <ScrollView horizontal={true} style={{flexDirection:'row'}} 
                    showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                         {
                            this.state.image.map( (images, i) => (
                            <TouchableOpacity key={images.imageId} 
                            // style={{alignItems: 'center', marginTop:10, width:130,height:150}}
                                onPress={() => {
                                  this.setState({
                                    ImageIndex: i,
                                    isImageViewVisible: true
                                  });
                                }} 
                            >
                                  <Image 
                                    source={{uri: images.imageName}} 
                                    style={{width: 120, height: 100,margin:7}} />
                            </TouchableOpacity>
                            ))
                          }      
                          <ImageView
                            //images={[{ source: {  uri: this.state.ImageUrl } }]}
                            images={this.state.ImageUrl}
                            imageIndex={this.state.ImageIndex}
                            imageWidth={400}
                            imageHeight={800}
                            isVisible={this.state.isImageViewVisible}
                          />
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
                  <Text style={styles.fontStyle2}>{this.state.place.placeOpeningTime}-{this.state.place.placeClosingTime}</Text>
                  <Text style={styles.fontStyle2}>{this.state.place.placePriceRange}</Text>
                  <Text style={styles.fontStyle2}>{this.state.place.placeTelno}</Text>
                  <Text style={styles.fontStyle2}>{this.state.place.placeAddress}</Text>
                  <Text style={styles.fontStyle2}>{this.state.place.placeLinkPage}</Text>
              </View>
            {/* <Image style={styles.imageStyle} source={{ uri: image }}/> */}
            </CardSection>
            <MapApp 
              placeName={this.state.place.placeName}
              jsonMapTest={{latitude: this.state.latitude, longitude: this.state.longitude}}
            />
            <Text style={{color:'black',fontSize:17,fontWeight:'bold',marginTop:5}}>รายละเอียดร้านเพิ่มเติม</Text>
            <Card>
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
            </Card>
            <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
            {/* <Button style={[styles.buttonContainer, styles.reviewButton]}  onPress={() => this.props.navigation.navigate('review')}>
                <Text>Review</Text>
            </Button> */}
                <Button style={[styles.buttonContainer, styles.reviewButton]} onPress={() => this.props.navigation.navigate('review')}>
                  <Material name='rate-review' style={{color:'white'}} size={20}/>
                  <Text style={{color:'white',marginLeft:10}}>Review</Text>
                </Button>
            </View>
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
    backgroundColor: '#CC6600',
  }
};