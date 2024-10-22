import { Text, View, StyleSheet } from 'react-native';
import {Link} from 'expo-router';
import colors from '../src/utils/colors';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Sign Up Screen</Text>
      <Link href="/" style={styles.button}>
        Go Back
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: { 
    color: colors.primary, 
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 15,
    textAlign: "center"
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



