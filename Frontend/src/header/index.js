import React from 'react';
import {StyleSheet, 
        View, 
        TouchableOpacity, 
        StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Header extends React.Component {
    render() {
        return (
            <View style={[styles.container, this.props.absolute? {position:'absolute'} : null]}>
                <StatusBar
                    backgroundColor="#3d5f78"
                    barStyle="light-content"
                />
                <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.goBack()} style={styles.touchzone}>                    
                    <View style={styles.button}>
                        <Icon
                        name="md-arrow-back"
                        color="rgba(255, 255, 255, .9)"
                        size={24}
                        style={{ backgroundColor: 'transparent' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '20%',
        flexDirection: 'row',
        height: 70,
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchzone: {
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    arrow: { 
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
});

