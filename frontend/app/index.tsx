
/* The intro screen is the first screen the user sees upon downloading the app
used for logging in and signing up 
*/


import React from 'react'; 
import MainHeader from '../src/components/headers/main_header';
import { Button, ButtonText } from "@/components/ui/button";
import IntroScreenStyles from "./styles2";
import { Text, View, StyleSheet } from 'react-native';
import {Link} from 'expo-router';
import headerStyles from '../src/components/headers/styles';


export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={headerStyles.mainText}>Freaker</Text>
      <Link href="/signup" style={styles.button}>
        Go to SignUp screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'black',
  },
});
