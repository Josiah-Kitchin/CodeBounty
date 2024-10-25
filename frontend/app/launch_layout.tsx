import { Stack } from 'expo-router';
/*
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="intro" options={{ title: 'intro' }} />
      <Stack.Screen name="signup" options={{ title: 'signup' }} />
    </Stack>
  );
}
*/

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="intro" options={{ title: 'intro' }} />
      <Stack.Screen name="signup" options={{ title: 'signup' }} />
      <Stack.Screen name="login" options={{ title: 'login' }} />
    </Stack>
  );
}