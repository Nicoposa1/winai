// _layout.tsx
import { Stack } from 'expo-router/stack';
import { Provider } from 'react-redux';
import { store } from '../store';


export default function Layout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(router)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
