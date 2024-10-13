
/* Styles for screens */

import {StyleSheet} from 'react-native';


const introScreen = StyleSheet.create({

  buttons: { 
    backgroundColor: "#d6d6d6",
    width: 300, 
    height: 50,  
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
  } 
});

export default introScreen;
