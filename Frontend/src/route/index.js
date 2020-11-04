import React, { Component } from 'react';
import {  Text, 
          View, 
          Dimensions, 
          AsyncStorage, 
          Image, 
          TouchableOpacity, 
          Alert, 
          PermissionsAndroid, 
          Modal,
          ActivityIndicator} 
from 'react-native';
import Header from '../header';

import Icon from 'react-native-vector-icons/Ionicons';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import Guide from '../route/guide'; 
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './slider/SliderEntry';
import { sliderWidth, itemWidth } from './slider/SliderEntry.style';
import sliderStyles from './slider/index.style';

import {styles, guidebutton} from './styles'; 
import {strings} from '../locales/i18n';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 49.9935;
const LONGITUDE = 36.2304;
const LATITUDE_DELTA = 0.002;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SLIDER_1_FIRST_ITEM = 0;

const GOOGLE_MAPS_APIKEY = 'AIzaSyBuSUD981rmpfEc1q_LhnkQ9Rx6gzb86mc';

export default class Route extends Component<Props> {

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
    data: [],
    venues: [],
    loading: false,
    loadingVenues: false,
    loadingLocation: false,
    geoLocationError: null,
    guideModal: false,
  };
      this.mapView = null;
  }

  componentWillMount(){
    this.getData();
    this.getVenues();

    AsyncStorage.getItem('user_uid', (err, result) => {
      const url = 'https://klugdata.com/api/stat/'+ result +'/' + 'route' + '/' + this.props.navigation.state.params.routeNumber;
      fetch(url).then(res => res.json()).then(res => {}).catch(error => {});
    });
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {},(error) => console.log(JSON.stringify(error)),);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getData(){
    const url = 'https://klugdata.com/api/route/'+this.props.navigation.state.params.routeNumber+'/'+strings('system_translations.language');
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {     
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
        });
        this.setPointsAndPlaces();
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  getVenues(){
    const url = 'https://klugdata.com/api/venues/'+this.props.navigation.state.params.routeNumber+'/Kharkiv'+'/'+strings('system_translations.language');
    this.setState({ loadingVenues: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {     
        this.setState({
          data: res,
          error: res.error || null,
          loadingVenues: false,
        });
        this.setVenues();
      })
      .catch(error => {
        this.setState({ error, loadingVenues: false });
      });
  }

  renderLoadIndicator(){
    if(!this.state.loading) 
      if(!this.state.loadingLocation)
      return (<Text style={{fontWeight: 'bold', color: 'black', fontFamily: 'Roboto-Regular', paddingLeft: 25, paddingRight: 25, textAlign: 'center', paddingTop: 8, paddingBottom: 8}}>
          {strings('route_buttons.find_me')}</Text>);
    return (<ActivityIndicator animating size="large" color="#5682a3"/>);
  }

  setPointsAndPlaces(){
    var places = [],
        points = [];

    for(item of this.state.data){ 
      item.coordinates.latitude = parseFloat(item.coordinates.latitude);
      item.coordinates.longitude = parseFloat(item.coordinates.longitude);
      if(item.title)
        places.push(item);        
      points.push(item.coordinates);
    }
    this.setState({places, points});
  }

  setVenues(){
    let venues = [];
    for(item of this.state.data){
      item.coordinates.latitude = parseFloat(item.coordinates.latitude);
      item.coordinates.longitude = parseFloat(item.coordinates.longitude);
      venues.push(item);
    }
    this.setState({ venues });
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
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }).catch(err => {
      console.log(err);
    });
  }

  _renderItem ({item, index}) {
      return (<SliderEntry 
                data={item} 
                even={(index + 1) % 2 === 0} 
                navigation={this.props.navigation} 
              />);
  }

  renderSlider () {
    if(!this.state.loading)
      return (
          <View style={styles.sliderContainer}>
            <Carousel
              ref={c => this._slider1Ref = c}
              data={this.state.places}
              renderItem={this._renderItem.bind(this)}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              firstItem={SLIDER_1_FIRST_ITEM}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              containerCustomStyle={sliderStyles.slider}
              contentContainerCustomStyle={sliderStyles.sliderContentContainer}
              onSnapToItem={(index) => {
                this.mapView.animateToCoordinate(this.state.places[index].coordinates, 500);
              }
              }
            />
          </View>
      );
  }

  renderPoints(){
    if(!this.state.loading)
      return (
        this.state.places.map((place, index) =>  
          <Marker.Animated 
            key={`sight_${index}`} 
            coordinate={{latitude: place.coordinates.latitude, longitude: place.coordinates.longitude}}
            image={require('../assets/img/route/place.png')} 
            title={place.title}
            onCalloutPress={()=>this.props.navigation.navigate('Place', {itemId: place.id})}
            onPress={()=>this._slider1Ref.snapToItem(index, animated = true, fireCallback = true)}
          />
        )
      );
  }

  renderVenues(){
    if(!this.state.loadingVenues)
      return (
        this.state.venues.map((venue, index) => { 
          if(venue.discount)
            return (<MapView.Marker 
              key={`venue_${index}`} 
              coordinate={venue.coordinates}
              image={require('../assets/img/route/venue_discount.png')}
              title={venue.name+' - '+venue.price}
              onCalloutPress={()=>this.props.navigation.navigate('Venue', {itemId: venue.id})}
            />) 
          else
            return (<MapView.Marker 
              key={`venue_${index}`} 
              coordinate={venue.coordinates}
              image={require('../assets/img/route/venue.png')}
              title={venue.name+' - '+venue.price}
              onCalloutPress={()=>this.props.navigation.navigate('Venue', {itemId: venue.id})}
            />)       
        })
      );
  }

  renderDirectionToStart(){
    if(!this.state.loading)
      if(this.state.userRegion.latitude && this.state.userRegion.longitude)
        return (
            <MapViewDirections
              origin={{ latitude: this.state.userRegion.latitude, longitude: this.state.userRegion.longitude}}
              destination={this.state.points[0]}
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

  renderDirection(){
    if(!this.state.loading)
      return (
        (this.state.points.length >= 2) && (
          <MapViewDirections
            origin={this.state.points[0]}
            waypoints={(this.state.points.length > 2) ? this.state.points.slice(1, -1): null}
            destination={this.state.points[this.state.points.length-1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            language={"en"}
            mode={"walking"}
            strokeColor="#5682a3"
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`); 
            }}
            onReady={(result) => {
              let region = {
                latitude: result.coordinates[0].latitude,
                longitude: result.coordinates[0].longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04*(width / height),
              };
              this.mapView.animateToRegion(region, 750);
            }}
            onError={(errorMessage) => {
              console.log(errorMessage);
            }}
          />
        )
      );
  }

  guideCloseModal(message){
    this.setState({guideModal: false});
  }

  guideOpenModal(message){
    this.setState({guideModal: true});
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
        {this.renderSlider()} 

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
        {this.renderPoints()}
        {this.renderVenues()}
        {this.renderDirection()}
        {this.renderDirectionToStart()}

      </MapView>

      </View>
      
      );
  }
}