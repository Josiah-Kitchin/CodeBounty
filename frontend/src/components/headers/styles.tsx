/* Styles for the headers */ 

import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';


const headerStyles = StyleSheet.create({
  
  container: {  
    flex: 1,
    alignItems: 'baseline',
    paddingTop: 100, 
    padding: 40, 
  },
  mainText: { 
    color: colors.primary, 
    fontSize: 60,
    fontWeight: "bold",
    marginTop: 100,
    marginHorizontal: 15,
    textAlign: "center"
  }, 
  subText: { 
    color: "black", 
    fontSize: 25,
    marginTop: 10,
    marginBottom: 50,
    marginHorizontal: 20,
    fontStyle: "italic",
    alignItems: "center",
    textAlign: "center"

  },
});

export default headerStyles;

