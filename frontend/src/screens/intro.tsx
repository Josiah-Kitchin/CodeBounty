
/* The intro screen is the first screen the user sees upon downloading the app
used for logging in and signing up 
*/


import React from 'react'; 
import MainHeader from '../components/headers/main_header';
import { Button, ButtonText } from "@/components/ui/button";
import introScreenStyles from "./styles";
import { View } from "react-native";

const IntroScreenStyles = () => { 
    return (
        <>
            <MainHeader
            mainText="Welcome to Soaker"
            subText="A soaking paring app for mormans"/>

            <View style={introScreenStyles.buttonBox}>
                <Button size="xl" style={introScreenStyles.buttons}>
                    <ButtonText style={introScreenStyles.buttonText}>Log in</ButtonText>
                </Button>

                <Button size="xl" style={introScreenStyles.buttons}> 
                    <ButtonText style={introScreenStyles.buttonText}>Sign Up</ButtonText>
                </Button>
            </View>
        </>
    )
}

export default IntroScreenStyles; 
