import React, { Component } from 'react';
import { View, Image, StyleSheet,Text,AsyncStorage} from 'react-native';
import Axios from 'axios';
import { Container, Content,Right,Body,Left,Card, CardItem, Thumbnail } from 'native-base';
import Material from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

export default class addPlaceHistory extends Component {
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
      addPlaceHistory:[]
    };
  }

  componentWillMount() {
    this.checkUser();
    Axios.get('http://10.4.56.94/addPlaceHistory/'+ this.state.user.userId)
    .then(response => {
      this.setState({ addPlaceHistory: response.data});
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
          <ScrollView>
                  { 
                    this.state.addPlaceHistory.map((place, i) => {
                      return <Card key={i}> 
                              <View>
                                  <CardSection>
                                    <View>
                                      <TouchableHighlight onPress={() => this.props.navigation.navigate('RESTAURANTDETAIL',{placeId:restaurant.placeId})}>                             
                                        <Image source={{uri: place.imageName}} style={{width:150,height: 100, margin: 7}}></Image>
                                      </TouchableHighlight>
                                    </View>
                                  <View style={styles.container}>
                                      <Text style={{color:'black'}}>{place.placeName}</Text>
                                    </View>
                                  </CardSection>
                                </View>
                              </Card>;
                    })
                  }        
        </ScrollView>
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
