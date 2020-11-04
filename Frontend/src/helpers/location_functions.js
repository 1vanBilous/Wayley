import React, { Component } from 'react';
import {PermissionsAndroid} from 'react-native';

export async function requestUserLocationWithAlert() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location',
        'message': 'Wayley App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
    } else {
      console.log("location permission denied")            
    }
  } catch (err) {
    console.warn(err)
  }
}