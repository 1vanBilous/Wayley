import React, { Component } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ActivityIndicator, Image} from 'react-native';

import {wifi} from './styles';
import {styles} from '../styles';

export class Wifi extends Component<Props> {
    render(){
        return(
            <View style={wifi.outContainer}>
                <TouchableOpacity style={wifi.container} onPress={()=>{this.props.closeModal()} }>
                    <TouchableOpacity style={wifi.innerContainer} activeOpacity={1}> 
                        <View>
                            <Text style={wifi.title}>Wifi password</Text> 
                            <Text style={wifi.text}>{this.props.data.wifi}</Text>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        );
      }
}

export class WifiButton extends Component<Props> {
    render(){   
        return( 
            <TouchableWithoutFeedback onPress={()=>this.props.openModal()}>
                <View style={styles.blueCircut}>
                    <Image source={require('../../assets/img/venues/wifi.png')} style={{resizeMode: 'contain', width: 35, height: 35}}/>
                </View>
            </TouchableWithoutFeedback>
        );
      }
}