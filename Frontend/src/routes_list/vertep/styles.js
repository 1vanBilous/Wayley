import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
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