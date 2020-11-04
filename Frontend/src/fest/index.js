import React, { Component } from 'react';
import {  Text, 
          View, 
          Dimensions, 
          AsyncStorage, 
          Image, 
          TouchableOpacity, 
          Alert, 
          PermissionsAndroid, 
          ActivityIndicator,
          Modal
        } 
from 'react-native';
import Header from '../header';

import Icon from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Guide from '../route/guide'; 

import {styles} from './styles';
import {guidebutton} from '../route/styles'; 
import {strings} from '../locales/i18n';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 49.9935;
const LONGITUDE = 36.2304;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyBuSUD981rmpfEc1q_LhnkQ9Rx6gzb86mc';

export default class Fest extends Component<Props> {

  constructor(props) {
  super(props);
  this.state = {
    error: null,
    region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    },
    userRegion: {
      latitude: null,
      longitude: null,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01*(width / height),
    },
    places: [],
    points: [],
    dataPlaces: [],
    dataVenues: [],
    loadingPlaces: false,
    loadingVenues: false,
    loadingLocation: false,
    geoLocationError: null,
    guideModal: false,
  };
      this.mapView = null;
  }

  componentWillMount(){
    this.getData();
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {},(error) => console.log(JSON.stringify(error)),);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getData(){
    this.getPlaces();
    this.getVenues();
  }

  getPlaces(){
    console.log('get Places');
    const url = 'https://klugdata.com/api/vertep/';
    this.setState({ loadingPlaces: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {     
        this.setState({
          dataPlaces: res,
          error: res.error || null,
          loadingPlaces: false,
        });
      })
      .catch(error => {
        this.setState({ error, loadingPlaces: false });
      });
  }

  guideCloseModal(message){
    this.setState({guideModal: false});
  }

  guideOpenModal(message){
    this.setState({guideModal: true});
  }

  getVenues(){
    console.log('get Venues');
    const url = 'https://klugdata.com/api/vertep/venues';
    this.setState({ loadingVenues: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {     
        this.setState({
          dataVenues: res,
          error: res.error || null,
          loadingVenues: false,
        });
      })
      .catch(error => {
        this.setState({ error, loadingVenues: false });
        console.log(error);
      });
  }

  renderLoadIndicator(){
    if(!this.state.loadingPlaces) 
    if(!this.state.loadingVenues) 
      if(!this.state.loadingLocation)
      return (<Text style={{fontWeight: 'bold', color: 'black', fontFamily: 'Roboto-Regular', paddingLeft: 25, paddingRight: 25, textAlign: 'center', paddingTop: 8, paddingBottom: 8}}>
          {strings('route_buttons.find_me')}</Text>);
    return (<ActivityIndicator animating size="large" color="#5682a3"/>);
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
        (error) => {console.log(error.code, error.message);},
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }).catch(err => {
      console.log(err);
    });
  }

  renderPoints(){
    if(!this.state.loadingPlaces)
      return (
        this.state.dataPlaces.map((place, index) => { 
            return (<MapView.Marker 
              key={`place_${index}`} 
              coordinate={place.coordinates}
              image={require('../assets/img/vertep/location.png')}
              title={place.title}
              onCalloutPress={()=>this.props.navigation.navigate('Place', {itemId: place.id})}
            />)       
        })
      );
  }

  renderVenues(){
    if(!this.state.loadingVenues)
      return (
        this.state.dataVenues.map((venue, index) => { 
            return (<MapView.Marker 
              key={`venue_${index}`} 
              coordinate={{ latitude: venue.latitude, longitude: venue.longitude}}
              image={require('../assets/img/vertep/venue.png')}
              title={venue.name}
              onCalloutPress={()=>this.props.navigation.navigate('Venue', {
                  itemId: venue.id, 
                  description: venue.description, 
                  trait: venue.trait, 
                  shedule: venue.shedule,
              })}
            />)       
        })
      );
  }

  renderToilets(){

  }

  renderDirection(){
      return (
          <MapViewDirections
            origin={this.state.points[0]}
            waypoints={(this.state.points.length > 2) ? this.state.points.slice(1, -1): null}
            destination={this.state.points[this.state.points.length-1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            language={"ua"}
            mode={"walking"}
            strokeColor="#5682a3"
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`); 
            }}
            onError={(errorMessage) => {
              console.log(errorMessage);
            }}
          />
        )
  }

  getTimeSet(){
    
  }

  render() {
    return (
    <View style ={styles.container}>
          <Modal visible={this.state.guideModal} animationType="slide" onRequestClose={()=>this.setState({guideModal: false})} transparent>
            <Guide closeModal={this.guideCloseModal.bind(this)} />       
          </Modal>

          <View style={[guidebutton.container, {position:'absolute'}]}>
            <TouchableOpacity activeOpacity={1} onPress={()=> this.guideOpenModal()} style={guidebutton.touchzone}>                    
                <View style={guidebutton.button}>
                    <Icon
                    name="help"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{ backgroundColor: 'transparent' }}
                    />
                </View>
            </TouchableOpacity>
          </View>

      <Image source={require('../assets/img/route/place.png')} style={{ display: 'none' }} />
      <View style={styles.findMe}>
        <TouchableOpacity
        style={styles.findMeButton}
        activeOpacity={0.7}
        onPress={()=> this.getCurrentPosition()}>
        {this.renderLoadIndicator()}
        </TouchableOpacity>
      </View> 
      <Header navigation={this.props.navigation} absolute/>
      <MapView 
        style={styles.map}
        language={strings('system_translations.current_language')}
        provider={"google"}
        ref={map => this.mapView = map}
        initialRegion={this.state.region}
        showsUserLocation={true}
        loadingEnabled={true}
        customMapStyle={[{
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }]}
      >
        {this.renderVenues()}
        {this.renderPoints()}
      </MapView>
    </View>
    );
  }
}