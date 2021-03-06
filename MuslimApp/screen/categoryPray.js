import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight,Image } from 'react-native';
import Axios from 'axios';
import Card from './Card';
import CardSection from './CardSection';
import { ScrollView } from 'react-native-gesture-handler';

export default class categoryPray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: [],
      category:[],
      restaurant:props.navigation.getParam('placePrayerRoom'),
      categoryName: props.navigation.getParam('categoryName')
    }
  }
  componentWillMount() {
    Axios.get('https://www.service.muslimdailylife.online/prayerplace')
    .then(response => this.setState({ place2: response.data }))
  }
  componentWillMount() {
    Axios.get('https://www.service.muslimdailylife.online/searchbycategory2/'+this.state.categoryName)
    .then(response => this.setState({ category:response.data }))
  }
  render() {
    return (
      <ScrollView>
                  { 
                    this.state.category.map( (prayer,i) =>{ 
                      return <Card key={i}> 
                              <View>
                                  <CardSection>
                                    <View>
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate('PRAYDETAIL',{placeId:prayer.placeId})}>                             
                                        <Image source={{uri: prayer.imageName}} style={{width:150,height: 100, margin: 7}}></Image>
                                      </TouchableHighlight>
                                    </View>
                                  <View style={styles.container}>
                                      <Text style={{color:'black'}}>{prayer.placeName}</Text>
                                      <Text style={styles.fontStyle2}>
                                        {prayer.placeOpeningTime == null ?
                                        (    
                                            <Text style={{color:'green'}}>เปิดให้บริการอยู่ในขณะนี้</Text>
                                        )
                                        :
                                        (
                                          <Text style={{color:'black'}}>Open: {prayer.placeOpeningTime}-{prayer.placeClosingTime}</Text>
                                       )}
                                     </Text>
                                      <Text style={{color:'black'}}>Telno: {prayer.placeTelno}</Text>
                                    </View>
                                  </CardSection>
                                </View>
                              </Card>;
                    })
                  }        
        </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container:{
      justifyContent: 'space-around',
      flexDirection:'column',
      marginLeft: 10,
      flex: 1,
      width: '100%'
  }
});
