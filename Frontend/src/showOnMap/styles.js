import React, { Component } from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const { height: viewportHeight } = Dimensions.get('window');
const slideHeight = viewportHeight * 0.30;
const vHeight = viewportHeight - slideHeight - 20;

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
      },
  map: {
    width: '100%',
    zIndex: -1,
    height: '100%', 
    paddingTop: 1, 
  },

  findMe: {
    position: 'absolute',
    top: vHeight,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    bottom: 6,
    paddingHorizontal: 5,
    paddingTop: 2,
  },
  findMeButton: {
    backgroundColor: '#fff',
    borderRadius: 50, 
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
        height: 20,
    },
    elevation: 6
  }
});