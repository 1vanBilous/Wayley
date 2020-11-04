import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import StarRating from 'react-native-star-rating';
import {reviewListItem} from './styles';

export default class ReviewListItem extends Component<Props> {

    render() {
        return (
            <View style={reviewListItem.itemBlock}>

                <View style={reviewListItem.stars}>
                    <StarRating
                    disabled={true}
                    maxStars={5}
                    starSize={20}
                    rating={this.props.stars}
                    fullStarColor={'#5682a3'}
                    />
                </View>
                <Text style={reviewListItem.text}> {this.props.text} </Text> 
                <Text style={reviewListItem.date}> {this.props.date} </Text> 

                <View style={{width: '95%', height: 1, borderBottomColor: '#8a8a8a', borderBottomWidth: 1, alignSelf:'center', marginTop: 8,}}/>
            </View> 
        );
    }
}

