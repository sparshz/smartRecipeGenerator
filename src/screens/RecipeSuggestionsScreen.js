
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { SPOONCULAR_API_KEY } from '@env';

const RecipeSuggestionsScreen = ({ route }) => {
  const { dietaryPreferences, ingredients } = route.params; // Get dietary preferences and ingredients from route params
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Function to fetch recipes
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const ingredientsQuery = ingredients.join(',');
      const dietQuery = dietaryPreferences.join(',');
      const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONCULAR_API_KEY}&includeIngredients=${encodeURIComponent(
        ingredientsQuery
      )}&diet=${encodeURIComponent(dietQuery)}&number=20`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      setRecipes(data.results || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      Alert.alert('Error', 'Unable to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipes on screen load
  useEffect(() => {
    fetchRecipes();
  }, []);

  const toggleFavorite = (recipeId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(recipeId)) {
        newFavorites.delete(recipeId);
      } else {
        newFavorites.add(recipeId);
      }
      return newFavorites;
    });
  };

  const renderCookingInfo = (recipe) => (
    <View style={styles.cookingInfo}>
      {/* <Text style={styles.infoText}>👥 {recipe.servings || "4"} servings</Text> */}
    </View>
  );

  const fetchRecipeInstructions = async (recipeId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONCULAR_API_KEY}`
      );
      const data = await response.json();
      navigation.navigate('RecipeInstructions', {
        recipeId,
        recipeTitle: data.title,
        instructions: data.instructions,
      });
    } catch (error) {
      console.error('Error fetching recipe instructions:', error);
      Alert.alert('Error', 'Unable to fetch recipe instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Recipe Suggestions</Text>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {recipes.length === 0 && !loading ? (
        <View style={styles.noRecipesContainer}>
          <LottieView
            source={require('../assets/animations/notFound.json')}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.noRecipesText}>No Recipes Found</Text>
          <Text style={styles.noRecipesText2}>Try using different ingredients or preferences.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {recipes.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeCard}
              onPress={() => fetchRecipeInstructions(recipe.id)}
            >
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <View style={styles.titleContainer}>
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                  >
                    <Text
                      style={[
                        styles.favoriteText,
                        favorites.has(recipe.id) && styles.favoriteActive,
                      ]}
                    >
                      {favorites.has(recipe.id) ? '♥' : '♡'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {renderCookingInfo(recipe)}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  favoriteButton: {
    marginLeft: 10,
  },
  favoriteText: {
    fontSize: 18,
    color: '#aaa',
  },
  favoriteActive: {
    color: 'red',
  },
  cookingInfo: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  noRecipesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    height: 200,
    width: 200,
  },
  noRecipesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  noRecipesText2: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default RecipeSuggestionsScreen;

