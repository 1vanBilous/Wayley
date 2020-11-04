import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {Image, StyleSheet} from 'react-native';
import Routes from '../routes_list';
import Route from '../route';
import Place from '../place';
import Places from '../places_list';
import Venue from '../venue';
import Venues from '../venues_list';
import OnMap from '../map';
import ShowOnMap from '../showOnMap';
import About from '../about';
import Fest from '../fest';
import {styles} from './styles';

const RouteStack = createStackNavigator(
    {
      Home: {screen: Routes},
      Venue:  {screen: Venue},
      Place:  {screen: Place},
      Route: {screen: Route},
      ShowOnMap: {screen: ShowOnMap},
      Fest: {screen: Fest},
      About:  {screen: About},
    },
    {
      mode: 'modal',
      headerMode: 'none',
      initialRouteName: 'Home',
    }
  );
  
  RouteStack.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName != 'Home') {
      navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
  };
  
  const PlacesStack = createStackNavigator(
    {
      Home: {screen: Places},
      Place:  {screen: Place},
      ShowOnMap: {screen: ShowOnMap},
    },
    {
      mode: 'modal',
      headerMode: 'none',
      initialRouteName: 'Home',
    }
  );
  
  PlacesStack.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName != 'Home') {
      navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
  };
  
  const VenuesStack = createStackNavigator(
    {
      Home: {screen: Venues},
      Venue:  {screen: Venue},
      ShowOnMap: {screen: ShowOnMap},
    },
    {
      mode: 'modal',
      headerMode: 'none',
      initialRouteName: 'Home',
    }
  );
  
  VenuesStack.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName != 'Home') {
      navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
  };
  
  const MapStack = createStackNavigator(
    {
      Home: {screen: OnMap},
      Venue:  {screen: Venue},
      Place:  {screen: Place},
      ShowOnMap: {screen: ShowOnMap},
    },
    {
      mode: 'modal',
      headerMode: 'none',
      initialRouteName: 'Home',
    }
  );
  
  MapStack.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName != 'Home') {
      navigationOptions.tabBarVisible = false;
    }
    
    return navigationOptions;
  };
  
  export const Navigation = createBottomTabNavigator (
    {
      Routes: RouteStack,
      Places: PlacesStack,
      Venues: VenuesStack,
      Map: MapStack,
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
        
          if (routeName === 'Routes'){
            if(focused)
              return <Image source={require('../assets/img/menu/HomeON.png')} style={styles.image}  />;
            else
              return <Image source={require('../assets/img/menu/HomeOFF.png')} style={styles.image}  />;
          }
  
          if (routeName === 'Places'){
            if(focused)
              return <Image source={require('../assets/img/menu/LandmarksON.png')} style={styles.image}  />;
            else
              return <Image source={require('../assets/img/menu/LandmarksOFF.png')} style={styles.image}  />;
          }
  
          if (routeName === 'Venues'){
            if(focused)
              return <Image source={require('../assets/img/menu/CafeON.png')} style={styles.image}  />;
            else
              return <Image source={require('../assets/img/menu/CafeOFF.png')} style={styles.image}  />;
          }
  
          if (routeName === 'Map'){
            if(focused)
              return <Image source={require('../assets/img/menu/MapON.png')} style={styles.image}  />;
            else
              return <Image source={require('../assets/img/menu/MapOFF.png')} style={styles.image}  />;
  
          }
  
  
        },
      }),
      tabBarOptions: {
        showLabel: false,
        headerMode: 'none',
        style: {
            shadowColor: 'black',
            shadowOpacity: 1,
            shadowRadius: StyleSheet.hairlineWidth,
            shadowOffset: {
                height: -8,
            },
            elevation: 10,
            backgroundColor: '#fff',
            paddingBottom: 2,
            borderTopWidth: 0,
        }
      },
    }
  );