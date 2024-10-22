
/* Styles for screens */

import {StyleSheet} from 'react-native';

const IntroScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },

  buttons: { 
    backgroundColor: "#d6d6d6",
    width: 300, 
    height: 50,
    //marginTop: 40,  
    margin: 10, 
    justifyContent: "center",
    alignItems: "center",
  }, 
  buttonBox: { 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200, 
  }, 
  buttonText: {
    color: "black",
    fontSize: 20, 
    fontWeight: "bold",
  }, 
  buttonPressed: { 
    backgroundColor: "#a0a0a0",
  } ,
});

export default IntroScreenStyles;