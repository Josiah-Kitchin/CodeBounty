
/* The intro screen is the first screen the user sees upon downloading the app
used for logging in and signing up 
*/


import React from 'react'; 
import MainHeader from './components/headers/main_header';
//import { Button, ButtonText } from "@/components/ui/button";
import IntroScreenStyles from "./styles2";
import { Text, View, StyleSheet, Animated } from 'react-native';
import {Link} from 'expo-router';
import headerStyles from './components/headers/styles';
import Button from './components/button/buttons';
import LinearGradient from 'react-native-linear-gradient';
import { useRef, useEffect } from 'react';
import colors from './components/utils/colors';


export default function Index() {

  return (
    <View style={styles.container}>
    <View style={styles.box} />

      <View style={styles.textContainer}>
        <Text style={styles.leftText}>Swi</Text>
        <Text style={styles.rightText}>tch</Text>
      </View>
      <View style={styles.footerContainer}>
        <Button theme="signup" label="Sign Up"/>        
        <Button theme="login" label="Login"/>
      </View>
    </View>
  );
  
 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },

  button: {
    fontSize: 20,
    marginTop: 10,
    textDecorationLine: 'underline',
    color: 'black',
  },
  
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },

  textContainer: {
    flexDirection: 'row', // Arrange text halves in a row
  },
  leftText: {
    color: colors.primary, 
    fontSize: 60,
    fontWeight: "bold",
    marginTop: 100,
    textAlign: "center" // Color for the first half
  },
  rightText: {
    color: colors.fprimary, 
    fontSize: 60,
    fontWeight: "bold",
    marginTop: 100,
    textAlign: "center" // Color for the second half
  },

  box: {
    position: 'absolute', // Positioning the box absolutely
    top: 0, // Start from the top
    right: 0, // Align to the right
    width: '49%', // Cover half the width of the screen
    height: '100%', // Cover the full height of the screen
    backgroundColor: colors.fbackground, // Background color for the box
    zIndex: -1,

  }
  
});
