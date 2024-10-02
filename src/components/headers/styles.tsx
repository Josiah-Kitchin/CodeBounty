/* Styles for the headers */ 

import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';


const headerStyles = StyleSheet.create({
  container: { //The container is a box that stores the entire element 
    flex: 1,
    alignItems: 'baseline',
    paddingTop: 100, 
    padding: 40, 
  },
  largeText: {
    fontSize: 70, 
    fontWeight: 'bold',
    color: colors.primary, 
  },
  mediumText: { 
    fontSize: 25, 
    paddingTop: 20,
    fontStyle: 'italic', 
  }
});

export default headerStyles;

