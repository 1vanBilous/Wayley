import React, { Component } from 'react';
import {StyleSheet, 
        Text, 
        View,
        Image, 
        TouchableHighlight
} from 'react-native';
import { strings } from '../locales/i18n';
import {listItemStyles} from './styles';

export default class ListItem extends Component<Props> {

    renderContent(){
        if(this.props.index & 1)
            return (
                <View>
                <Image style={[listItemStyles.picture, {marginLeft: 7, marginRight: 15}]} source={this.props.picture}/>
                <Text style={[listItemStyles.type, {marginLeft: 12, marginRight: 15}]}>{strings('sight_type.'+this.props.type)}</Text>
                <Text style={[listItemStyles.name, {marginLeft: 12, marginRight: 15}]} numberOfLines={2}>{this.props.name}</Text>
                </View>
            );
        return (
            <View>
            <Image style={[listItemStyles.picture, {marginLeft: 15, marginRight: 7}]} source={this.props.picture}/>
            <Text style={[listItemStyles.type, {marginLeft: 20, marginRight: 7}]}>{strings('sight_type.'+this.props.type)}</Text>
            <Text style={[listItemStyles.name, {marginLeft: 20, marginRight: 7}]} numberOfLines={2}>{this.props.name}</Text>
            </View>
        );
    }
    
    render() {
            return (
                <TouchableHighlight style={{width: '50%'}} underlayColor="rgba(0,0,0,0)"
                onPress={()=> this.props.navigation.navigate('Place', {itemId: this.props.id})} >
                    <View style={listItemStyles.container}>
                        {this.renderContent()}
                    </View>    
                </TouchableHighlight>
            );
    }
}