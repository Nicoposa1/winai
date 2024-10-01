import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../utils/Colors'

export const ButtomWineColor = ({
  text,
  onPress,
  loading,
  style, // Añadimos style como prop para personalizarlo externamente
}: {
  text: string,
  onPress: () => void,
  loading?: boolean,
  style?: object, // Permitir que reciba estilos personalizados
}) => {
  return (
    <TouchableOpacity
      style={[styles.ButtomContainer, style]} // Combina el estilo predeterminado y el personalizado
      onPress={onPress}
      disabled={loading}
    >
      <Text style={styles.ButtomText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtomContainer: {
    backgroundColor: Colors.primary, // Asegúrate de que el fondo no sea del mismo color que el texto
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center', // Alinea el texto en el centro del botón
    justifyContent: 'center', // Centra el texto verticalmente
    width: '100%', // Asegura que el botón ocupe el 100% del contenedor
  },
  ButtomText: {
    color: "#fff", // Asegúrate de que el color del texto contraste con el fondo
    fontWeight: 'bold', // O cualquier otro estilo para hacerlo más visible
    textAlign: 'center'
  },
});

