// _layout.tsx
import { Stack } from 'expo-router/stack';
import { Provider } from 'react-redux';
import { store } from '../store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(router)" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
}
