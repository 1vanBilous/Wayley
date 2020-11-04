import React from 'react';
import {StyleSheet, 
        Text, 
        View, 
        Image,
        Modal, 
        AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import {slides} from './slides';
export default class Guide extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            tutorial: false,
        }
    }

    componentWillMount(){
        //for test
        //AsyncStorage.setItem('tutorial', "false", () => {});
        // comment on release
    }

    componentDidMount(){
        //check if tutorial was // maybee to guide module
        AsyncStorage.getItem('tutorial', (err, result) => {
            console.log(result);
            if(result!="true")
                this.setState({tutorial: true});
        });
    }

    _renderItem = props => (
        <View style={[styles.container, {paddingBottom: props.bottomSpacer,width: props.width, height: props.height,}]}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={props.image}/>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
    );

    _onDone = () => {
        AsyncStorage.setItem('tutorial', 'true', () => {
            console.log('tutorial set to true');
        });
        this.setState({tutorial: false});
    }

    _renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="md-arrow-forward"
              color="rgba(255, 255, 255, .9)"
              size={24}
              style={{ backgroundColor: 'transparent' }}
            />
          </View>
        );
    }
    _renderDoneButton = () => {
    return (
        <View style={styles.buttonCircle}>
        <Icon
            name="md-checkmark"
            color="rgba(255, 255, 255, .9)"
            size={24}
            style={{ backgroundColor: 'transparent' }}
        />
        </View>
    );
    }

    render() {
        return (
            <Modal visible={this.state.tutorial}>
                <AppIntroSlider 
                    slides={slides} 
                    onDone={this._onDone}
                    renderDoneButton={this._renderDoneButton}
                    renderNextButton={this._renderNextButton}
                    renderItem={this._renderItem}
                    activeDotStyle = {{backgroundColor: '#5682a3'}}
                />
            </Modal>
        );
    }
}

