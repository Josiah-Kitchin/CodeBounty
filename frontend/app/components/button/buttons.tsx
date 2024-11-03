import { StyleSheet, View, Pressable, Text } from 'react-native';
import colors from '../utils/colors';
import {Link} from 'expo-router';
import {useRouter} from 'expo-router';

type Props = {
  label: string;
  theme: string;
};

/*

export default function Button({ label, theme}: Props) {
  if ( theme === 'signup'){
  return (
    <View style={styles.buttonContainer}>
      <Link href="/signup" style={styles.button}>

        <Pressable style={styles.button}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>

      </Link>
    </View>
  );
  }

  if ( theme === 'login'){
    return (
      <View style={styles.buttonContainer}>
        <Link href="/login" style={styles.button}>

          <Pressable style={[styles.button, {backgroundColor: 'fprimary'}]}>
            <Text style={styles.buttonLabel}>{label}</Text>
          </Pressable>

        </Link>
      </View>
    );
    }

  
}
*/
export default function Button({ label, theme }: Props) {
  const router = useRouter(); 

  const handlePress = () => {
    
    if (theme === 'signup') {
      router.push('/signup'); 
    } else if (theme === 'login') {
      router.push('/login'); 
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={[
          styles.button, 
          {backgroundColor: 'white'}
        ]} 
        onPress={handlePress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,

  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: 'black',
    fontSize: 16,
    alignItems: 'center',
  },
});
