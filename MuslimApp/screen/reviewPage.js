import React, { Component } from 'react';
import { View, Image, StyleSheet,Text,AsyncStorage} from 'react-native';
import Axios from 'axios';
import { Container, Content,Right,Body,Left,Card, CardItem, Thumbnail } from 'native-base';
import Material from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';

export default class reviewPage extends Component {
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
      review:[]
    };
  }

  async componentDidMount() {
    await this.checkUser();
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
    await Axios.get('https://www.service.muslimdailylife.online/profile/' + user)
    .then(response => this.setState({ user: response.data[0] }))
    await Axios.get('https://www.service.muslimdailylife.online/reviewHistory/'+ user)
    .then(response => this.setState({ review: response.data }))
    console.log(this.state.user)
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
                  <Text style={{color:'gray',fontSize:17}}>ประวัติการรีวิว </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
         {
           this.state.review.map(revieww=>
            <Card key={revieww.reviewId}>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{revieww.placeName}</Text>
                    <Text style={{color:'gray'}}>{Moment(revieww.reviewDate).format('DD MMM YYYY')} {revieww.reviewTime}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Image source={{uri:revieww.imageName}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
              <CardItem>
                <Material name='rate-review' style={{color:'black'}} size={20}/>
                <Text style={{marginLeft:10}}>{revieww.reviewContent}</Text>
              </CardItem>
            </Card>
            )
         }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 63,
      },
      fontStyle:{
        alignSelf:'center',
        justifyContent:'center',
        fontSize:20
      }
})
