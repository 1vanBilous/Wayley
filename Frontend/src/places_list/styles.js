import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: 30,
        },
        elevation: 2,
    },
    headerText: {
        marginTop: 15,
        marginLeft: 15,
        fontFamily: 'roboto-bold',
        fontSize: 23,
        color: '#3c4953',
        textAlign: 'left',
    },
});

export const listItemStyles = StyleSheet.create({
    container:{
        flex: 1,
        marginBottom: 12,
    },
    picture:{
        marginTop: 15,
        marginBottom: 8, 
        height: 110,
        resizeMode: 'cover',
        borderRadius: 6,
    },
    type:{

        fontFamily: "roboto-bold",
        fontSize: 12, 
        color: "#5683a4",
    },
    name:{
        marginTop: 1,
        fontFamily: "roboto-bold",
        fontSize: 16,
        color: "#3c4953",
    },

});
