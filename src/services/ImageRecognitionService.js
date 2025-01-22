
import { edibleItems } from '../components/constants/Edibles';
import {convertImageToBase64} from '../helperfunctions/ConvertTobase'
// import {GOOGLE_API_KEY} from '@env'


// Helper function to create a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to classify single image using Google Cloud Vision API
export const classifyIngredients = async (imageUri) => {
  try {
    console.log('Starting classification for image: ', imageUri);
    
    if (!imageUri) {
      throw new Error('No image URI provided');
    }

    // Convert image to base64
    const base64Image = await convertImageToBase64(imageUri);
    console.log('Image converted to base64 successfully');

    // Prepare the request payload
    const requestPayload = {
      requests: [{
        image: {
          content: base64Image,
        },
        features: [{
          type: 'LABEL_DETECTION',
          maxResults: 10,
        }],
      }],
    };

    // Make the API request using fetch
    console.log('Sending API request to Google Vision API...');
    const apiKey = 'AIzaSyBi8BuYHzL1NxhzCa1qVmmGjOugFpSUSfo';
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    console.log('API response received:', responseData);

    // Extract labels (ingredients) from the response and filter against edibleItems
    if (responseData.responses && responseData.responses[0].labelAnnotations) {
      const labels = responseData.responses[0].labelAnnotations;
      
      // Create a Set to store unique filtered ingredients
      const uniqueFilteredIngredients = new Set();
      
      // Process each label
      labels.forEach(label => {
        const ingredient = label.description;
        // Check if this ingredient exists in edibleItems (case-insensitive)
        for (const edibleItem of edibleItems) {
          if (edibleItem.toLowerCase() === ingredient.toLowerCase()) {
            uniqueFilteredIngredients.add(edibleItem);
            break;
          }
        }
      });

      // Convert Set back to array for return value
      const filteredIngredients = Array.from(uniqueFilteredIngredients);

      console.log('All detected labels:', labels.map(label => label.description));
      console.log('Filtered unique edible ingredients:', filteredIngredients);
      
      return filteredIngredients;
    } else {
      console.error('No label annotations found in response');
      return [];
    }
  } catch (error) {
    console.error('Error classifying image:', error);
    throw error;
  }
};
