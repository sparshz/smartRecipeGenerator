import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

const RecipeInstructionsScreen = ({ route }) => {
  const { recipeId, recipeTitle } = route.params;
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructions = async () => {
      const apiKey = "289ecaf456ae4510984e0352ace95b8d";
      const url = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        
        if (data.length === 0) {
          Alert.alert(
            "No Instructions",
            `This recipe (${recipeTitle}) has no instructions available.`
          );
          setInstructions([]);
        } else {
          setInstructions(data[0].steps);
          
          // Extract unique ingredients from all steps
          const uniqueIngredients = new Map();
          data[0].steps.forEach(step => {
            step.ingredients?.forEach(ingredient => {
              if (!uniqueIngredients.has(ingredient.id)) {
                uniqueIngredients.set(ingredient.id, ingredient);
              }
            });
          });
          setIngredients(Array.from(uniqueIngredients.values()));
        }
      } catch (error) {
        console.error("Error fetching recipe instructions:", error);
        Alert.alert(
          "Error",
          `Unable to fetch instructions for "${recipeTitle}". Please try again later.`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchInstructions();
  }, [recipeId]);

  const renderIngredientItem = ({ item }) => (
    <View style={styles.ingredientCard}>
      <Image
        source={{ 
          uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` 
        }}
        style={styles.ingredientImage}
      />
      <Text style={styles.ingredientName}>{item.localizedName}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
        <Text style={styles.loaderText}>Loading Instructions...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{recipeTitle}</Text>
        
        {/* Ingredients Section */}
        <View style={styles.ingredientsSection}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <FlatList
            data={ingredients}
            renderItem={renderIngredientItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.ingredientsGrid}
          />
        </View>

        {/* Instructions Section */}
        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {instructions.length === 0 ? (
            <Text style={styles.noDataText}>
              No instructions available for this recipe.
            </Text>
          ) : (
            instructions.map((item) => (
              <View key={item.number} style={styles.stepCard}>
                <Text style={styles.stepNumber}>Step {item.number}</Text>
                <Text style={styles.stepText}>{item.step}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
    textTransform: "capitalize",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  ingredientsSection: {
    marginBottom: 20,
  },
  ingredientsGrid: {
    paddingHorizontal: 10,
  },
  ingredientCard: {
    flex: 1/3,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    marginBottom: 15,
  },
  ingredientImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  ingredientName: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    textTransform: "capitalize",
  },
  instructionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  stepCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  stepNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6347",
    marginBottom: 5,
  },
  stepText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  noDataText: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});

export default RecipeInstructionsScreen;