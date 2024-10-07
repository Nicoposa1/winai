import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Dimensions, Animated, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import Markdown from 'react-native-markdown-display';
import { ButtomWineColor } from '../../../components/ButtomWineColor';
import { postContent } from '../../../services/geminiApiServices';
import { Colors } from '../../../utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { addWine, setWine, setWines } from '../../../store/slice/wineSlice';
import { Wine } from '../../../interface/wine';

const windowWidth = Dimensions.get('window').width;
const imageSize = windowWidth * 0.9;

export default function Tab() {
  const dispatch = useDispatch();
  const [image, setImage] = React.useState<string | null>(null);
  const [responseText, setResponseText] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [wineName, setWineName] = React.useState('');
  const { wine } = useSelector((state: { wine: { wine: Wine } }) => state.wine);
  console.log("🚀 ~ Tab ~ wine:", wine)
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
    await postContent(image, setResponseText);
    setLoading(false);
  };
  const scanLinePosition = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    setWineName('');
    if (responseText) {
      const match = responseText.match(/\*\*(.*?)\*\*/);
      if (match && match[1]) {
        setWineName(match[1].trim());
      }
    }
  }, [responseText]);

  const dispatchWine = () => {
    if (responseText) {
      dispatch(addWine({
        id: Math.floor(Math.random() * 100) + 1,
        name: wineName,
        image: image,
        description: responseText,
      }));
    }
  };

  React.useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLinePosition, {
            toValue: imageSize - 10,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLinePosition, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scanLinePosition.stopAnimation();
    }
  }, [loading]);


  // create mock data with 10 wines to show in the list and phto to show in the image
  const mockWines = [
    {
      id: 1,
      name: 'Wine 1',
      image: 'https://via.placeholder.com/150',
      description: 'This is the description of the wine 1',
    },
    {
      id: 2,
      name: 'Wine 2',
      image: 'https://via.placeholder.com/150',
      description: 'This is the description of the wine 2',
    },
    {
      id: 3,
      name: 'Wine 3',
      image: 'https://via.placeholder.com/150',
      description: 'This is the description of the wine 3',
    },
    {
      id: 4,
      name: 'Wine 4',
      image: 'https://via.placeholder.com/150',
      description: 'This is the description of the wine 4',
    },
    {
      id: 5,
      name: 'Wine 5',
      image: 'https://via.placeholder.com/150',
      description: "This is the description of the wine 5",
    },
    {
      id: 6,
      name: 'Wine 6',
      image: 'https://via.placeholder.com/150',
      description: 'This is the description of the wine 6',
    },
    {
      id: 7,
      name: 'Wine 7',
      image: 'https://via.placeholder.com/150',
      description: 'This is the description of the wine 7',
    },
    {
      id: 8,
      name: 'Wine 8',
      image: 'https://via.placeholder.com/150',
      description: 'This is the description of the wine 8',
    },
    {
      id: 9,
      name: 'Wine 9',
      image: 'https://via.placeholder.com/150',
      description: 'This is the description of the wine 9',
    },
    {
      id: 10,
      name: 'Wine 10',
      image: 'https://via.placeholder.com/150',
      description: 'This is the description of the wine 10',
    },
  ];


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.carbonGray,
            marginVertical: 10,
            textAlign: 'left',
            marginLeft: 10,
          }}
        >
          Wine
        </Text>
        <FlatList
          data={mockWines}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                // dispatch(setWine(item));
              }}
            >
              <View style={{ margin: 10 }}>
                <Image source={{ uri: item.image }} style={{ width: 200, height: 150, borderRadius: 10 }} />
                <Text style={{ color: Colors.carbonGray, marginTop: 5, textAlign: 'center' }}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={{ alignItems: 'center' }}>
          {image && (
            <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>
              <Image source={{ uri: image }} style={styles.image} />
              {loading && (
                <View style={styles.overlay}>
                  <Animated.View
                    style={[
                      styles.scanLine,
                      {
                        transform: [{ translateY: scanLinePosition }],
                      },
                    ]}
                  />
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
                style={{ width: '48%', marginHorizontal: 10 }}
              />
            )}
            <ButtomWineColor
              text="Escogé una imagen de tu galería"
              onPress={pickImage}
              style={{ width: '48%', marginHorizontal: 10 }}
            />
          </View>

          {image && (
            <View style={{ marginTop: 10, width: windowWidth * 0.9 }}>
              <ButtomWineColor
                text="Agregar a bodega"
                onPress={() => {
                  dispatchWine();
                }}
              />
            </View>
          )}
        </View>
        {responseText && (
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: Dimensions.get('window').height * 0.3,
            }}
          >
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
            >
              <Markdown >
                {responseText}
              </Markdown>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  image: {
    width: imageSize, // 90% del ancho de la pantalla
    height: imageSize, // Mantén proporción cuadrada
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cambia la opacidad y el color según tus necesidades
    borderRadius: 10,
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 4, // Grosor de la línea de escaneo
    backgroundColor: '#00FF00', // Color de la línea de escaneo (verde)
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
