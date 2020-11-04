import React, { Component } from 'react';
import {Text, 
        View, 
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
import Item from './Item';

export default class Swiper extends Component<Props> {
    constructor(props){
        super(props)
        this.state = {
            data: [],
        }
      }
  
      componentWillMount(){
        //console.log('Something: ', this.props.tags);
        var tags = this.props.tags.split(',');
        var data = []; //empty to fill after filtering
        tags.map(function(name) {
            if(name!=""||name!=" ")
                data.push(name);
        });

        this.setState({data});
      }

      render(){
          return(
            <View>
                <FlatList
                    horizontal={true}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                    style={{width: '100%'}}
                    data={this.state.data}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Item name={item}/>      
                    )}
                />
            </View>
          );
      }
}