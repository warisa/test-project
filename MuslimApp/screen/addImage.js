import React, { Component } from 'react';
import { View, Text,Image,StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle:'Take photo with your camera',
    chooseFromLibraryButtonTitle:'Choose photo from Library'
  };
export default class addImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        avatarSource:null,
        image:["https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg","https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"]
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
            image: [ ...this.state.image, 'data:image/jpeg;base64,' + response.data]
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
        <ScrollView horizontal={true} style={styles.container}
            showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {
            this.state.image.map((image, i) => {
              return <View key={i} style={{alignItems: 'center', marginTop:10, width:130,height:150}}>
                        <Image source={{uri: image}} style={{width: 120, height: 100, margin: 7}} />
                    </View>;
            })
          }
        </ScrollView>
        <Image source={this.state.avatarSource} style={{alignSelf:'center',width:'100%',height:500}} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
})