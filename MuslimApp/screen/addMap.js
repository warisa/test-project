import React, { Component } from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import MapView from 'react-native-maps'
import { Text,Button } from 'native-base';

export default class addMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 13.650493,
        longitude: 100.495487,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }
  }

  onRegionChange = region => {
    this.setState({
      region
    })
  }

  goBack() {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.setLocation(this.state.region);
  }

  render() {
    const { region } = this.state
    return (
      <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={this.onRegionChange}
                showUserLocation
                followUserLocation
                loadingEnabled
            >
            </MapView>
            <View style={styles.markerFixed}>
              {/* <Image style={styles.marker} source={{uri: 'https://www.freepnglogos.com/uploads/pin-png/flat-design-map-pin-transparent-png-stickpng-31.png'}} /> */}
              <Image source={require('../image/marker.png')} style={styles.marker} />
            </View>
            <SafeAreaView style={styles.footer}>
              <Text style={styles.region}>latitude: {this.state.region.latitude}</Text>
              <Text style={styles.region}>longitude: {this.state.region.longitude}</Text>
              <Button onPress={ () => { this.goBack() } }><Text>SUBMIT</Text></Button>
            </SafeAreaView>
            {/* <Text>{this.state.region.latitude}</Text>
            <Text>{this.state.region.longitude}</Text>
            <Text>{this.state.region.latitudeDelta}</Text>
            <Text>{this.state.region.longitudeDelta}</Text> */}
        </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#F5FCFF"
  },
  map: {
      flex: 1,
      width: '100%'
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  }
});