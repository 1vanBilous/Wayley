import React, { Component } from 'react';
import {  StyleSheet, 
          Text, 
          View, 
          ScrollView, 
          Image, 
          ImageBackground, 
          TouchableHighlight, 
          Linking, 
          Alert,
          Modal
} from 'react-native';
import Header from '../header';
import LoadingScreen from '../loadingScreen';
import Communications from 'react-native-communications';
import {strings} from '../locales/i18n';
import {styles} from './styles';

export default class Place extends Component<Props> {

    constructor(props){
        super(props)
        this.state = {
          data: [],
          latitude: 0,
          longitude: 0,
          loading: false,
        }
    }

    componentDidMount(){
        this.getPlaceFromApiAsync();
    }

    getPlaceFromApiAsync() {
      this.setState({ loading: true });
      fetch('https://klugdata.com/api/sight/'+this.props.navigation.state.params.itemId+'/'+strings('system_translations.current_language'))
      .then((response) => response.json())
      .then((responseJson) => {
          var location = responseJson.location.split(";");
          this.setState({
            data: responseJson, 
            latitude: parseFloat(location[0]), 
            longitude: parseFloat(location[1]), 
            loading: false
          });
      })
      .catch((error) => {
        console.error(error);
      });
    }

    renderDescription(){
       if(this.state.data.description)
          return (
            <View style={[styles.contentContainer,{alignSelf: 'flex-start'}]}>
              <View style={{width: '85%', height: 1, borderTopColor: '#d5d5d5', borderTopWidth: 1, alignSelf: 'center', marginVertical: 10}}/>
              <Text style={styles.blockHeader}>{strings('sight_description.description')}</Text>
              <Text style={styles.placeDescription}>{this.state.data.description}</Text>
            </View>
          );
       return null;
    }

    renderHistory(){
       if(this.state.data.history)
          return (
            <View style={[styles.contentContainer,{alignSelf: 'flex-start'}]}>
              <View style={{width: '85%', height: 1, borderTopColor: '#d5d5d5', borderTopWidth: 1, alignSelf: 'center', marginVertical: 10}}/>
              <Text style={styles.blockHeader}>{strings('sight_description.history')}</Text>
              <Text style={styles.placeHistory}>{this.state.data.history}</Text>
            </View>
          );
       return null;
    }

    renderEntrancePrice(){
      if(this.state.data.price)
        return(
          <View style={styles.blueCircut}>
            <Text style={[styles.placePrice]}>{this.state.data.price}</Text>
            <Text style={[styles.placePriceValute]}>{this.state.data.valute}</Text>
          </View>);
      else
      return(
        <View style={styles.blueCircut}>
          <Text style={[styles.placePrice]}>FREE</Text>
          <Text style={[styles.placePriceValute]}>ENTRY</Text>
        </View>);
    }

    renderContactInfo(){
      return(
        <View style={{marginTop:10, flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10}}>

        {this.state.data.website ? 
        <TouchableHighlight  style={styles.contactButtons} 
          underlayColor="#f2f2f2" onPress={() => Linking.openURL(this.state.data.website)}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
            <Image style={styles.contactIcon} source={require('../assets/img/venues/website.png')} />
            <Text style={[styles.contactText, {color: '#5682a3'}]}>{strings('sight_description.website')}</Text>
          </View>
        </TouchableHighlight> 
        : null} 

        <TouchableHighlight style={styles.contactButtons} 
        underlayColor="#f2f2f2"
        onPress={()=>this.props.navigation.navigate('ShowOnMap', {latitude: this.state.latitude, longitude: this.state.longitude})}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
            <Image style={styles.contactIcon} 
            source={require('../assets/img/venues/openOnMap.png')} />
            <Text style={[styles.contactText, {color: '#5682a3'}]}>{strings('sight_description.showOnMap')}</Text>
          </View>
        </TouchableHighlight>
        </View>
        );
    }

    renderAddress=()=>{
      if(this.state.data.address)
        return (<Text style={styles.placeAddress}>{this.state.data.address}</Text>)
      else
        return null;
    }

    render() {
      return (
        <View style = {styles.container}>
        <Modal visible={this.state.loading}>
           <LoadingScreen/>
         </Modal>
        <ScrollView style={{width: "100%", backgroundColor: '#fff'}} contentContainerStyle={{alignItems: 'center'}}>
        
         <ImageBackground source = {{uri: this.state.data.photo}} style={styles.picture}>
           <Header navigation={this.props.navigation} />
         </ImageBackground>
         
         <View style={styles.contentContainer}>
           
           <View style={{flex: 1, flexDirection: 'row'}}>
             <View style={{flex: 3, alignItems: 'flex-start', flexDirection: 'column'}}>
             <Text style={styles.placeName}>{this.state.data.name}</Text>

               <View style={{width: '100%', paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', marginTop: 10}}> 
                 <Text style={styles.placeType}>{strings('sight_type.'+this.state.data.type)}</Text>
                 
                 
                 <Image source={strings('sight_type_image.'+this.state.data.type)} 
                 style={{marginLeft: 10, width: 20, height: 20, resizeMode: 'contain'}}/>
                 
               </View>  

               {this.renderAddress()}
               
               
               {this.renderContactInfo()}

             </View>
             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               {this.renderEntrancePrice()}
             </View>
           </View>
           
         </View>

         {this.renderDescription()}

         {this.renderHistory()}
       
        </ScrollView>
        </View>
        );
    }
}