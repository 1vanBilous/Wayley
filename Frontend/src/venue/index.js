import React, { Component } from 'react';
import {Text, 
        View, 
        AsyncStorage, 
        ImageBackground, 
        Image, 
        TouchableHighlight, 
        Keyboard, 
        FlatList, 
        Alert, 
        TouchableWithoutFeedback, 
        Modal, 
        TextInput, 
        TouchableOpacity,
        ScrollView,
        Dimensions
} from 'react-native';
import Header from '../header';
import LoadingScreen from '../loadingScreen';
import Contacts from './Contacts'; 
import Discount from './discount'; 
import Description from './fest'; 
import Review from './review';
import {Wifi, WifiButton} from './wifi'; 
import Price from './price';
import CategorySwiper from './categorySwiper';  
import ReviewListItem from './ReviewListItem';
import DeviceInfo from 'react-native-device-info';

import {strings} from '../locales/i18n';

import {styles} from './styles';

var {height, width} = Dimensions.get('window');

export default class Venue extends Component<Props> {

    constructor(props){
      super(props)
      this.state = {
        data: [],
        latitude: 0,
        longitude: 0,
        loading: false, 
        reviewsDataRefreshing: false,
        reviewsDataLoading: false,
        reviewsData: [],
        reviewsDataPage: 1,
        reviewsMaxDataPage: null,
        isReview: false,
        reviewModal: false,
        discountModal: false,
        wifiModal: false,
        discountProgress: null,
        discountData: [],
        error: null,
      }
    }

    componentWillMount(){
      this.getPlaceFromApiAsync();
      this.getReviewInfo();   
      this.getReviews();  
    }

    getReviews() {
      fetch('https://klugdata.com/api/venue/reviews/'+this.props.navigation.state.params.itemId + '?page=' + this.state.reviewsDataPage)
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
              reviewsData: [...this.state.reviewsData, ...responseJson.data],
              reviewsMaxDataPage: responseJson.last_page,
              error: responseJson.error || null,
              reviewsDataLoading: false,
              reviewsDataRefreshing: false,
          });
      })
      .catch((error) => {
        this.setState({ error, reviewsDataLoading: false });
      });
    }

    reviewCloseModal(message){
      this.setState({reviewModal: false});
      if(message=='sent')
        this.setState({isReview: true});
    }

    discountCloseModal(message){
      this.setState({discountModal: false});
    }

    discountOpenModal(message){
      this.setState({discountModal: true});
    }

    wifiCloseModal(message){
      this.setState({wifiModal: false});
    }

    wifiOpenModal(message){
      this.setState({wifiModal: true});
    }

    discountSaveProgressState(progress, data){
      this.setState({discountProgress: progress, discountData: data});
    }

    getReviewInfo() {
      fetch('https://klugdata.com/api/venue/review/'+this.props.navigation.state.params.itemId+'/'+DeviceInfo.getUniqueID())
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            isReview: responseJson.reviewed, 
          });
      })
      .catch((error) => {
        console.error(error);
      });
    }

    getPlaceFromApiAsync() {
      this.setState({ loading: true });
      fetch('https://klugdata.com/api/venue/'+this.props.navigation.state.params.itemId+'/'+strings('system_translations.language'))
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            data: responseJson, 
            loading: false,
          });
          console.log(typeof responseJson.tags);
          console.log('response: ', responseJson.tags);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    handleLoadMoreReviews = () => {
      if(this.state.reviewsDataPage != this.state.reviewsMaxDataPage){
          this.setState({reviewsDataPage: this.state.reviewsDataPage + 1}, () => { 
              this.getReviews();
              console.log('handling more data with page ' + this.state.reviewsDataPage);
          });   
      }
    }
    
    render() {
      return (
         <ScrollView contentContainerStyle = {styles.container}>
            <View style={{backgroundColor: '#fff', width: '100%'}}>
              <Modal visible={this.state.loading}>
                <LoadingScreen/>
              </Modal>
              <Modal visible={this.state.reviewModal} animationType="slide" onRequestClose={()=>this.setState({reviewModal: false})}>
                <Review closeModal = {this.reviewCloseModal.bind(this)} itemId={this.props.navigation.state.params.itemId}/>       
              </Modal>
              <Modal visible={this.state.discountModal} animationType="slide" onRequestClose={()=>this.setState({discountModal: false})} transparent>
                <Discount data={this.state.data} closeModal={this.discountCloseModal.bind(this)} saveState = {this.discountSaveProgressState.bind(this)} progress={this.state.discountProgress} discountData={this.state.discountData}/>       
              </Modal>
              <Modal visible={this.state.wifiModal} animationType="slide" onRequestClose={()=>this.setState({wifiModal: false})} transparent>
                <Wifi data={this.state.data}  closeModal = {this.wifiCloseModal.bind(this)}/>       
              </Modal>

              <ImageBackground source = {{uri: this.state.data.picture}} style={styles.picture}>
                <Header navigation={this.props.navigation} />
              </ImageBackground>
              
              <View style={styles.contentContainer}> 
                    <Text style={styles.placeName}>{this.state.data.nameLat}</Text>

                    <View style={{width: '100%', paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', marginTop: 10, flexWrap: "wrap"}}> 
                      <Text style={styles.placeType}>{strings('venues.'+this.state.data.category)}</Text>  
                      <Price data={this.state.data} openModal={this.discountOpenModal.bind(this)}/>
                    </View>  

                    {this.state.data.address ? <Text style={styles.placeAddress}>{this.state.data.address}</Text> 
                    : null}
                    <Contacts 
                      navigation={this.props.navigation} 
                      website={this.state.data.website}
                      phone={this.state.data.phone}
                      latitude={this.state.data.latitude}
                      longitude={this.state.data.longitude}
                    />
              </View>

            {/*<WifiButton openModal={this.wifiOpenModal.bind(this)} /> */}
            <View style={{width: '85%', height: 1, borderTopColor: '#d5d5d5', borderTopWidth: 1, alignSelf: 'center', marginVertical: 10}}/>
            
            {!this.state.loading ? 
                this.state.data.tags ?
                  <CategorySwiper tags={this.state.data.tags} /> 
                : null 
             : null}
            {this.state.data.tags ? 
              <View style={{width: '85%', height: 1, borderTopColor: '#d5d5d5', borderTopWidth: 1, alignSelf: 'center', marginVertical: 10}}/>
            : null }

            {(this.props.navigation.state.params.shedule || this.props.navigation.state.params.description || this.props.navigation.state.params.trait || this.props.navigation.state.params.program) ? 
              <Description 
                shedule={this.props.navigation.state.params.shedule}
                description={this.props.navigation.state.params.description} 
                trait={this.props.navigation.state.params.trait}
                program={this.props.navigation.state.params.program}
              />
            : null}
            
            <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff', paddingBottom: 10,}}>

              {!this.state.isReview ? 
              <View style={{marginTop: 15, alignItems: 'center', justifyContent: 'center', marginBottom: 15,}}>
                <TouchableWithoutFeedback onPress={()=>{this.setState({reviewModal: true})} } style={{}}>
                  <View style={styles.reviewButton}>
                  <Text style={{color: '#fff', fontFamily: 'Roboto-Regular', fontSize: 17,}}>
                  {strings('review.leave_review')}
                  </Text></View>
                </TouchableWithoutFeedback>
              </View> 
              : 
              <View style={{marginTop: 15, alignItems: 'center', justifyContent: 'center', marginBottom: 15,}}>
                  <Text style={{color: '#08aed2', fontFamily: 'Roboto-Regular', fontSize: 15, }}>
                  {strings('review.thank_you')}
                  </Text>
              </View> 
              }

            </View>
          
            </View>
            <FlatList
                data={this.state.reviewsData}
                keyExtractor={item => item.id}
                refreshing={this.state.reviewsDataRefreshing}
                style={{width: '100%'}}
                onEndReached={this.handleLoadMoreReviews}
                onEndThreshold={0}
                renderItem={({ item }) => (
                        <ReviewListItem
                            stars = {item.rating}
                            text = {item.review_text}
                            date = {item.dateOfReview}
                            navigation = {this.props.navigation}
                        />                
                )}
            />     
        </ScrollView>
        
        );
    }
}


