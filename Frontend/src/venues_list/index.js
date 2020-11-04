import React, { Component } from 'react';
import {StyleSheet, Text, View, List, ScrollView, AsyncStorage, FlatList, Alert, ActivityIndicator, StatusBar} from 'react-native';
import ListItem from './ListItem';
import { strings } from '../locales/i18n';
import {styles} from './styles';

export default class Venues extends Component<Props> {

    constructor(props){
        super(props)
        this.state = {
            data: [],
            loading: false,
            city: 'Kharkiv',
            items: 8,
            page: 1,

            error: null,
            refreshing: false,
        }
    }

    componentWillMount(){
            //this.props.navigation.navigate('Venue', {itemId: 12})
            this.getPlacesFromApiAsync();
    }

    getPlacesFromApiAsync(){
        const { items, page } = this.state;
        const url = 'https://klugdata.com/api/venues_list/'+ this.state.city +'/' + strings('system_translations.language') + '/' + items + '?page=' + page;
        this.setState({ loading: true });
        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              data: [...this.state.data, ...res.data],
              error: res.error || null,
              loading: false,
              refreshing: false
            });    
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1,
        }, () => { 
            this.getPlacesFromApiAsync()
        });
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true,
            page: 1,
            data: [],
        }, () => {
            this.getPlacesFromApiAsync()
        });
    }

    renderHeader = () => {
        return (<Text style={styles.headerText}> {strings('venues.header')} </Text>);
    }

    renderFooter = () => {
        if(!this.state.loading) return null;
        return ( 
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator animating size="large" color="#5682a3"/>
            </View>
        );
    }

    render() {
      return (
        <View style = {styles.container}>
            <StatusBar
                backgroundColor="#36434b"
                barStyle="light-content"
            />
            
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
                horizontal={false}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <ListItem
                        id = {item.id}
                        index = {index}
                        type = {item.category}
                        price = {item.price}
                        name = {item.name}
                        discount = {item.discount}
                        picture = {{uri: item.picture}}
                        navigation = {this.props.navigation}
                    />
                )}
            />     
        </View>
        );
    }
}