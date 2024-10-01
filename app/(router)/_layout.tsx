import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '../../utils/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: {
          backgroundColor: Colors.cuaternary,
          borderTopWidth: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          position: 'absolute',
        },
      }}
      initialRouteName='(home)'
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome5 name="wine-glass" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(bodega)"
        options={{
          title: 'Bodega',
          tabBarIcon: ({ color }) => <FontAwesome6 name="wine-bottle" size={24} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
