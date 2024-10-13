/*
A dating app written by computer science students Hai Le, Josiah Kitchin and Miro Garcia
at the University of Oregon

*/


import React, {useEffect} from 'react';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import IntroScreen from './src/screens/intro';





const App = () => {

  //This is all just to test the database, from chat gpt. But this database is what we will use for login 
  // and authentication. will be working more on this soon 

  return (
  <GluestackUIProvider mode="light">
    
    <IntroScreen/>
    
  </GluestackUIProvider>);
}

export default App; 
