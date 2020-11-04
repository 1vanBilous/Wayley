import React from 'react';
import {StyleSheet, 
        View, 
        TouchableOpacity, 
        StatusBar,
        Text,
        Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { strings } from '../../locales/i18n';
import {styles} from './styles';
export default class Guide extends React.Component {
    render() {
        return (
            <View style={styles.outContainer}>
            <TouchableOpacity style={styles.container} onPress={()=>{this.props.closeModal()} }>
                <TouchableOpacity style={styles.innerContainer} activeOpacity={1}> 
                    <View style={{width: "100%"}}>     
                        <Text style={[styles.text,{marginTop: 0, paddingTop: 5,}]}>Легенда</Text> 

                        <View style={{width: "100%", flexDirection: "row", justifyContent: "center"}}>     
                            <Image source={require('../../assets/img/vertep/location.png')}/>
                            <Text style={[styles.text,{marginTop: 0, paddingTop: 5,}]}>
                                Вертеп локація
                            </Text>
                        </View>

                        <View style={{width: "100%", flexDirection: "row", justifyContent: "center"}}>     
                            <Image source={require('../../assets/img/vertep/venue.png')}/>
                            <Text style={[styles.text,{marginTop: 0, paddingTop: 5,}]}>
                                заклад мережа-фест
                            </Text>
                        </View>

                        <View style={{width: "100%", flexDirection: "row", justifyContent: "center"}}>     
                            <Image source={require('../../assets/img/vertep/venue.png')}/>
                            <Text style={[styles.text,{marginTop: 0, paddingTop: 5,}]}>
                                Готель
                            </Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
        );
    }
}

