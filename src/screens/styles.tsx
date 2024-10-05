
/* Styles for screens */

import {StyleSheet} from 'react-native';
import colors from '../utils/colors';


const introScreen = StyleSheet.create({

  buttons: { 
    backgroundColor: "#d6d6d6",
    width: 300, 
    height: 50,  
    margin: 10
  }, 
  buttonBox: { 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 150, 
  }, 
  buttonText: {
    color: "black"
  }, 
  buttonPressed: { 
    backgroundColor: "#a0a0a0",
  } 
});

export default introScreen;
