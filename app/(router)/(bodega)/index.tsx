import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import Markdown from 'react-native-markdown-display';
import { ButtomWineColor } from '../../../components/ButtomWineColor';
import { postContent } from '../../../services/geminiApiServices';
import { Colors } from '../../../utils/Colors';

export default function Tab() {
  const mockData = [
    {
      id: 1,
      name: 'Wine 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description of wine 1',
    },
    {
      id: 2,
      name: 'Wine 2',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description of wine 2',
    },
    {
      id: 3,
      name: 'Wine 3',
      image: 'https://via.placeholder.com/150',
      description: 'This is a description of wine 3',
    },
  ]
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.secondary,
        }}
      >

        <FlatList
          data={mockData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          style={{ width: '100%', padding: 10, }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={{ marginTop: 10, color: 'black' }} >{item.name}</Text>
              <Markdown>{item.description}</Markdown>
            </View>
          )}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  item: {
    margin: 10,
    padding: 10,
    backgroundColor: Colors.nonary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 175,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cambia la opacidad y el color según tus necesidades
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Asegura que coincida con el borde redondeado de la imagen
  },
})