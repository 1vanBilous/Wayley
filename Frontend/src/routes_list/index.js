import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Image,
    Alert,
    TouchableWithoutFeedback,
    ActivityIndicator,
    FlatList,
    Linking, 
    StatusBar,
} from 'react-native';

import Guide from '../guide';
import {styles} from './styles';
import ListItem from './ListItem';
import Vertep from './vertep';
import Header from './Header';
import { strings } from '../locales/i18n';

export default class Routes extends Component<Props> {

     constructor(props){
        super(props)
        this.state = {
            data: [],
            loading: false,
            itemLoading: false,
            city: 'Kharkiv',
            page: 1,
            maxPage: null,

            error: null,
            refreshing: false,
        }
    }

    componentWillMount(){
        this.getData();
    }

    getData(){
        const language = strings('system_translations.language');
        this.setState({ loading: true});
        fetch('https://klugdata.com/api/routes/'+ this.state.city +'/'+ language + '?page=' + this.state.page)
          .then(res => res.json())
          .then(res => {
            this.setState({
              data: [...this.state.data, ...res.data],
              maxPage: res.last_page,
              error: res.error || null,
              loading: false,
              refreshing: false,
            });
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
          console.log('Downloading data from page ' + this.state.page);
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true,
            page: 1,
            data: [],
        }, () => {
            this.getData();
            console.log('refreshing data');
        });
    }

    handleLoadMore = () => {
        if(this.state.page != this.state.maxPage){
            this.setState({
                page: this.state.page + 1,
            }, () => { 
                this.getData();
                console.log('handling more data with page ' + this.state.page);
            });
        }
    }

    renderHeader = () => {
        return (<View style={{marginBottom: 8}}>
        <Header navigation={this.props.navigation} onCity={this.handleRefresh.bind(this)}/>
        <Vertep navigation = {this.props.navigation}/>
        </View>);
    }

    renderFooter = () => {
        if(!this.state.loading) 
            return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={()=> Linking.openURL('https://www.facebook.com/wayleyapp')} >
                        <View style = {styles.social}>
                            <Image source={require('../assets/img/logo_facebook.png')} style={styles.socialLogo} />
                        </View>
                    </TouchableWithoutFeedback>
                    
                    <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('About')} >
                        <Text style = {styles.footer}>  Developer Team 2018  </Text>
                    </TouchableWithoutFeedback>   
                </View>
            );

        return ( 
            <View style={{justifyContent: 'center', alignItems: 'center',}}>
                <ActivityIndicator animating size="large" color="#5682a3"/>
            </View>
        );
    }

    render() {
      return (        
         <View style = {styles.container}>
            <StatusBar
                backgroundColor="#3d5f78"
                barStyle="light-content"
            />
            <Guide/>
            <Image source={require('../assets/img/loadingScreen/loadingscreen.png')} style={{display: 'none'}}/>
            <Image source={require('../assets/img/loadingScreen/loadingGif.gif')} style={{display: 'none'}}/>
            <FlatList
                data={this.state.data}
                keyExtractor={item => item.id}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                style={{width: '100%'}}
                onEndReached={this.handleLoadMore}
                onEndThreshold={0}
                renderItem={({ item }) => (
                        <ListItem
                            name = {item.name}
                            picture={{uri: item.picture}}
                            places = {item.places}
                            distance = {item.distance+' '+ strings('values.km')}
                            navigation = {this.props.navigation}
                            routeNumber = {item.id}
                        />                
                )}
            />     
        </View>
        );
    }
}