import {StyleSheet, Dimensions} from 'react-native';

const { height: viewportHeight } = Dimensions.get('window');
const vHeight = viewportHeight * 0.75;
const MapHeight = viewportHeight - 75;

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
      },
  map: {
    width: '100%',
    zIndex: -1,
    height: MapHeight, 
    paddingTop: 1, 
  },

  findMe: {
    position: 'absolute',
    top: vHeight,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    bottom: 10,
    zIndex: 1000,
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

export const mapHeaderStyle = StyleSheet.create({
    headerBlock: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#5682a3',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: 30,
        },
        elevation: 10,
    },
    backArrow: {
    
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    logo: {
        justifyContent: 'center',
        height: 35,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    customLogo: {
        justifyContent: 'center',
        alignSelf: 'center',
        resizeMode: 'contain',
    }
});

