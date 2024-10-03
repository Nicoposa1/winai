// services/imageService.ts

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;


export const uploadImage = async (imageUri: string) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();

  const mimeType = 'image/jpeg'; // Ajusta según el tipo de imagen

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

  // Subir los datos de la imagen
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
  return fileInfo.file.uri; // Devuelve el uri del archivo válido
};

export const postContent = async (image: string, setResponseText: (text: string) => void) => {
  if (!image) {
    return;
  }

  try {
    const fileUri = await uploadImage(image); // Asegúrate de que esta función suba y devuelva un URI de archivo válido

    const response = await fetch(`${apiUrl}/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: 'Analyze the provided image. If it shows a wine, provide an extensive and detailed description, including its origin, type (red, white, rosé, etc.), grape variety, vintage, winery, and region. Describe the wine’s flavor profile, such as aroma, taste notes (fruity, earthy, spicy, etc.), and texture. Suggest appropriate food pairings and discuss its aging potential. If possible, mention awards or recognitions the wine has received. If the image does not show a wine, do not return any results and state that the wine cannot be identified. mark the name in bold' },
            {
              file_data: {
                mime_type: 'image/jpeg',
                file_uri: fileUri, // Utiliza el URI de archivo válido
              }
            }
          ]
        }]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Obtener el cuerpo de la respuesta de error
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error.message}`);
    }

    const data = await response.json();

    // Log el contenido generado

    if (data.candidates && data.candidates.length > 0) {
      data.candidates.forEach(candidate => {
        if (candidate.content && candidate.content.parts) {
          candidate.content.parts.forEach(part => {
            if (part.text) {
              setResponseText(part.text);
            }
          });
        }
      });
    } else {
    }
  } catch (error) {
  }
};
