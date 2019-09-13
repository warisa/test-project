import React, { Component } from 'react';
import { StyleSheet,Text } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

export default class addPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <Content>
          <Item regular style={styles.container}>
            <Input placeholder='ชื่อร้านอาหาร' />
          </Item>
        </Content>
    </Container>
    );
  }
}
const styles = StyleSheet.create({
  container:{
      marginLeft : 10,
      marginRight: 10,
      marginTop: 10
  }
});

