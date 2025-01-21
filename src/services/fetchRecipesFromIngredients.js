
import {SPOONACULAR_API_KEY} from '@env'
export const fetchRecipesFromIngredients = async (ingredients) => {
    try {
      const ingredientsString = ingredients.join(',');
      const apiUrl = 'https://api.spoonacular.com/recipes/findByIngredients';
      
      // Build URL with query parameters
      const url = new URL(apiUrl);
      url.searchParams.append('ingredients', ingredientsString);
      url.searchParams.append('number', '10');
      url.searchParams.append('ranking', '1');
      url.searchParams.append('apiKey', SPOONACULAR_API_KEY);
  
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data; // Return the recipes
    } catch (error) {
      console.error('Error fetching recipes from Spoonacular API:', error);
      return [];
    }
  };

