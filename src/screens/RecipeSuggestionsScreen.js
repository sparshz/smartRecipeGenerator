// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   Image,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Platform,
// //   Modal,
// //   Pressable,
// //   ActivityIndicator
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native'; // Import navigation
// // import LottieView from 'lottie-react-native';

// // const IngredientModal = ({ visible, ingredients, onClose }) => (
// //   <Modal
// //     animationType="slide"
// //     transparent={true}
// //     visible={visible}
// //     onRequestClose={onClose}
// //   >
// //     <View style={styles.modalOverlay}>
// //       <View style={styles.modalContent}>
// //         <View style={styles.modalHeader}>
// //           <Text style={styles.modalTitle}>Missing Ingredients</Text>
// //           <TouchableOpacity onPress={onClose}>
// //             <Text style={styles.closeButton}>✕</Text>
// //           </TouchableOpacity>
// //         </View>
// //         <ScrollView style={styles.ingredientsList}>
// //           {ingredients.map((ingredient, index) => (
// //             <View key={index} style={styles.ingredientItem}>
// //               <Image 
// //                 source={{ uri: ingredient.image }} 
// //                 style={styles.ingredientImage}
// //               />
// //               <View style={styles.ingredientDetails}>
// //                 <Text style={styles.ingredientName}>{ingredient.name}</Text>
// //                 <Text style={styles.ingredientAmount}>
// //                   {ingredient.amount} {ingredient.unit}
// //                 </Text>
// //               </View>
// //             </View>
// //           ))}
// //         </ScrollView>
// //       </View>
// //     </View>
// //   </Modal>
// // );



// // const RecipeSuggestionsScreen = ({ route, navigation }) => {
// //   const { dietaryPreferences } = route.params; 
// //   const { recipes } = route.params;
// //   const [favorites, setFavorites] = useState(new Set());
// //   const [selectedIngredients, setSelectedIngredients] = useState(null);
// //   const [loading, setLoading] = useState(false); // Add loading state

// //   const toggleFavorite = (recipeId) => {
// //     setFavorites((prev) => {
// //       const newFavorites = new Set(prev);
// //       if (newFavorites.has(recipeId)) {
// //         newFavorites.delete(recipeId);
// //       } else {
// //         newFavorites.add(recipeId);
// //       }
// //       return newFavorites;
// //     });
// //   };

// //   const showIngredients = (ingredients) => {
// //     setSelectedIngredients(ingredients);
// //   };

  
// //   const fetchRecipeInstructions = async (recipeId) => {
// //     console.log("fetching Instrunctions")
// //     setLoading(true); // Start loading
// //     try {
// //       const response = await fetch(
// //         `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=289ecaf456ae4510984e0352ace95b8d`
// //       );
// //       const data = await response.json();
// //       navigation.navigate("RecipeInstructions", { recipeId }); // Pass recipe data to the RecipeInstructions screen
// //     } catch (error) {
// //       console.error("Error fetching recipe instructions:", error);
// //     } finally {
// //       setLoading(false); // Stop loading
// //     }
// //   };

// //   const renderCookingInfo = (recipe) => (
// //     <View style={styles.cookingInfo}>
// //       <TouchableOpacity
// //         style={styles.ingredientCounter}
// //         onPress={() => showIngredients(recipe.missedIngredients)}
// //       >
// //         <Text style={styles.ingredientCountText}>
// //           {recipe.missedIngredientCount} missing ingredients
// //         </Text>
// //       </TouchableOpacity>
// //       <View style={styles.infoItem}>
// //         <Text style={styles.infoText}>👥 {recipe.servings || "4"} servings</Text>
// //       </View>
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.headerTitle}>Recipe Suggestions</Text>
// //       {recipes.length === 0 ? (
// //         // Message displayed when no recipes are available
// //         <View style={styles.noRecipesContainer}>
// //           <LottieView 
// //           source={require('../assets/animations/notFound.json')} 
// //           autoPlay 
// //           loop 
// //           height={300}
// //           width={300}
// //           />
// //           <Text style={styles.noRecipesText}>
// //             No recipe Found
// //           </Text>
// //           <Text style={styles.noRecipesText2}>
// //             Try some other Ingredients
// //           </Text>
// //         </View>
// //       ) : (
// //         <ScrollView
// //           showsVerticalScrollIndicator={false}
// //           contentContainerStyle={styles.scrollContent}
// //         >
// //           {recipes.map((recipe, index) => (
// //             <TouchableOpacity
// //               key={index}
// //               style={styles.recipeCard}
// //               onPress={() => {
// //                 console.log(`Fetching instructions for Recipe ID: ${recipe.id}`); // Log recipe ID
// //                 fetchRecipeInstructions(recipe.id);
// //               }}
// //             >
// //               <Image
// //                 source={{ uri: recipe.image }}
// //                 style={styles.recipeImage}
// //                 resizeMode="cover"
// //               />
// //               <View style={styles.cardContent}>
// //                 <View style={styles.titleContainer}>
// //                   <Text style={styles.recipeTitle}>{recipe.title}</Text>
// //                   <TouchableOpacity
// //                     style={styles.favoriteButton}
// //                     onPress={(e) => {
// //                       e.stopPropagation();
// //                       toggleFavorite(recipe.id);
// //                     }}
// //                   >
// //                     <Text
// //                       style={[
// //                         styles.favoriteText,
// //                         favorites.has(recipe.id) && styles.favoriteActive,
// //                       ]}
// //                     >
// //                       {favorites.has(recipe.id) ? "♥" : "♡"}
// //                     </Text>
// //                   </TouchableOpacity>
// //                 </View>
// //                 {renderCookingInfo(recipe)}
// //               </View>
// //             </TouchableOpacity>
// //           ))}
// //         </ScrollView>
// //       )}

// //       <IngredientModal
// //         visible={selectedIngredients !== null}
// //         ingredients={selectedIngredients || []}
// //         onClose={() => setSelectedIngredients(null)}
// //       />

// //       {/* Loading indicator */}
// //       {loading && (
// //         <View style={styles.loadingOverlay}>
// //           <ActivityIndicator size="large" color="#0000ff" />
// //         </View>
// //       )}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F5F6FA',
// //     paddingTop: Platform.OS === 'ios' ? 50 : 20,
// //   },
// //   headerTitle: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //     paddingHorizontal: 20,
// //     color: '#2D3436',
// //   },
// //   scrollContent: {
// //     padding: 20,
// //     paddingTop: 0,
// //   },
// //   recipeCard: {
// //     backgroundColor: 'white',
// //     borderRadius: 15,
// //     marginBottom: 20,
// //     overflow: 'hidden',
// //     ...Platform.select({
// //       ios: {
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: 2 },
// //         shadowOpacity: 0.1,
// //         shadowRadius: 8,
// //       },
// //       android: {
// //         elevation: 4,
// //       },
// //     }),
// //   },
// //   recipeImage: {
// //     width: '100%',
// //     height: 200,
// //     backgroundColor: '#f0f0f0',
// //   },
// //   cardContent: {
// //     padding: 15,
// //   },
// //   titleContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //   },
// //   recipeTitle: {
// //     fontSize: 18,
// //     fontWeight: '700',
// //     color: '#2D3436',
// //     flex: 1,
// //     marginRight: 10,
// //   },
// //   favoriteButton: {
// //     padding: 5,
// //   },
// //   favoriteText: {
// //     fontSize: 24,
// //     color: '#FF4081',
// //   },
// //   favoriteActive: {
// //     color: '#FF4081',
// //   },
// //   cookingInfo: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginTop: 8,
// //   },
// //   ingredientCounter: {
// //     backgroundColor: '#FFE4E8',
// //     paddingHorizontal: 12,
// //     paddingVertical: 6,
// //     borderRadius: 20,
// //   },
// //   ingredientCountText: {
// //     color: '#FF4081',
// //     fontSize: 14,
// //     fontWeight: '500',
// //   },
// //   infoItem: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   infoText: {
// //     color: '#666',
// //     fontSize: 14,
// //   },
// //   // Modal Styles
// //   modalOverlay: {
// //     flex: 1,
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //     justifyContent: 'flex-end',
// //   },
// //   modalContent: {
// //     backgroundColor: 'white',
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20,
// //     paddingTop: 20,
// //     maxHeight: '80%',
// //   },
// //   modalHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //     paddingBottom: 15,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#F0F0F0',
// //   },
// //   modalTitle: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#2D3436',
// //   },
// //   closeButton: {
// //     fontSize: 20,
// //     color: '#666',
// //     padding: 5,
// //   },
// //   ingredientsList: {
// //     padding: 20,
// //   },
// //   ingredientItem: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#F0F0F0',
// //   },
// //   ingredientImage: {
// //     width: 50,
// //     height: 50,
// //     borderRadius: 25,
// //     marginRight: 15,
// //   },
// //   ingredientDetails: {
// //     flex: 1,
// //   },
// //   ingredientName: {
// //     fontSize: 16,
// //     fontWeight: '500',
// //     color: '#2D3436',
// //     marginBottom: 4,
// //   },
// //   ingredientAmount: {
// //     fontSize: 14,
// //     color: '#666',
// //   },
// //   loadingOverlay: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0,0,0,0.3)',
// //   },
// //   noRecipesContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     // paddingHorizontal: 20,
// //     marginTop:-350
// //   },
// //   noRecipesText: {
// //     fontSize: 20,
// //     color: "#555",
// //     textAlign: "center",
// //     lineHeight: 24,
// //     fontWeight:'bold'
// //   },
// //   noRecipesText2: {
// //     fontSize: 18,
// //     color: "#555",
// //     textAlign: "center",
// //     lineHeight: 24,
// //     // fontWeight:'bold'
// //   },
// // });

// // export default RecipeSuggestionsScreen;


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
import {SPOONACULAR_API_KEY} from '@env'
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

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
      const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=6756d2feb04246b5b5a1e19301f63742&includeIngredients=${encodeURIComponent(
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
      <Text style={styles.infoText}>👥 {recipe.servings || "4"} servings</Text>
    </View>
  );

  const fetchRecipeInstructions = async (recipeId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
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

