import React, { Component } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import MapView from 'react-native-maps';
import openMap from 'react-native-open-maps';
import getDirections from 'react-native-google-maps-directions'

class MapApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getGoogleMap = () => {
    const data = {
       destination: {
        latitude: this.props.jsonMapTest.latitude,
        longitude: this.props.jsonMapTest.longitude
       },
       params: [
         {
           key: "travelmode",
           value: "driving"
         },
         {
            key: "dir_action",
            value: "navigate"
          }
       ]
     }
  
     getDirections(data);
  }
  
  render() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{ // initial region set to Bileto
                    latitude: this.props.jsonMapTest.latitude, 
                    longitude: this.props.jsonMapTest.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                showsUserLocation={true}
            >
            <MapView.Marker
                onPress={() => { 
                    this.getGoogleMap();
                    // openMap({ latitude: this.props.jsonMapTest.latitude, longitude: this.props.jsonMapTest.longitude }); 
                }}
                coordinate={this.props.jsonMapTest}
                title={this.props.placeName}
             />
             </MapView>
        </View>
    );

  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",
    },
    map: {
        width: '100%',
        height: 200
    }
});

export default MapApp;
