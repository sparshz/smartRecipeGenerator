import RNFS from 'react-native-fs';

export const convertImageToBase64 = async (imageUri) => {
    try {
      if (!imageUri) {
        throw new Error('No image URI provided');
      }
      
      console.log('Converting image to base64:', imageUri);
      const base64String = await RNFS.readFile(imageUri, 'base64');
      console.log('Image converted to base64 successfully');
      return base64String;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  };