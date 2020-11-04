import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderEntry.style';
import {strings} from '../../locales/i18n';

export default class SliderEntry extends Component<Props>{
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: illustration }}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: illustration }}
              style={styles.image}
            />
        );
    }

    setPrice(title){
      if((!title)||(title=='0')) 
        return strings('values.free');
      else
        return (title + ' uah');
    }

    displayStatus(status){
        if(status) 
          return ('* ' + status);
        else
          return null;
      }

    render () {
        const { data: { title, subtitle, id, status }, even, navigation } = this.props;

        const uppercaseTitle = title ? (
            <Text
              style={styles.title}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => this.props.navigation.navigate('Place', {itemId: id}) }
              >
                <View style={styles.shadow} />
                <View style={styles.imageContainer}>
                    { this.image }
                    <View style={styles.radiusMask} />
                </View>
                <View style={styles.textContainer}>
                    { uppercaseTitle }
                    <Text
                      style={styles.subtitle}
                      numberOfLines={2}
                    >
                        { this.setPrice(subtitle) } {this.displayStatus(status)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}