import React, { Component } from 'react';
import {Text, 
        View, 
        ImageBackground, 
        Image, 
        TouchableHighlight, 
        Alert, 
        TouchableWithoutFeedback, 
        TouchableOpacity
} from 'react-native';
import {item} from './styles';
import {strings} from '../../locales/i18n';

export default class Item extends Component<Props> {
    constructor(props){
        super(props)
        this.state = {

        }
      }
  
      render(){
        if(this.props.name && this.props.name!="" && this.props.name!=" ")
            return(
                <View style={item.container}> 
                    <View style={item.item}>
                        <Image style={item.image} source={strings('venue_categories_image.'+this.props.name)}/>
                    </View>
                    <Text style={item.text} numberOfLines={1}>{strings('venue_categories.'+this.props.name)}</Text>
                </View>
            );
        else
            return null;
      }
}