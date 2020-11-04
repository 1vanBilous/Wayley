import React, { Component } from 'react';
import {Text, View, TouchableWithoutFeedback, AsyncStorage, Alert, ActivityIndicator, StatusBar} from 'react-native';

import {styles} from './styles';

export default class Price extends Component<Props> {
    render(){     
        var result = '';
        if(this.props.data.price)
          for(var i=0; i<parseInt(this.props.data.price); i++)
            result = result + '$';
        return(
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: 4}}>
            <View style={[styles.topButton, {width: 60}]}>
              <Text style={styles.priceText}>{result}</Text>
            </View>
            
            {this.props.data.discount ? 
            <TouchableWithoutFeedback onPress={()=>this.props.openModal()}>
              <View style={[styles.topButton,{backgroundColor: "#df1251"}]}>
                <Text style={styles.priceText}>Get the discount</Text>
              </View>
            </TouchableWithoutFeedback>
            : null}

          </View>
        );
    }

}