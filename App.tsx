/*
A dating app written by computer science students Hai Le, Josiah Kitchin and Miro Garcia
at the University of Oregon

*/


import React, {useState} from 'react';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import IntroScreen from './src/screens/intro';


const App = () => {
  return <GluestackUIProvider mode="light">
    
    <IntroScreen/>
    
    </GluestackUIProvider>;
}

export default App; 
