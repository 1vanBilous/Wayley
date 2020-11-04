import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null, 
    },
    container: {
        flex: 1,
        alignItems: 'center',
        shadowColor: 'black',
        backgroundColor: '#fff',
    },
    footer: {
        width: '100%',
        marginTop: 15,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: '#84a2bc',
        marginBottom: 15,
    },
    social: {
        width: '100%',
        marginTop: 15,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: '#84a2bc',    
    },
    socialLogo:{
        justifyContent: 'center',
        height: 30,
        width: 30,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
});

export const headerStyle = StyleSheet.create({
    headerBlock: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#5682a3',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.75,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: 30,
        },
        elevation: 8,
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#6f95b2',
        width: '95%',
        height: 35,
        borderRadius: 5,
        margin: 10
    },
    searchIcon: {
        padding: 10,
        margin: 5,
        height: 17,
        width: 17,
        resizeMode : 'stretch',
        alignItems: 'center'
    },
    cityPicker:{
        height: '100%',
        width: '75%',
        backgroundColor: '#6f95b2',
        borderWidth: 2,
        paddingBottom: 5,   
        paddingHorizontal: 15,
        marginHorizontal: '5%',
        color: '#e8edf1',
    },
    cityPickerItem:{
        height: 45,
    },
});

export const listItemStyle = StyleSheet.create({
    route: {
        width: '100%',
        fontFamily: 'Roboto-Regular',
        flexDirection: 'column',
        marginBottom: 8,
    },
    image: {
        height: 200,
        marginHorizontal: 15,
        borderRadius: 6,
        resizeMode: 'cover',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',  
    },
    
    placesCountContainer:{
        backgroundColor: 'rgba(0,0,0,0.65)',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 75,
        borderRadius: 6,
        marginBottom: 15,
        marginRight: 15,

    },
    placesCountImage:{
        resizeMode: 'contain',
        width: 30,
        height: 30,
        marginRight: 8,
    },
    placesCountText: {
        fontSize: 23,
        fontFamily: 'roboto-bold',
        color: '#fff'
    },
    name: {
        marginTop: 10,
        fontFamily: 'roboto-bold',
        fontSize: 25,
        color: '#3c4953',
        textAlign: 'left',
    },
    places: {
        marginTop: 5,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#5683a4',
        textAlign: 'left',
        flexDirection: 'row',
    },
    lenght: {
        marginTop: 7,
        fontFamily: 'roboto-bold',
        fontSize: 16,
        color: '#3c4953',
        textAlign: 'left',
        marginBottom: 30,
    },

});
