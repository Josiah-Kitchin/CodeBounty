/*
A dating app written by computer science students Hai Le, Josiah Kitchin and Miro Garcia
at the University of Oregon

*/


import React, {useEffect} from 'react';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import IntroScreen from './src/screens/intro';
import { supabase } from './supabaseConfig';



const App = () => {

  useEffect(() => {
    const insertData = async () => {
      const { data, error } = await supabase
        .from('test_table')
        .insert([{ id: 1 }]);

      if (error) console.log('Error inserting data:', error);
      else console.log('Inserted data:', data);
    };

   insertData();
  }, []);

  return <GluestackUIProvider mode="light">
    
   <IntroScreen/>
    
    </GluestackUIProvider>;
}

export default App; 
