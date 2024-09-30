import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import Markdown from 'react-native-markdown-display';

export default function Tab() {
  const [image, setImage] = React.useState<string | null>(null);
  const [responseText, setResponseText] = React.useState<string | null>(null);
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;


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

  const uploadImage = async (imageUri: string) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const mimeType = 'image/jpeg'; // Adjust based on your image type

    const uploadResponse = await fetch(`${apiUrl}/upload/v1beta/files?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'X-Goog-Upload-Protocol': 'resumable',
        'X-Goog-Upload-Command': 'start',
        'X-Goog-Upload-Header-Content-Length': blob.size.toString(),
        'X-Goog-Upload-Header-Content-Type': mimeType,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: {
          display_name: 'uploaded_image',
        },
      }),
    });

    const uploadHeaders = await uploadResponse.headers.get('x-goog-upload-url');

    // Upload the actual image data
    const uploadUrl = uploadHeaders;

    const finalUploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Length': blob.size.toString(),
        'X-Goog-Upload-Offset': '0',
        'X-Goog-Upload-Command': 'upload, finalize',
      },
      body: blob,
    });

    const fileInfo = await finalUploadResponse.json();
    return fileInfo.file.uri; // Return the valid file_uri
  };

  const postContent = async () => {
    if (!image) {
      return;
    }

    try {
      const fileUri = await uploadImage(image); // Ensure this function uploads and returns a valid file URI

      const response = await fetch(`${apiUrl}/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: 'Analyze the provided image. If it shows a wine, provide an extensive and detailed description, including its origin, type (red, white, rosé, etc.), grape variety, vintage, winery, and region. Describe the wine’s flavor profile, such as aroma, taste notes (fruity, earthy, spicy, etc.), and texture. Suggest appropriate food pairings and discuss its aging potential. If possible, mention awards or recognitions the wine has received. If the image does not show a wine, do not return any results and state that the wine cannot be identified.' },
              {
                file_data: {
                  mime_type: 'image/jpeg',
                  file_uri: fileUri, // Use the valid file_uri
                }
              }
            ]
          }]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get the error response body
        console.error('Error response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error.message}`);
      }

      const data = await response.json();

      // Log the generated content
      console.log('Response:', JSON.stringify(data, null, 2)); // Log the full response

      if (data.candidates && data.candidates.length > 0) {
        data.candidates.forEach(candidate => {
          if (candidate.content && candidate.content.parts) {
            candidate.content.parts.forEach(part => {
              if (part.text) {
                console.log('Generated content:', part.text); // Log generated text content
                setResponseText(part.text);
              }
            });
          }
        });
      } else {
        console.log('No candidates found in the response.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tab Home</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <Button title="Post content" onPress={postContent} />
        </>
      )}
      {responseText && <>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ height: '100%', width: '90%' }}
        >
          <Markdown>
            {responseText}
          </Markdown>
        </ScrollView>
      </>}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
