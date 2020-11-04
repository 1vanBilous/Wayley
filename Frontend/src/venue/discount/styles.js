import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  outContainer:{
    width: '100%',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  innerContainer: {
    marginTop: "10%",
    width: '80%',
    backgroundColor: '#fff',
    zIndex: 20,
    alignItems: 'center',
    borderRadius: 17,
  },
  startButton:{
    width: "60%",
    marginVertical: 20,
    alignSelf: "center",
    padding: 10,
    backgroundColor: '#5682a3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    paddingHorizontal: 20,
  },
  text:{
    marginTop: 5,
    color: "#36434b",
    fontSize: 17,
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  image:{
    width: "100%",
    height: 200,
    resizeMode: "contain",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  discountExplain:{
    backgroundColor: 'rgba(0,0,0,0.5)', 
    height: 50, 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 18
  },
  agreementLink:{
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#84a2bc',
    paddingVertical: 10, 
  },
  discountBox:{
    width: '100%',
    backgroundColor: "#6cc7d6",
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#0b6273",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  }
});