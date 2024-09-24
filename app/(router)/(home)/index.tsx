import { useNavigation } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Tab() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Tab Home</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('wines' as never);
        }}
      >
        <Text>Wines</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
