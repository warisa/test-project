import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';

export default class showAllRestaurant extends Component {

  render() {
    return (
        <View style={styles.container}>
            <Button style={{color: 'white'}} onPress={() => this.props.navigation.navigate('detail')}>
            <Text> Detail </Text>   
            </Button>
          </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'black'
    }
});