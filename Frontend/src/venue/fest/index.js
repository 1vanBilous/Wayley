import React, { Component } from 'react';
import {Text, 
        View, 
        StyleSheet,
        ImageBackground, 
        Image, 
        TouchableHighlight, 
        Keyboard, 
        FlatList, 
        Alert, 
        TouchableWithoutFeedback, 
        Modal, 
        TextInput, 
        TouchableOpacity
} from 'react-native';
import {strings} from '../../locales/i18n';
import {styles} from './styles';

export default class Description extends Component<Props> {
    constructor(props){
        super(props)
        this.state = {
            data: [],
        }
      }
  
      componentWillMount(){

      }

      render(){
          return(
            <View style={[styles.contentContainer,{alignSelf: 'flex-start'}]}>
              
                {this.props.trait ?   
                <View>
                    <View style={{width: '85%', height: 1, borderTopColor: '#d5d5d5', borderTopWidth: 1, alignSelf: 'center', marginVertical: 10}}/>
                    <Text style={styles.blockHeader}>{strings('venue_description.trait')}</Text>
                    <Text style={styles.placeHistory}>{this.props.trait}</Text>
                </View>
                : null }

                {this.props.shedule ?   
                <View>
                    <View style={{width: '85%', height: 1, borderTopColor: '#d5d5d5', borderTopWidth: 1, alignSelf: 'center', marginVertical: 10}}/>
                    <Text style={styles.blockHeader}>{strings('venue_description.shedule')}</Text>
                    <Text style={styles.placeHistory}>{this.props.shedule}</Text>
                </View>
                : null }

                {this.props.description ?   
                <View>
                    <View style={{width: '85%', height: 1, borderTopColor: '#d5d5d5', borderTopWidth: 1, alignSelf: 'center', marginVertical: 10}}/>
                    <Text style={styles.blockHeader}>{strings('venue_description.description')}</Text>
                    <Text style={styles.placeHistory}>{this.props.description}</Text>
                </View>
                : null }

                {this.props.program ?   
                <View>
                    <View style={{width: '85%', height: 1, borderTopColor: '#d5d5d5', borderTopWidth: 1, alignSelf: 'center', marginVertical: 10}}/>
                    <Text style={styles.blockHeader}>{strings('venue_description.program')}</Text>
                    <Text style={styles.placeHistory}>{this.props.program}</Text>
                </View>
                : null }

                <View style={{width: '85%', height: 1, borderTopColor: '#d5d5d5', borderTopWidth: 1, alignSelf: 'center', marginVertical: 10}}/>
            </View>
          );
      }
}