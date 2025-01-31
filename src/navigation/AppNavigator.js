import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import IngredientRecognitionScreen from '../screens/IngredientRecognitionScreen';
import RecipeSuggestionsScreen from '../screens/RecipeSuggestionsScreen';

// import IngredientRecognitionCamera from '../screens/IngredientRecognitionCamera'; // Correct import
import RecipeInstructionsScreen from '../screens/RecipeInstructionsScreen'; // Add this import
import DietaryPreferencesScreen from '../screens/DietaryPreferenceScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IngredientRecognition"
        component={IngredientRecognitionScreen}
        options={{ title: 'Recognize Ingredients' }}
      />
      <Stack.Screen
        name="RecipeSuggestions"
        component={RecipeSuggestionsScreen}
        options={{ title: 'Recipe Suggestions' }}
      />
      <Stack.Screen
        name="RecipeInstructions"
        component={RecipeInstructionsScreen}
        options={({ route }) => ({
          title: route.params?.recipeTitle || 'Recipe Instructions',
        })}
      />
      <Stack.Screen
        name="DietaryPreference"
        component={DietaryPreferencesScreen}
        options={{ title: 'Select Dietary Preferences' }}
      />

      <Stack.Screen
      name="ImageRecognisationScreen" component={IngredientRecognitionScreen}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;
