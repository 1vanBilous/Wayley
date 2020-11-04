import {StyleSheet} from 'react-native';
  
export const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: null,
      height: null, 
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    padding: 5,
  }, 
   picture: {
      width: '100%',
      height: 230,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
   },
   placeName: {
      fontFamily: 'Roboto-Thin',
      fontSize: 25,
      alignSelf: 'flex-start',
      color: '#000',
      marginTop: 10,
      marginLeft: 10,
   },
   placeType: {
    fontFamily: 'roboto-bold',
    fontSize: 18,
    alignSelf: 'center',
    color: '#000',
  },
   placeAddress: {
      fontFamily: 'Roboto-Regular',
      fontSize: 18,
      alignSelf: 'flex-start',
      color: '#000',
      marginTop: 10,
      marginLeft: 10,
   },
   blockHeader: {
      fontFamily: 'Roboto-Regular',
      fontSize: 18,
      textAlign: 'center',
      color: '#000',
      marginBottom: 4,
   },
   reviewButton:{
        padding: 10,
        backgroundColor: '#5682a3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
   },
});

export const reviewListItem = StyleSheet.create({
    itemBlock: {
        flex: 1,
        flexDirection: 'column',
        width: '90%',
        marginBottom: 8,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    stars: {
        width: '50%',
        alignItems: 'flex-start',
        marginTop: 8,
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: '#000',
        marginTop: 8,
    },
    date:{
        textAlign: 'right',
        fontSize: 13,
        color: '#a8a8a8',
        marginTop: 10,
    },
});

export const contactStyles = StyleSheet.create({
    contactButtons:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff',
        borderRadius:15,
        paddingVertical: 3,
        paddingHorizontal: 10,
        marginTop: 5,
        borderColor: '#5682a3',
        borderWidth: 1,
    },
    contactLink:{
     flexDirection: 'row', 
     justifyContent: 'center', 
     alignItems: 'center', 
     backgroundColor: '#fff',
     borderRadius:15,
     paddingVertical: 3,
     paddingHorizontal: 10,
     marginTop: 5,
    },
    contactText:{
     fontFamily: 'Roboto-Regular',
     fontSize: 18,
     textAlign: 'center',
     color: '#000',
    },
    contactIcon:{
     width: 20, 
     height: 20, 
     resizeMode: 'contain', 
     marginRight: 4,
    },
   });