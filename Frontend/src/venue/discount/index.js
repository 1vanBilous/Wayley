import React, { Component } from 'react';
import {Text,
        View,
        TouchableOpacity,
        TouchableWithoutFeedback,
        ImageBackground,
        Image,
        AsyncStorage,
        Alert,
        ActivityIndicator,
        StatusBar,
        Linking,
} from 'react-native';
import { strings } from '../../locales/i18n';
import DeviceInfo from 'react-native-device-info';
import {styles} from './styles';

import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export default class Discount extends Component<Props> {

    constructor(props){
      super(props);
      this.state = {
        userRegion: {
            latitude: null,
            longitude: null,
        },
        loading: false,
        data: [],
        error: null,
        status: 'request',
      };
    }

    componentWillMount(){
        if(this.props.progress)
            this.setState({status: this.props.progress});
        if(this.props.discountData)
            this.setState({data: this.props.discountData}); 
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
            .then(data => {}).catch(err => {});
    }
    //test This function
    getCurrentPosition(){
        this.setState({loading: true});
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
        .then(data => {
            Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                if(position.coords.longitude!=null){
                    let region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    this.setState({ userRegion: region });
                    this.getDataFromAPI();
                }
            },
            (error) => {
                console.log(error.code, error.message);
                this.setState({ status: "error"});
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }).catch(err => {
            console.log(err);
            this.setState({ status: "error"});
        });
    }

    getDataFromAPI=()=>{
        let userLocation = this.state.userRegion.latitude+','+this.state.userRegion.longitude;
        //let userLocation = this.props.data.latitude+','+this.props.data.longitude;
        console.log('https://klugdata.com/api/getDiscount/'+userLocation+'/'+this.props.data.id+'/'+DeviceInfo.getUniqueID());
        fetch('https://klugdata.com/api/getDiscount/'+userLocation+'/'+this.props.data.id+'/'+DeviceInfo.getUniqueID())
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res,
            loading: false,
          });
          this.setState({loading: false});
          if(res.api_response=="ERROR")
            this.setState({status: "error"});
          if(res.api_response=="OK")
            this.setState({status: "success"});
          if(res.api_response=="TO_FAR")
            this.setState({status: "condition"});
          if(res.api_response=="TO_MUCH")
            this.setState({status: "condition_count"});

          console.log(res);
          
        })
        .catch(error => {
            console.log(error);
            this.setState({ error, loading: false, status: "error"});
        });
    }
    
    componentWillUnmount() {
      this.props.saveState(this.state.status, this.state.data);
    } 

    renderRequestScreen(){
        return(
        <View style={{width: "100%"}}>
            <Text style={styles.text}>{strings('discount.get_in_condition')}</Text>          
            <ImageBackground style={styles.image} source={require('../../assets/img/discount/get_discount.png')}>
                <View style={styles.discountExplain}>
                    <Text style={[styles.text, {fontSize: 22, color: "#fff", fontFamily: "roboto-bold", padding: 0}]}>
                        {this.props.data.discountMessage}
                    </Text>
                </View>
            </ImageBackground>
            <TouchableWithoutFeedback onPress={()=>this.getCurrentPosition()}>
              <View style={styles.startButton}>
                <Text style={{color: '#fff', fontFamily: 'Roboto-Regular', fontSize: 18,}}>
                    {strings('discount.get_in')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
        </View>
        );
    }

    renderLoadingScreen(){
        return(
            <View style={{width: "100%", paddingBottom: 20,}}>
                <Text style={[styles.text]}>{strings('discount.loading_location')}</Text>          
                <ImageBackground style={styles.image} source={require('../../assets/img/discount/loading_background.png')}>
                    <Image source={require('../../assets/img/loadingScreen/loadingGif.gif')} style={{width: 50, height: 50, resizeMode: 'contain',}}/>
                </ImageBackground>
            </View>
        );
    }

    renderSuccessScreen(){
        return(
            <View style={{width: "100%", alignItems: "center", justifyContent: "center", paddingVertical: 10, }}>
                <Text style={[styles.text, {paddingBottom: 5, paddingHorizontal: 20}]}>{strings('discount.verified')}</Text>   
                <Text style={[styles.text, {fontSize: 30, fontFamily: 'roboto-bold', paddingVertical: 5,}]}>{this.props.data.nameLat}</Text>        
                <View style={styles.discountBox}>
                    <Text style={[styles.text, {fontSize: 35, paddingVertical: 5, color: "#fff"}]}>{this.state.data.discount}</Text>
                </View>
                <Text style={[styles.text]}>{strings('discount.you_have')} {this.state.data.count_try} {strings('discount.discounts')}</Text>          

                <TouchableWithoutFeedback onPress={()=> Linking.openURL('https://www.klugdata.com/agreement')} >
                        <Text style = {styles.agreementLink}>Agreement</Text>
                </TouchableWithoutFeedback> 
            </View>
        );
    }

    renderErrorScreen(){
        return(
            <View style={{width: "100%"}}>
                <Text style={[styles.text,{color: "#df1251", marginTop: 25}]}>{strings('system_translations.error')}</Text>          
                <Text style={[styles.text,{marginTop: 0, paddingTop: 5,}]}>{strings('system_translations.error_undefined')}</Text>   
                <TouchableWithoutFeedback onPress={()=>this.getCurrentPosition()}>
                    <View style={styles.startButton}>
                        <Text style={{color: '#fff', fontFamily: 'Roboto-Regular', fontSize: 18,}}>
                            {strings('discount.get_in')}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    renderConditionScreen(){
        return(
            <View style={{width: "100%"}}>
                <Text style={[styles.text,{color: "#df1251", marginTop: 25}]}>{strings('system_translations.error')}</Text>          
                <Text style={[styles.text,{marginTop: 0, paddingTop: 5,}]}>{strings('discount.get_in_condition_error')}</Text>   
                <TouchableWithoutFeedback onPress={()=>this.getCurrentPosition()}>
                    <View style={styles.startButton}>
                        <Text style={{color: '#fff', fontFamily: 'Roboto-Regular', fontSize: 18,}}>
                            {strings('discount.get_in')}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    renderConditionCountScreen(){
        return(
            <View style={{width: "100%"}}>
                <Text style={[styles.text,{color: "#df1251", marginTop: 25}]}>{strings('system_translations.error')}</Text>          
                <Text style={[styles.text,{marginTop: 0, paddingTop: 5,}]}>{strings('discount.get_in_condition_count')}</Text>   
            </View>
        );
    }

    render() {
      return (
        <View style={styles.outContainer}>
            <TouchableOpacity style={styles.container} onPress={()=>{this.props.closeModal()} }>
                <TouchableOpacity style={styles.innerContainer} activeOpacity={1}> 
                    {this.state.loading ? this.renderLoadingScreen() : 
                     this.state.status == 'request'? this.renderRequestScreen() : 
                     this.state.status == 'success'? this.renderSuccessScreen() : 
                     this.state.status == 'error'? this.renderErrorScreen() : 
                     this.state.status == 'condition'? this.renderConditionScreen() :
                     this.state.status == 'condition_count'? this.renderConditionCountScreen() : null }
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
        );
    }
}