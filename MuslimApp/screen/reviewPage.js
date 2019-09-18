import React, { Component } from 'react';
import { View, Image, StyleSheet,Text} from 'react-native';
import Axios from 'axios';
import { Container, Content,Footer, FooterTab,Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class reviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        place: [],
        placeId: props.navigation.getParam('placeId')
    };
  }

  componentWillMount() {
    Axios.get('http://10.4.56.94/restaurant/'+ this.state.placeId)
    .then(response => {
      this.setState({ place: response.data[0]})
    })
}

  render() {
    return (
      <Container>
        <Content>
            <Image source={{uri:this.state.place.imageName}}
                style={{width: '100%', height: 200}}/>
            <Text style={styles.avatar}>REVIEW</Text>
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
              <Button onPress={() => this.props.navigation.navigate('PRAYTIME')}>
                <Icon name="ios-alarm" style={{color:'white'}} size={25}/>
                <Text style={{color:'white',fontSize:10}} >Pray Time</Text>
              </Button>
              <Button>
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
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
      },
})
