import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ImageView from 'react-native-image-view';

export default class image1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const images = [
      {
          source: {
              uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
          },
          title: 'Paris',
          width: 806,
          height: 720,
      },
  ];
    return (
      <View>
        <Text> test </Text>
        <ImageView
            images={images}
            imageIndex={0}
            isVisible={this.state.isImageViewVisible}
            renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
        />
      </View>
    );
  }
}
