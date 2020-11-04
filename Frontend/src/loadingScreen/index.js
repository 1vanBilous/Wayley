import React, { Component } from 'react';
import {StyleSheet, 
        Image, 
        ImageBackground, 
        StatusBar
} from 'react-native';
import { strings } from '../locales/i18n';

export default class LoadingScreen extends Component<Props> {

    render() {
        return (
            <ImageBackground style={loader.mainBlock} source={require('../assets/img/loadingScreen/loadingscreen.png')}>
            <StatusBar backgroundColor="#3d5f78" barStyle="light-content"/>
            <Image source={require('../assets/img/loadingScreen/loadingGif.gif')} style={{width: 50, height: 50, resizeMode: 'contain', marginBottom: 50,}}/>
            </ImageBackground>
        );
    }
}

const loader = StyleSheet.create({
    mainBlock:{
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        backgroundColor: '#6791dc',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    gif:{
        width: 100,
        resizeMode: 'contain',

    },

});