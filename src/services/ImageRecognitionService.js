


import RNFS from 'react-native-fs';
import {GOOGLE_API_KEY} from '@env'
const edibleItems = new Set([
  // Fruits (including synonyms and variations)
  "Apple", "Banana", "Orange", "Tangerine", "Mango", "Pineapple", "Grape", "Strawberry", "Blueberry", "Raspberry", 
  "Cherry", "Watermelon", "Kiwifruit", "Peach", "Pear", "Plum", "Pomegranate", "Apricot", "Coconut", 
  "Papaya", "Lime", "Lemon", "Fig", "Date", "Melon", "Avocado", "Blackberry", "Cranberry", "Lychee", 
  "Passionfruit", "Dragonfruit", "Guava", "Starfruit", "Persimmon","Graps",

  // Vegetables
  "Carrot", "Potato", "Tomato", "Onion", "Garlic", "Cucumber", "Pepper", "Spinach", "Lettuce", 
  "Broccoli", "Cauliflower", "Cabbage", "Eggplant", "Zucchini", "Pumpkin", "Squash", "Radish", 
  "Beetroot", "Peas", "Corn", "Asparagus", "Celery", "Okra", "Mushroom", "Ginger", "Parsley", "Basil", 
  "Dill", "Mint", "Coriander", "Leek", "Turnip", "Shallot", "Chard", "Artichoke","Chili pepper",

  // Dairy
  "Milk", "Cheese", "Butter", "Yogurt", "Cream", "Paneer", "Ghee",

  // Meat
  "Chicken", "Beef", "Pork", "Lamb", "Turkey", "Fish", "Salmon", "Tuna", "Cod", "Shrimp", "Crab", 
  "Lobster", "Scallops", "Clams", "Squid", "Octopus", "Bacon", "Sausage",

  // Grains and Staples
  "Rice", "Wheat", "Oats", "Barley", "Quinoa", "Pasta", "Bread", "Noodles", "Tortilla", "Bagel", 
  "Croissant", "Pizza", "Pita", "Couscous", "Cereal","Sweet corn",

  // Eggs
  "Egg", "Chicken Egg", "Duck Egg", "Quail Egg",

  // Sweets and Snacks
  "Chocolate", "Sugar", "Candy", "Cake", "Cookies", "Donut", "Cupcake", "Brownie", "Ice Cream", 
  "Popcorn", "Chips", "Pretzel", "Candy Bar", "Marshmallow",

  // Beverages
  "Coffee", "Tea", "Juice", "Smoothie", "Lemonade", "Milkshake", "Soda", "Wine", "Beer", "Cocktail", 
  "Whiskey", "Vodka", "Rum", "Champagne", "Cider", "Water"
]);

// List of edible items (using Set for unique values)

// Helper function to create a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Main function to handle multiple images
export const classifyMultipleImages = async (imageUris) => {
  try {
    console.log('Starting classification for multiple images:', imageUris);
    
    if (!Array.isArray(imageUris)) {
      // If single image is passed, convert to array
      imageUris = [imageUris];
    }

    // Process images sequentially with delay
    const results = [];
    for (let i = 0; i < imageUris.length; i++) {
      const uri = imageUris[i];
      try {
        // Add 5-second delay between API calls (except for the first one)
        if (i > 0) {
          console.log(`Waiting 5 seconds before processing next image...`);
          await delay(5000);
        }
        
        const result = await classifyIngredients(uri);
        results.push({
          uri,
          ingredients: result,
          success: true
        });
      } catch (error) {
        console.error(`Error processing image ${uri}:`, error);
        results.push({
          uri,
          ingredients: [],
          success: false,
          error: error.message
        });
      }
    }

    // Combine all unique ingredients from successful results
    const allUniqueIngredients = new Set();
    results.forEach(result => {
      if (result.success && result.ingredients) {
        result.ingredients.forEach(ingredient => allUniqueIngredients.add(ingredient));
      }
    });

    return {
      combinedIngredients: Array.from(allUniqueIngredients),
      individualResults: results
    };
  } catch (error) {
    console.error('Error in batch processing:', error);
    throw error;
  }
};

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
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`;
    
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

// Helper function to convert image to base64
const convertImageToBase64 = async (imageUri) => {
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