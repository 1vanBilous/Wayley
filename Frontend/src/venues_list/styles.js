import React from 'react';
import {StyleSheet} from 'react-native';

export const ListItemStyle = StyleSheet.create({
    container:{
        flex: 1,
        marginBottom: 12,
    },
    picture:{
        marginTop: 15,
        marginBottom: 8, 
        alignItems: "flex-end",
        justifyContent: "flex-start",
        height: 110,
        resizeMode: 'cover',
        padding: 0,
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
    discountIcon:{
        height: 30,
        width: 30,
        resizeMode: 'contain',
        padding: 0,
        margin: 10,
    }
});


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
