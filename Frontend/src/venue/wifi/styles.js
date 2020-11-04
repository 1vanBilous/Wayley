import {StyleSheet} from 'react-native';
export const wifi = StyleSheet.create({
    innerContainer: {
      width: '80%',
      backgroundColor: '#fff',
      zIndex: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      height: 80,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowRadius: StyleSheet.hairlineWidth,
      shadowOffset: {
          height: 30,
      },
      elevation: 4,
    },
    outContainer:{
      width: '100%',
      justifyContent: 'center',
      height: '100%',
    },
    text:{
      fontFamily: 'Roboto-Regular',
      fontSize: 18,
      color: '#000',
    },
    title:{
      fontFamily: 'roboto-bold',
      fontSize: 19,
      color: '#000',
    },
    container: {
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      padding: 5,
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    },
  });