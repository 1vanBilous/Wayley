import React, { Component } from 'react';
import {Text, 
        View, 
        AsyncStorage, 
        ImageBackground, 
        Image, 
        TouchableHighlight, 
        Keyboard, 
        Alert, 
        Modal, 
        TextInput, 
        TouchableOpacity
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import StarRating from 'react-native-star-rating';

import {strings} from '../../locales/i18n';

import {review} from './styles';

export default class Venue extends Component<Props> {

    constructor(props){
        super(props)
        this.state = {
            data: [],
            loading: false,

            reviewWarning: null,
            reviewText: '',
            starCount: 0,

            error: null,
        }
    }


    onStarRatingPress(rating) {
        this.setState({ starCount: rating });
    }

    renderReviewErrors(){
        if(this.state.reviewWarning==1)
            return (
                <Text style={{color: '#e1205b', fontFamily: 'Roboto-Regular', fontSize: 16, textAlign: 'center'}}>
                {strings('review.need_star')}
                </Text>
            );
        if(this.state.reviewWarning==2)
            return (
                <Text style={{color: '#e1205b', fontFamily: 'Roboto-Regular', fontSize: 16, textAlign: 'center'}}>
                {strings('review.need_text')}
                </Text>
            );

        return (
            <Text style={{color: '#000', fontFamily: 'Roboto-Regular', fontSize: 16, textAlign: 'center'}}>
            {strings('review.default_phrase')}
            <Text style={{color: '#000', fontFamily: 'roboto-bold', fontSize: 16, textAlign: 'center'}}> Wayley </Text>
            </Text>
        );
    }


    sendReview(){
        // check text and star
        if(this.state.starCount==0)
            this.setState({reviewWarning: 1});
        else
            if(!this.state.reviewText)
                this.setState({reviewWarning: 2});
            else{
                fetch('https://klugdata.com/api/venue/review', {
                    method: 'POST',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify({
                    venue_id: this.props.itemId,
                    user_uid: DeviceInfo.getUniqueID(),
                    review_text: this.state.reviewText,
                    rating: this.state.starCount,
                    user_email: 'yourValue',
                    }),
                });
                this.props.closeModal('sent');
        }
    }

    render(){
        return(
            
        <View style={review.container}>   
            <View style={{flex: 3, width: '90%',}}>
                <TouchableOpacity activeOpacity={1} onPress={()=>this.props.closeModal()} style={{padding: 15, width: '100%', height: '100%'}}>  
                    <Image source={require('../../assets/img/exitIcon.png')} style={{resizeMode: 'contain', width: 17, height: 17, alignSelf: 'flex-start', marginTop: 10}}/>
                </TouchableOpacity>
            </View>

            <View style={{flex: 3, width: '80%', alignItems: 'center'}}>
                <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
                {this.renderReviewErrors()}
                </View>
            </View>

            <View style={{flex: 3, width: '80%', alignItems: 'center', justifyContent: 'flex-start'}}>
                <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                fullStarColor={'#5682a3'}
                />
            </View>

            <View style={{ flex: 4, width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                <TextInput
                    style={[review.reviewText, {}]}
                    onChangeText={(text) => this.setState({reviewText: text})}
                    value={this.state.reviewText}
                    maxLength = {200}
                    multiline = {true}
                    returnKeyType='go'
                    onSubmitEditing={Keyboard.dismiss}
                    placeholder={strings('review.tip')}
                    placeholderTextColor="#a5a5a5"
                    underlineColorAndroid="#5682a3"
                />
            </View>

            <View style={{flex: 3, width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableHighlight onPress={()=>this.sendReview()} 
                style={{padding: 10, borderRadius: 8, backgroundColor: '#5682a3', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Roboto-Regular', color: "#fff", fontSize: 20}}>{strings('review.send')}</Text>
                </TouchableHighlight>
            </View>

        </View>
        );
    }

}