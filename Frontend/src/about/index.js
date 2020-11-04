import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, Alert} from 'react-native';
import Header from '../header';

import {strings} from '../locales/i18n';

export default class About extends Component<Props> {

    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
        
    }

    render() {
      return (
          <View style = {styles.container}>
           <ScrollView style={{width: "100%", backgroundColor: '#fff'}} contentContainerStyle={{alignItems: 'center'}}>
           <Header navigation={this.props.navigation} />
              <Text style={styles.textBig}> Contacts: </Text>
              <Text style={[styles.textSmall, {fontSize: 18, color: "#5682a3"}]} onPress={() => Linking.openURL('https://www.facebook.com/ternowy')}> Alexander Ternowy - CEO </Text>
              <Text style={[styles.textSmall, {fontSize: 18, color: "#5682a3"}]} onPress={() => Linking.openURL('https://freelancehunt.com/freelancer/JustFruitPie.html')}> Ivan Bilous - CTO </Text>
              <Text style={[styles.textSmall, {fontSize: 18, color: "#5682a3"}]} onPress={() => Linking.openURL('https://www.facebook.com/ilya.kosenko.5')}> Ivan Bilous - CDBO </Text>
              <Text style={[styles.textSmall, {fontSize: 18, color: "#5682a3"}]} onPress={() => Linking.openURL('https://www.facebook.com/margarita.kryvulia.5')}> Margarita Kryvulia - CM </Text>
              <Text style={[styles.textSmall, {fontSize: 18, color: "#5682a3"}]} onPress={() => Linking.openURL('https://www.facebook.com/margarita.kryvulia.5')}> Ivan Bilous - CM </Text>

              <Text style={[styles.textBig, {marginTop: 25}]}> Thanks to: </Text>

              <Text style={styles.textSmall}> Dr. Bianca Kos </Text>
              <Text style={styles.textSmall}> Dr. Ksenia Minakova </Text>
              <Text style={styles.textSmall}> Prof. Wladimir Kotlyarov </Text>
              <Text style={styles.textSmall}> Sofiia Zymnytska </Text>
              <Text style={styles.textSmall}> Yulii Tkachov </Text>

              <Text style={styles.textSmall}> Dave Caserta </Text>

              <Text style={[styles.textSmall, {marginTop: 25, color: "#5682a3"}]} onPress={() => Linking.openURL('https://klugdata.com/agreement')}>Privacy Policy</Text>
           </ScrollView>
           </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  textBig: {
    fontFamily: 'Roboto-Regular',
    fontSize: 17,
    color: "#000",
    padding: 3,
  },
  textSmall:{
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: "#000",
    padding: 2,
  }
});