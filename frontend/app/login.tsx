import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import {Link} from 'expo-router';
import colors from './components/utils/colors';
import Button from './components/button/buttons';
import { useState } from 'react';

type Props = {

  URL: string
};

export default function SignUpScreen({URL}: Props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const UserData = {
    email : email,
    password : password

  }


  const handlePress = async() => {
    console.log('Email:', email);
    console.log('Password:', password);
    const URL = 'https://master-hen-vastly.ngrok-free.app/api/users/login'

    try{

      const response = await fetch(URL, {method : 'POST', headers : {'Content-Type': 'application/json'}, body: JSON.stringify(UserData)}); 

    

      if (!response.ok){
          //console.error(response.error);
          
          throw new Error ("did not work");

          

      }

      console.log("Login");

    }catch(error){

      console.log(error)
        console.error("Failed logging In");
    }
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Log In!</Text>
      <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />

      <Text style={styles.text}>Enter email</Text>
      <TextInput
        style={styles.input} 
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        //secureTextEntry={true}
      />
      <Text style={styles.text}>Enter password</Text>
      
      
      <View style={styles.buttonContainer}>
      <Pressable
          style={[styles.button, { backgroundColor: 'white' }]}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
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
});



