import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Icon , Picker } from 'native-base';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class addPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: "key1"
        };
      }
      onValueChange(value: string) {
        this.setState({
          selected: value
        });
      }
  render() {
    return (
      <Container>
          <Content>
          <Item regular style={{margin:10}}>
            <Icon active name='home' />
            <Input placeholder='ชื่อสถานที่' />
          </Item>
          <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>
        </Content>
      </Container>
    );
  }
}
