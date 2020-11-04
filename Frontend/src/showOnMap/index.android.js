import React, { Component } from 'react';
import {StyleSheet, 
        Text, 
        View, 
        Dimensions, 
        TouchableOpacity, 
        Alert,
        PermissionsAndroid, 
        ActivityIndicator
} from 'react-native';
import Header from '../header';

import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import {strings} from '../locales/i18n';
import {styles} from './styles';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 49.9935;
const LONGITUDE = 36.2304;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyBuSUD981rmpfEc1q_LhnkQ9Rx6gzb86mc';

export default class ShowOnMap extends Component<Props> {

    constructor(props) {
    super(props);
    this.state = {
      error: null,
      loadingLocation: null,
      region: {
          latitude:  parseFloat(this.props.navigation.state.params.latitude),
          longitude:  parseFloat(this.props.navigation.state.params.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
      },
      marker: {
        latitude:  parseFloat(this.props.navigation.state.params.latitude),
          longitude:  parseFloat(this.props.navigation.state.params.longitude),
      },
      userRegion: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01*(width / height),
      },
    };
      this.mapView = null;
    }

    componentDidMount() {
      
    }

    componentWillUnmount() {
      
    }
    renderLoadIndicator(){
       if(!this.state.loadingLocation)
        return (<Text style={{fontWeight: 'bold', color: 'black', fontFamily: 'Roboto-Regular', paddingLeft: 25, paddingRight: 25, textAlign: 'center', paddingTop: 8, paddingBottom: 8}}>
            {strings('route_buttons.find_me')}</Text>);
      return (<ActivityIndicator animating size="large" color="#5682a3"/>);
    }
    renderDirectionToStart(){
      if(!this.state.loadingLocation)
        if(this.state.userRegion.latitude && this.state.userRegion.longitude)
          return (
              <MapViewDirections
                origin={{ latitude: this.state.userRegion.latitude, longitude: this.state.userRegion.longitude}}
                destination={this.state.marker}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                language={"en"}
                mode={"walking"}
                strokeColor="#6699ff"
            
                onError={(errorMessage) => {
                  console.log(errorMessage);
                }}
              />
            );
    }

    getCurrentPosition(){
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
      .then(data => {
        Geolocation.getCurrentPosition(
          (position) => {
              console.log(position);
              if(position.coords.longitude!=null){
              let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01*(width / height),
              };
              this.setState({ userRegion: region });
              this.mapView.animateToRegion(region, 1000);
            }
          },
          (error) => {
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }).catch(err => {
        console.log(err);
      });   
    }


    render() {
        return (
        <View style ={styles.container}>
        <Header navigation={this.props.navigation} absolute/>
        
          <View style={styles.findMe}>
            <TouchableOpacity
            style={{backgroundColor: '#fff', borderRadius: 50, }}
            activeOpacity={0.7}
            onPress={()=> this.getCurrentPosition()}>
              {this.renderLoadIndicator()}
            </TouchableOpacity>
          </View>
        
        <MapView  
        style={styles.map}
        language={"en"}
        ref={map => this.mapView = map}
        region={this.state.region}
        showsUserLocation={true}>
                  <MapView.Marker 
                  coordinate={this.state.marker}
                  image={require('../assets/img/route/place.png')}
                  />
                  {this.renderDirectionToStart()}
        </MapView>

        </View>
        );
    }
}

