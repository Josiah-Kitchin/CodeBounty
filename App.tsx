/*
A dating app written by computer science students Hai Le, Josiah Kitchin and Miro Garcia
at the University of Oregon

*/


import React, {useState} from 'react';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import IntroScreen from './src/screens/intro';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const db = firestore();
const usersCollection = db.collection('users');
usersCollection.add({
  name: 'John Doe',
  age: 30,
  location: 'New York',
  // ... other user data
})
.then(docRef => {
  console.log('Document written with ID:', docRef.id);
})
.catch(error => {
  console.error('Error adding document:', error);
});




const App = () => {
  return <GluestackUIProvider mode="light">
    
    <IntroScreen/>
    
    </GluestackUIProvider>;
}

export default App; 
