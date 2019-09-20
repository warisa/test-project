import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';
import { Container, Content, Image, Item, Input, Icon , Picker,Textarea, Form } from 'native-base';
import Axios from 'axios';


export default class addPlace extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          selected: "key1",
          user: {
            userId:'',
            userFName: '',
            userLName: '',
            userEmail: '',
            userImage: ''
          }
        };
      }

      componentWillMount() {
        this.checkUser()
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

      onValueChange(value: string) {
        this.setState({
          selected: value
        });
      }
      
  render() {
    return (
      <Container>
          <Content>
            {/* <Image style={styles.avatar} source={{ uri: this.state.user.userImage }}/> */}
            <Item regular style={styles.input}>
              <Icon active name='home' />
              <Input placeholder='ชื่อสถานที่' />
            </Item>
            <Item regular style={styles.input}>
            <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              //onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>
            </Item>
            <Form style={styles.input}>
              <Textarea rowSpan={5} bordered placeholder="ที่อยู่ของสถานที่..." />
            </Form>
        </Content>
      </Container>
    );
  }

}

const styles = {
  input: {
    margin: 10,
    marginLeft: 10,
  }
}
