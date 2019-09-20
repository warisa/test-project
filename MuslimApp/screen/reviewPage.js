import React, { Component } from 'react';
import { View, Image, StyleSheet,Text,AsyncStorage} from 'react-native';
import Axios from 'axios';
import { Container, Content,Right,Body,Left,List,ListItem,Card, CardItem } from 'native-base';
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

  componentWillMount() {
    this.checkUser();
    Axios.get('http://10.4.56.94/reviewHistory/1'+ this.state.user.userId)
    .then(response => {
      this.setState({ review: response.data});
  })
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

  render() {
    return (
      <Container>
        <Content>
        
            <ListItem thumbnail>
                <Left>
                <Image style={styles.avatar} source={{ uri: this.state.user.userImage }}/>
                </Left>
                <Body>
                  <Text style={{fontSize:17}}>{this.state.user.userFName} {this.state.user.userLName}</Text>
                </Body>
            </ListItem>
       
        { 
                this.state.review.map( review => 
                <Card>
                  <CardItem key={review.reviewId}>
                     <Left>
                      <Body>
                        <Text>{review.placeName}</Text>
                        <Text style={{color:'gray'}}>{Moment(review.reviewDate).format('DD MMM YYYY')} {review.reviewTime}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Image source={{uri:review.imageName}} style={{height: 200, width: null, flex: 1}}/>
                  </CardItem>
                  <CardItem>
                    <Material name='rate-review' style={{color:'black'}} size={20}/>
                    <Text style={{marginLeft:10}}>{review.reviewContent}</Text>
                  </CardItem>
            
                  </Card>
                )
              }
            {/* <CardItem>
            <Left>
                <Body>
                  <Text>{this.state.review.placeName}</Text>
                  <Text note>{Moment(this.state.review.reviewDate).format('d MMM YYYY')} {this.state.review.reviewTime}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://www.bltbangkok.com/public/core/uploaded/images/EatingOut/ThaiFoods/10%e0%b8%a3%e0%b9%89%e0%b8%b2%e0%b8%99%e0%b8%ad%e0%b8%b2%e0%b8%ab%e0%b8%b2%e0%b8%a3%e0%b9%84%e0%b8%97%e0%b8%a2%e0%b8%9e%e0%b8%b2%e0%b9%81%e0%b8%a1%e0%b9%88%e0%b8%97%e0%b8%b2%e0%b8%99_%e0%b8%ad%e0%b8%a3%e0%b8%a3%e0%b8%96%e0%b8%a3%e0%b8%aa.jpg'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem> */}
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
