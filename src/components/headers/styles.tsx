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
  largeText: { //text for things such as the welcome message 
    fontSize: 70, 
    fontWeight: 'bold',
    color: colors.primary, 
  },
  mediumText: {  //subtext 
    fontSize: 25, 
    paddingTop: 20,
    fontStyle: 'italic', 
  }
});

export default headerStyles;

