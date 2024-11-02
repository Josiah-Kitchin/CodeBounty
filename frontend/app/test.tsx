import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import {Link} from 'expo-router';
import colors from './components/utils/colors';
import Button from './components/button/buttons';
import { useState } from 'react';
import { Image } from 'expo-image';



type Props = {

};

const PlaceholderImage = require('@/assets/images/background-image.jpg');

export default function SignUpScreen() {
  

  return (
      
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>
      
      <Link href="/" style={styles.button2}>
        Go Back
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fbackground,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainText: { 
    color: colors.fprimary, 
    fontSize: 60,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 15,
    textAlign: "center",
    marginBottom: 50,
  
  },

  passwordBox: {
    marginTop: 10,
  },

  text: {
    color: 'black',
  },


  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,

  },

  button2: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'black',
    marginTop : 100,
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  buttonLabel: {
    color: 'black',
    fontSize: 16,
    alignItems: 'center',
  },
  
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  
  imageContainer: {
    flex: 1,
  },
   image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
