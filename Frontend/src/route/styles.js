import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');
const { height: viewportHeight } = Dimensions.get('window');
const mapHeight = height;
const slideHeight = viewportHeight * 0.30;
const vHeight = viewportHeight - slideHeight-70;

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
      },
  map: {
    width: '100%',
    zIndex: -1,
    height: mapHeight, 
    paddingTop: 1, 
  },
  findMe: {
    position: 'absolute',
    top: vHeight,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    bottom: 6,
    paddingHorizontal: 5,
    paddingTop: 2,
  },
  findMeButton: {
    backgroundColor: '#fff',
    borderRadius: 50, 
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
        height: 20,
    },
    elevation: 6
  }
});

export const guidebutton = StyleSheet.create({
  container: {
      width: '20%',
      flexDirection: 'row',
      alignSelf: 'flex-end',
      height: 70,
      backgroundColor: 'rgba(0,0,0,0)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  touchzone: {
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%',
  },
  button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'rgba(0,0,0,0.2)'
  },
  arrow: { 
      height: 20,
      width: 20,
      resizeMode: 'contain',
  },
});
