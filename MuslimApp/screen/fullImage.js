//This is an example code to set Backgroud image///
import React from 'react';
//import react in our code. 
import { View, ImageBackground, StyleSheet, Image } from 'react-native';
//import all the components we are going to use. 
 
export default class fullImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageName: props.navigation.getParam('imageName'),
        };
      }
    
  render() {
    return (
      <ImageBackground
        imageStyle={{resizeMode: 'contain'}}
        style={{ flex: 1,width:'100%',height:'100%',backgroundColor:'black' }}
        //We are using online image to set background
        source={{
          uri:this.state.imageName,
        }}
        //You can also set image from your project folder
        //require('./images/background_image.jpg')        //
        >
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor:'black'
  },
  TextStyle: {
    color: '#0250a3',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 10,
  },
});