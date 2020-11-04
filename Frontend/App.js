import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import {requestUserLocationWithAlert} from './src/helpers/location_functions';
import {Navigation} from './src/navigation';


export default class App extends Component<Props>{
  
  async componentWillMount() {
    await requestUserLocationWithAlert();
    AsyncStorage.setItem('user_uid', DeviceInfo.getUniqueID(), () => {});
    AsyncStorage.setItem('city', 'Kharkiv', () => {});
  }

 
  render(){
    return (
        <Navigation/>
    )
  }
} 

