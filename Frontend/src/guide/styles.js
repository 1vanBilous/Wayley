import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({   
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    imageContainer:{
        backgroundColor: '#5682a3',
        flex: 7,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        resizeMode: 'contain',
        height: '85%',
    },
    contentContainer:{
        width: '100%',
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#3c4953',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        paddingHorizontal: 16,
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});