import React, { Component } from 'react';
import { StyleSheet, Text, View, List, Image, TouchableHighlight, ImageBackground} from 'react-native';
import { strings } from '../locales/i18n';
import {ListItemStyle} from './styles';

export default class ListItem extends Component<Props> {

    renderDiscountIcon(){
        if(this.props.discount)
            return(<Image source={require('../assets/img/discount/icon.png')} style={ListItemStyle.discountIcon}/>);
        return null;
    }

    renderLeftSideElement(){
        return (
        <View>
            <ImageBackground 
            style={[ListItemStyle.picture, {marginLeft: 7, marginRight: 15}]} 
            source={this.props.picture}
            imageStyle={{ borderRadius: 6 }}>
            {this.renderDiscountIcon()}
            </ImageBackground>
            <Text style={[ListItemStyle.type, {marginLeft: 12, marginRight: 15}]}>{strings('venues.'+this.props.type)} - {this.props.price}</Text>
            <Text style={[ListItemStyle.name, {marginLeft: 12, marginRight: 15}]} numberOfLines={2}>{this.props.name}</Text>
        </View>
        );
    }

    renderRightSideElement(){
        return (
        <View>
            <ImageBackground 
            style={[ListItemStyle.picture, {marginLeft: 15, marginRight: 7}]} 
            source={this.props.picture}
            imageStyle={{ borderRadius: 6 }}>
            {this.renderDiscountIcon()}
            </ImageBackground>
            <Text style={[ListItemStyle.type, {marginLeft: 20, marginRight: 7}]}>{strings('venues.'+this.props.type)} - {this.props.price}</Text>
            <Text style={[ListItemStyle.name, {marginLeft: 20, marginRight: 7}]} numberOfLines={2}>{this.props.name}</Text>
        </View>
        );
    }

    render() {
        return (
            <TouchableHighlight style={{width: '50%'}} underlayColor="rgba(0,0,0,0)"
            onPress={()=> this.props.navigation.navigate('Venue', {itemId: this.props.id})} >
                <View style={ListItemStyle.container}>
                    {(this.props.index & 1) ? this.renderLeftSideElement():this.renderRightSideElement() }
                </View>
            </TouchableHighlight>
        );
        
}
}