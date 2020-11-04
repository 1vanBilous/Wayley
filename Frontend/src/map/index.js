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
          StatusBar
} from 'react-native';

import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import {strings} from '../locales/i18n';
import {styles} from './styles';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 49.9935;
const LONGITUDE = 36.2304;
const LATITUDE_DELTA = 0.13;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    
export default class OnMap extends Component<Props> {

    constructor(props) 
    {
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
      city: 'Kharkiv',
      places: [],
      venues: [],
      loading: false,
      loadingVenues: false,
      loadingPlaces: false,
      loadingLocation: false,
      geoLocationError: null,
    };
        this.mapView = null;
    }

    componentDidMount() {
    }

    componentWillMount(){
        this.getPlaces();
        this.getVenues();
    }

    componentWillUnmount(){
      if (this.watchID) Geolocation.clearWatch(this.watchID);
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

    renderLoadIndicator()
    {
      if(!this.state.loading)
      if(!this.state.loadingPlaces) 
      if(!this.state.loadingVenues) 
       if(!this.state.loadingLocation)
        return (<Text style={{fontWeight: 'bold', color: 'black', fontFamily: 'Roboto-Regular', paddingLeft: 25, paddingRight: 25, textAlign: 'center', paddingTop: 8, paddingBottom: 8}}>
            {strings('route_buttons.find_me')}</Text>);
      return (<ActivityIndicator animating size="large" color="#5682a3"/>);
    }

    getVenues()
    {
      const url = 'https://klugdata.com/api/venues/'+ this.state.city +'/' + strings('system_translations.language');
      this.setState({ loadingVenues: true });
      fetch(url)
        .then(res => res.json())
        .then(res => {     
          this.setState({
            venues: res,
            error: res.error || null,
          });
          this.setVenues();
          this.setState({loadingVenues: false });
        })
        .catch(error => {
          this.setState({ error, loadingVenues: false });
        });
    }

    setVenues(){
      let venues = [];
        for(item of this.state.venues){
          item.coordinates.latitude = parseFloat(item.coordinates.latitude);
          item.coordinates.longitude = parseFloat(item.coordinates.longitude);
          venues.push(item);
        }
      this.setState({ venues });
    }

    getPlaces(){
      const url = 'https://klugdata.com/api/landmarks/'+ this.state.city +'/'+ strings('system_translations.current_language');
      this.setState({ loadingPlaces: true });
      fetch(url)
        .then(res => res.json())
        .then(res => {     
          this.setState({
            places: res,
            error: res.error || null,
          });
          this.setPlaces();
          this.setState({loadingPlaces: false });
        })
        .catch(error => {
          this.setState({ error, loadingPlaces: false });
        });
    }

    setPlaces(){
      let places = [];
        for(item of this.state.places){
          item.location.latitude = parseFloat(item.location.latitude);
          item.location.longitude = parseFloat(item.location.longitude);
          places.push(item);
        }
      this.setState({ places });
    }

    renderPlaces(){
      if(!this.state.loadingPlaces)
        return (
          this.state.places.map((place, index) =>  
            <MapView.Marker 
              key={`place${index}`} 
              coordinate={place.location}
              image={require('../assets/img/route/place.png')}
              title={place.name}
              onCalloutPress={()=>this.props.navigation.navigate('Place', {itemId: place.id})}
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

    
    render() {
        return (
        <View style ={styles.container}>

         <Image source={require('../assets/img/route/place.png')} style={{ display: 'none' }} />
          {/* <MapHeader navigation={this.props.navigation} /> */}
          <StatusBar
              backgroundColor="#3d5f78"
              barStyle="light-content"
          />
          <View style={styles.findMe}>
            <TouchableOpacity
            style={styles.findMeButton}
            activeOpacity={0.7}
            onPress={()=> this.getCurrentPosition()}>
            {this.renderLoadIndicator()}
            </TouchableOpacity>
          </View> 


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

          

          {this.renderPlaces()}
          {this.renderVenues()}

        </MapView>

        </View>
        
        );
    }
}