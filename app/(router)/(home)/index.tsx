import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import Markdown from 'react-native-markdown-display';
import { ButtomWineColor } from '../../../components/ButtomWineColor';
import { postContent } from '../../../services/geminiApiServices';
import { Colors } from '../../../utils/Colors';


const windowWidth = Dimensions.get('window').width;


export default function Tab() {
  const [image, setImage] = React.useState<string | null>(null);
  const [responseText, setResponseText] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  console.log("🚀 ~ Tab ~ loading:", loading)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePostContent = async () => {
    setLoading(true);
    await postContent(image, setResponseText); // Llama a la función del servicio
    setLoading(false);
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>

        {image && (
          <View style={{ position: 'relative', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
            <Image source={{ uri: image }} style={styles.image} />
            {loading && (
              <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}
          </View>
        )}
        <View style={{ marginTop: 10, flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
          {image && (
            <ButtomWineColor
              text="Analizar imagen con IA"
              onPress={handlePostContent}
              loading={loading}
              style={{ width: '48%', marginHorizontal: 10 }} // Ocupa el 50% menos el margen
            />
          )}
          <ButtomWineColor
            text="Escogé una imagen de tu galería"
            onPress={pickImage}
            style={{ width: '48%', marginHorizontal: 10 }} // Ocupa el 50% menos el margen
          />
        </View>


        <View style={{ marginTop: 10, width: windowWidth * 0.9}}>
          <ButtomWineColor
            text="Agregar a bodega"
            onPress={() => { }}
          />
        </View>
      </View>
      {responseText && (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <Markdown >
            {responseText}
          </Markdown>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  image: {
    width: windowWidth * 0.9, // 90% del ancho de la pantalla
    height: windowWidth * 0.9, // Mantén proporción cuadrada
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
    borderRadius: 10,
  },
  scrollView: {
    flex: 1, // Asegura que el ScrollView ocupe el espacio restante
    width: '90%',
    marginTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
  markdown: {
    paddingBottom: 20,
    color: Colors.grayDark,
  },
});
