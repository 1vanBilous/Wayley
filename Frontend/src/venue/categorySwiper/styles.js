import {StyleSheet} from 'react-native';
  
export const styles = StyleSheet.create({

});

export const item = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    item: {
        width: 60,
        height: 60,
        margin: 10,
        //backgroundColor: '#5682a3',
        backgroundColor: '#ab4945',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        resizeMode: 'contain',
        width:  30, 
        height: 30,
    },
    text:{
        color: '#5682a3',
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        width: 90,
        alignSelf: 'center',
        textAlign: 'center',
    },
});
