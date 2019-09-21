import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, ListItem,
        Item, Input, Picker,Textarea, Form,Left,Body,Right, Radio, List, Button } from 'native-base';
import Axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class addPlace extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
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
                  </Body>
                </Left>
              </CardItem>
            </Card>
            {/* <Image style={styles.avatar} source={{ uri: this.state.user.userImage }}/> */}
            <Item regular style={styles.input}>
              <Entypo active name='home' size={20} style={styles.iconStyle}/>
              <Input placeholder='ชื่อร้านอาหาร' />
            </Item>
            <Text style={styles.fontStyle}>ประเภทของอาหาร</Text>
              <ListItem thumbnail>
              <Left>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text >Pizza</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>Steak</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>Shabu</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>Grill Buffet</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>Dessert</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={false} />
              </Left>
              <Body>
                <Text>Fast Food</Text>
              </Body>
            </ListItem>
            <Text style={styles.fontStyle}>รายละเอียดของร้าน</Text>
            <Form style={styles.input}>
              <Textarea rowSpan={5} bordered placeholder="ที่อยู่ของสถานที่..." />
            </Form>
            <Item regular style={styles.input}>
              <MaterialCommunityIcons active name='timetable' size={20} style={styles.iconStyle}/>
              <Input placeholder='เวลาเปิดให้บริการ' />
            </Item>
            <Item regular style={styles.input}>
              <FontAwesome5 active name='coins'size={20} style={styles.iconStyle} />
              <Input placeholder='ช่วงราคา' />
            </Item>
            <Item regular style={styles.input}>
              <Entypo active name='old-mobile' size={20} style={styles.iconStyle}/>
              <Input placeholder='เบอร์โทรศัพท์' />
            </Item>
            <Item regular style={styles.input}>
              <MaterialIcons active name='find-in-page' size={20} style={styles.iconStyle}/>
              <Input placeholder='เพจของร้าน' />
            </Item>
            <Text style={styles.fontStyle}>ที่จอดรถ</Text>
            <ListItem thumbnail>
              <Left>
                <Radio selected={true} />
              </Left>
              <Body>
                <Text>มี</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={true} />
              </Left>
              <Body>
                <Text>ไม่มี</Text>
            </Body>
            </ListItem>
            <Text style={styles.fontStyle}>เครื่องปรับอากาศ</Text>
            <ListItem thumbnail>
              <Left>
                <Radio selected={true} />
              </Left>
              <Body>
                <Text>มี</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={true} />
              </Left>
              <Body>
                <Text>ไม่มี</Text>
            </Body>
            </ListItem>
            <Text style={styles.fontStyle}>จองล่วงหน้า</Text>
            <ListItem thumbnail>
              <Left>
                <Radio selected={true} />
              </Left>
              <Body>
                <Text>มี</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={true} />
              </Left>
              <Body>
                <Text>ไม่มี</Text>
            </Body>
            </ListItem>
            <Text style={styles.fontStyle}>ห้องละหมาด</Text>
            <ListItem thumbnail>
              <Left>
                <Radio selected={true} />
              </Left>
              <Body>
                <Text>มี</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={true} />
              </Left>
              <Body>
                <Text>ไม่มี</Text>
            </Body>
            </ListItem>
            <Text style={styles.fontStyle}>รับบัตรเครดิต</Text>
            <ListItem thumbnail>
              <Left>
                <Radio selected={true} />
              </Left>
              <Body>
                <Text>มี</Text>
              </Body>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Radio selected={true} />
              </Left>
              <Body>
                <Text>ไม่มี</Text>
            </Body>
            </ListItem>
            <Button style={{alignSelf:'center',marginTop:10}}>
              <Text>Submit</Text>
            </Button>
        </Content>
      </Container>
    );
  }

}

const styles = {
  input: {
    margin: 10,
    marginLeft: 10,
  },
  fontStyle:{
    fontSize: 17,
    marginLeft: 10,

  },
  iconStyle:{
    marginLeft: 10,
  }
}
