import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Dimensions, Animated, FlatList, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { ButtomWineColor } from '../../../components/ButtomWineColor';
import { postContent } from '../../../services/geminiApiServices';
import { Colors } from '../../../utils/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { addWine, setWine, setWines } from '../../../store/slice/wineSlice';
import { Wine } from '../../../interface/wine';
import WebView from 'react-native-webview';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

export default function Tab() {
  const { wines } = useSelector((state: { wine: { wines: Wine[] } }) => state.wine);
  const [showWebView, setShowWebView] = React.useState(false);
  const [webViewUrl, setWebViewUrl] = React.useState('');

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = React.useMemo(() => ['90%'], []);

  // callbacks
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // create mock data with 10 wines to show in the list and phto to show in the image
  const mockWines = [
    {
      id: 1,
      name: 'Wine 1',
      image: require('../../../assets/cata2.jpeg'),
      description: 'This is the description of the wine 1',
      url: 'https://www.eventbrite.com.ar/e/feria-de-vinos-en-grand-brizo-buenos-aires-tickets-1013131853647?aff=ebdssbdestsearch',
    },
    {
      id: 2,
      name: 'Wine 2',
      image: require('../../../assets/cata.jpeg'),
      description: 'This is the description of the wine 2',
      url: 'https://www.eventbrite.com.ar/e/cieg-a-catas-vino-y-madera-tickets-1035064675307?aff=ebdssbdestsearch',

    },
    {
      id: 3,
      name: 'Wine 3',
      image: require('../../../assets/expo-vino.png'),
      description: 'This is the description of the wine 3',
      url: 'https://www.eventbrite.com.ar/e/feria-de-vinos-en-grand-brizo-buenos-aires-tickets-1013131853647?aff=ebdssbdestsearch',
    },
  ];

  const mockTiendas = [
    {
      id: 1,
      name: 'Momentos',
      image: require('../../../assets/vinoteca.png'),
      description: 'This is the description of the wine 1',
      url: 'https://vinotecamomentos.com.ar/',
    },
    {
      id: 2,
      name: 'Ligier',
      image: require('../../../assets/vinoteca2.jpg'),
      description: 'This is the description of the wine 2',
      url: 'https://www.eventbrite.com.ar/e/cieg-a-catas-vino-y-madera-tickets-1035064675307?aff=ebdssbdestsearch',

    },
    {
      id: 3,
      name: 'Wine 3',
      image: require('../../../assets/expo-vino.png'),
      description: 'This is the description of the wine 3',
      url: 'https://www.eventbrite.com.ar/e/feria-de-vinos-en-grand-brizo-buenos-aires-tickets-1013131853647?aff=ebdssbdestsearch',
    },
  ];

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          horizontal={false}
          style={{
            width: '100%',
            padding: 10,
          }}
        >

          <Text
            style={{
              color: Colors.carbonGray,
              fontSize: 18,
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 10,
              fontWeight: 'bold',
            }}
          >Mis vinos</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity>
              <Image
                source={require('../../../assets/add.png')}
                style={{
                  width: 120, // 90% del ancho de la pantalla
                  height: 120, // Mantén proporción cuadrada
                  borderRadius: 10,
                }}
              />
              <Text style={{
                color: Colors.carbonGray,
                fontSize: 18,
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
                Agregar vino
              </Text>
            </TouchableOpacity>
            <FlatList
              data={wines}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                  }}
                >
                  <View style={{ margin: 10 }}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={{ color: Colors.carbonGray, marginTop: 5, textAlign: 'center' }}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <Text
            style={{
              color: Colors.carbonGray,
              fontSize: 18,
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 10,
              fontWeight: 'bold',
            }}
          >Eventos</Text>
          <FlatList
            data={mockWines}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handlePresentModalPress();
                  setWebViewUrl(item.url);
                  setShowWebView(true);
                }}
              >
                <View style={{ margin: 10 }}>
                  <Image source={item.image} style={{
                    width: Dimensions.get('window').width - 100,
                    height: 150,
                    borderRadius: 10,
                  }} />
                  <Text style={{ color: Colors.carbonGray, marginTop: 5, textAlign: 'center' }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <Text
            style={{
              color: Colors.carbonGray,
              fontSize: 18,
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 10,
              fontWeight: 'bold',
            }}
          >Vinotecas destacadas</Text>
          <FlatList
            data={mockTiendas}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handlePresentModalPress();
                  setWebViewUrl(item.url);
                  setShowWebView(true);
                }}
              >
                <View style={{ margin: 10 }}>
                  <Image source={item.image} style={{
                    width: Dimensions.get('window').width - 100,
                    height: 150,
                    borderRadius: 10,
                  }}
                    resizeMode='contain'
                  />
                  <Text style={{ color: Colors.carbonGray, marginTop: 5, textAlign: 'center' }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.containerWeb}>
            <WebView
              style={styles.containerWeb}
              source={{ uri: webViewUrl }}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  containerWeb: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  image: {
    width: 120, // 90% del ancho de la pantalla
    height: 120, // Mantén proporción cuadrada
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
