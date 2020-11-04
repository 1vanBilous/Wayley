import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, ImageBackground} from 'react-native';
import { strings } from '../locales/i18n';
import {listItemStyle} from './styles';

export default class ListItem extends Component<Props> {

    constructor(props){
        super(props)
        this.state = {
            loadingPlaces: false,
            loading: false,
            data: [],
            error: null,
            places: [],
        }
    }

    componentWillMount(){
        this.getRoutePlaces();
    }

    getRoutePlaces(){
        this.setState({ loadingPlaces: true });
        fetch('https://klugdata.com/api/route/'+this.props.routeNumber+'/'+strings('system_translations.language'))
          .then(res => res.json())
          .then(res => {     
            this.setState({
              data: res,
              error: res.error || null,
              loadingPlaces: false,
            });
            this.setPointsAndPlaces();
          })
          .catch(error => {
            this.setState({ error, loadingPlaces: false });
          });
    }

    setPointsAndPlaces(){
        var places = [];
  
        for(item of this.state.data)
          if(item.title)
            places.push(item);        
          
        this.setState({places});
    }

    renderPlacesList(){
        let string = '';
        if(!this.state.loadingPlaces){    
            this.state.places.map((place, index) => {
                string = string + place.title + ' • ';
            });
            return (<Text style={listItemStyle.places} numberOfLines={2}>{string}</Text>);  
        }else{
            return (<View style={{height: 35, backgroundColor: '#f9faff'}} /> );
        }
        
    }

    render() {
        return (
        <TouchableHighlight style = {{width: '100%', }} underlayColor="rgba(0,0,0,0)"
        onPress={() => this.props.navigation.navigate('Route', {routeNumber: this.props.routeNumber})} >
            <View style={listItemStyle.route}>
                    <ImageBackground style={listItemStyle.image} source={this.props.picture} imageStyle={{ borderRadius: 6,  }}>
                        <View style={listItemStyle.placesCountContainer}> 
                            <Image style={listItemStyle.placesCountImage} source={require('../assets/img/binocular.png')}/>
                            <Text style={listItemStyle.placesCountText}>{this.props.places}</Text>
                        </View>
                    </ImageBackground>
                <View style={{marginHorizontal: 20,}}>
                    <Text style={listItemStyle.name}>{ this.props.name }</Text>
                    {this.renderPlacesList()}
                    <Text style={listItemStyle.lenght}>{strings('routes.distance')}: {this.props.distance} </Text>
                </View>
            </View>
        </TouchableHighlight>
        );
    }
}