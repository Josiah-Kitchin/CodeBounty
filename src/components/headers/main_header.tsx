
/* The main header component is to be reused for large text on the screen. 
   This includes the intro, login, etc. */ 

import React from 'react';  
import { View, Text, } from 'react-native';
import headerStyles from './styles';

interface headerProps { 
    mainText: string, 
    subText?: string 
}

const MainHeader: React.FC<headerProps> = ({mainText, subText}) => { 
    return (
        <View style={headerStyles.container}>
            <Text style={headerStyles.largeText}>{mainText}</Text>
            <Text style={headerStyles.mediumText}>{subText}</Text>
        </View>
    )
}

export default MainHeader;


