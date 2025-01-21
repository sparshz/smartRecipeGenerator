import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import {SPOONACULAR_API_KEY} from '@env'

const RecipeInstructionsScreen = ({ route }) => {
  const { recipeId, recipeTitle } = route.params;
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("top ki id" , recipeId);

  useEffect(() => {
    const fetchInstructions = async () => {
      const url = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${SPOONACULAR_API_KEY}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.length === 0 || !data[0]?.steps) {
          Alert.alert(
            "No Instructions",
            `This recipe (${recipeTitle}) has no instructions available.`
          );
          setInstructions([]);
        } else {
          setInstructions(data[0].steps);
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
      <Text style={styles.title}>{recipeTitle}</Text>
      {instructions.length === 0 ? (
        <Text style={styles.noDataText}>
          No instructions available for this recipe.
        </Text>
      ) : (
        <FlatList
          data={instructions}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => (
            <View style={styles.stepCard}>
              <Text style={styles.stepNumber}>Step {item.number}</Text>
              <Text style={styles.stepText}>{item.step}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default RecipeInstructionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Soft background color
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    textTransform: "capitalize", // Makes the title consistent
  },
  listContainer: {
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


