import React from 'react';
import {StyleSheet, 
        View, 
        Image, 
        TouchableOpacity, 
        StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {mapHeaderStyle} from './styles';

export default class MapHeader extends React.Component {
    render() {
        return (
            <View style={mapHeaderStyle.headerBlock}>
             <StatusBar
            backgroundColor="#3d5f78"
            barStyle="light-content"
          />
            <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate('Routes')} 
            style={{alignItems: 'center', justifyContent: 'center', flex: 2, height:'100%'}}>                    
                <Icon
                name="md-arrow-back"
                color="rgba(255, 255, 255, .9)"
                size={24}
                style={{ backgroundColor: 'transparent' }}
                />
            </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{flex:6, height:'100%', justifyContent: 'center', alignItems: 'center',}}>  
                    <Image source={require('../assets/img/logo.png')} style={mapHeaderStyle.logo}/>
                </TouchableOpacity>
                <View style={{flex: 2, height: '200%'}} />
            </View>
        );
    }
}