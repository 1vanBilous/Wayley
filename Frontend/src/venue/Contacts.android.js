import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Linking} from 'react-native';
import { strings } from '../locales/i18n';
import Communications from 'react-native-communications';
import {contactStyles} from './styles';

export default class Contacts extends Component<Props> {

    renderWebsite(){
        if(this.props.website)
            return( 
                <TouchableHighlight  style={contactStyles.contactButtons}  
                underlayColor="#f2f2f2" onPress={() => Linking.openURL(this.props.website)}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={contactStyles.contactIcon} 
                        source={require('../assets/img/venues/website.png')} />
                        <Text style={[contactStyles.contactText, {color: '#5682a3'}]}>{strings('sight_description.website')}</Text>
                    </View>
                </TouchableHighlight>
            );
    }

    renderPhone(){
        if(this.props.phone)
            return(
                <TouchableHighlight style={contactStyles.contactLink} 
                underlayColor="#f2f2f2" onPress={() => Communications.phonecall(this.props.phone, true)} >
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={contactStyles.contactIcon} 
                        source={require('../assets/img/venues/Phone.png')} />
                        <Text style={contactStyles.contactText}>{this.props.phone}</Text>
                    </View>
                </TouchableHighlight>
        );
    }

    renderMap(){
        return ( 
        <TouchableHighlight style={contactStyles.contactButtons} 
        underlayColor="#f2f2f2"
        onPress={()=>this.props.navigation.navigate('ShowOnMap', {latitude: this.props.latitude, longitude: this.props.longitude})}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image style={contactStyles.contactIcon} 
                source={require('../assets/img/venues/openOnMap.png')} />
                <Text style={[contactStyles.contactText, {color: '#5682a3'}]}>{strings('sight_description.showOnMap')}</Text>
            </View>
        </TouchableHighlight>
        );
    }

    render() {
        return ( 
            <View style={{marginTop:10, flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10, marginBottom: 10,}}>
                {this.renderWebsite()}
                {this.renderPhone()}
                {this.renderMap()}
            </View>
        );
    }
}