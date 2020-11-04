import React from 'react';
import {    StyleSheet, 
            View, 
            Image, 
            StatusBar, 
            Picker, 
            AsyncStorage
} from 'react-native';
import { strings } from '../locales/i18n';
import DeviceInfo from 'react-native-device-info';
import {headerStyle} from './styles';


export default class Header extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            data: [],
            loading: false,
            error: null,
            refreshing: false,
            city: null,
        }
    }
    
    componentWillMount(){        

    }

    componentDidMount(){

    }

    render() {
        return (
            <View style={headerStyle.headerBlock}>
            <StatusBar
                backgroundColor="#3d5f78"
                barStyle="light-content"
            />

            <View style={headerStyle.searchSection}>
                <Image 
                source={require('../assets/img/lense.png')} 
                style={headerStyle.searchIcon}/>
                
                <Picker
                selectedValue={this.state.city}
                style={headerStyle.cityPicker}
                itemStyle={headerStyle.cityPickerItem}
                textStyle={{fontFamily: "Roboto-regular", fontSize: 20, color: '#e8edf1'}}
                onValueChange={(itemValue, itemIndex) => {
                    this.setState({city: itemValue});
                    AsyncStorage.setItem('city', itemValue, () => {
                        console.log('new city recorded: ' + itemValue);
                    }); 
                }}>
                    <Picker.Item label={strings('home.Kharkiv')} value={"Kharkiv"}/>
                </Picker>

            </View>
            </View>
        );
    }
}

