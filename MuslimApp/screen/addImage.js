import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button } from 'native-base';

const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle:'Take photo with your camera',
    chooseFromLibraryButtonTitle:'Choose photo from Library'
  };
export default class addImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        avatarSource:null
    };
  }
  myfun=()=>{
    //   alert('clicked');
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
      
        } else {
          const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            avatarSource: source,
          });
        }
      });
  }

  render() {
    return (
      <View>
        <Text> addImage </Text>
        <Button style={{backgroundColor:'green',margin:10,padding:10}}
        onPress={this.myfun}>
            <Text style={{color:'#fff'}}>Select Image</Text>
        </Button>
        <Image source={this.state.avatarSource} style={{alignSelf:'center',width:'100%',height:500}} />
      </View>
    );
  }
}
