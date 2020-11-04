import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Image,
    Alert,
    ImageBackground,
    ActivityIndicator,
    TouchableHighlight,
    FlatList,
    Linking, 
    StatusBar,
} from 'react-native';

import {styles} from './styles';

export default class Routes extends Component<Props> {

    constructor(props){
       super(props)
       this.state = {
         
       }
   }

   componentWillMount(){
      
   }

   render() {
    return (   
        <TouchableHighlight style = {{width: '100%', marginTop: 15,}} underlayColor="rgba(0,0,0,0)"
        onPress={() => this.props.navigation.navigate('Fest')} >
            <View style={styles.route}>
                    <ImageBackground style={styles.image} source={require('../../assets/img/vertep/background.png')} imageStyle={{ borderRadius: 6,  }}>
                    </ImageBackground>
                <View style={{marginHorizontal: 20,}}>
                    <Text style={styles.name}>Вертеп фест</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
   }
}