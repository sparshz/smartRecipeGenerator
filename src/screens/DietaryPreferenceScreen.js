// // DietaryPreferenceScreen.js
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// const DietaryPreferenceScreen = ({ route, navigation }) => {
//   const { ingredients } = route.params;
//   const [dietaryPreference, setDietaryPreference] = useState(null);

//   const dietaryOptions = [
//     'Gluten Free',
//     'Ketogenic',
//     'Vegetarian',
//     'Lacto-Vegetarian',
//     'Ovo-Vegetarian',
//     'Vegan',
//     'Pescetarian',
//     'Paleo',
//     'Primal',
//     'Low FODMAP',
//     'Whole30',
//   ];

//   const handleSubmit = async () => {
//     try {
//       navigation.navigate('RecipeSuggestions', {
//         ingredients: ingredients,
//         dietaryPreference: dietaryPreference,
//       });
//     } catch (error) {
//       console.error('Error submitting dietary preference:', error);
//     }
//   };

//   const handleSkip = () => {
//     navigation.navigate('RecipeSuggestions', {
//       ingredients: ingredients,
//       dietaryPreference: null,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select Your Dietary Preference</Text>
//       {dietaryOptions.map((option, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.option}
//           onPress={() => setDietaryPreference(option)}
//         >
//           <Text style={styles.optionText}>{option}</Text>
//         </TouchableOpacity>
//       ))}
//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
//         <Text style={styles.buttonText}>Skip</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   option: {
//     padding: 15,
//     marginBottom: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//   },
//   optionText: {
//     fontSize: 18,
//   },
//   submitButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   skipButton: {
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#fff',
//   },
// });

// export default DietaryPreferenceScreen;
// DietaryPreferencesScreen.js
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const dietaryOptions = [
//   "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", 
//   "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"
// ];

// const DietaryPreferencesScreen = () => {
//   const navigation = useNavigation();
//   const [selectedPreferences, setSelectedPreferences] = useState(new Set());
  
//   const togglePreference = (preference) => {
//     setSelectedPreferences(prevState => {
//       const newPreferences = new Set(prevState);
//       if (newPreferences.has(preference)) {
//         newPreferences.delete(preference);
//       } else {
//         newPreferences.add(preference);
//       }
//       return newPreferences;
//     });
//   };

// //   const handleNext = () => {
// //     // Pass selected preferences to RecipeSuggestionsScreen
// //     navigation.navigate('RecipeSuggestions', { dietaryPreferences: [...selectedPreferences] });
// // };

// const handleNext = () => {
//     // Pass selected preferences and ingredients to RecipeSuggestionsScreen
//     navigation.navigate('RecipeSuggestions', {
//       dietaryPreferences: [...selectedPreferences],
//       ingredients: route.params?.ingredients || [],
//     });
//   };
  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Choose Your Dietary Preferences</Text>
//       <ScrollView style={styles.optionsList}>
//         {dietaryOptions.map((option, index) => (
//           <TouchableOpacity 
//             key={index} 
//             style={[
//               styles.option, 
//               selectedPreferences.has(option) && styles.selectedOption
//             ]}
//             onPress={() => togglePreference(option)}
//           >
//             <Text style={styles.optionText}>{option}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <TouchableOpacity style={styles.skipButton} onPress={handleNext}>
//         <Text style={styles.skipButtonText}>Skip</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//         <Text style={styles.nextButtonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   optionsList: {
//     flex: 1,
//   },
//   option: {
//     padding: 15,
//     marginVertical: 5,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//   },
//   selectedOption: {
//     backgroundColor: '#4CAF50',
//   },
//   optionText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   skipButton: {
//     padding: 15,
//     backgroundColor: '#ddd',
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   skipButtonText: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#333',
//   },
//   nextButton: {
//     padding: 15,
//     backgroundColor: '#4CAF50',
//     borderRadius: 5,
//   },
//   nextButtonText: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: 'white',
//   }
// });

// export default DietaryPreferencesScreen;


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dietaryOptions = [
  "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", 
  "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"
];

const DietaryPreferencesScreen = ({ route }) => {
  const navigation = useNavigation();
  const [selectedPreferences, setSelectedPreferences] = useState(new Set());

  const togglePreference = (preference) => {
    setSelectedPreferences(prevState => {
      const newPreferences = new Set(prevState);
      if (newPreferences.has(preference)) {
        newPreferences.delete(preference);
      } else {
        newPreferences.add(preference);
      }
      return newPreferences;
    });
  };

  const handleNext = () => {
    // Pass selected preferences and ingredients to RecipeSuggestionsScreen
    navigation.navigate('RecipeSuggestions', {
      dietaryPreferences: [...selectedPreferences],
      ingredients: route.params?.ingredients || [], // Ensure ingredients are passed from the previous screen
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Your Dietary Preferences</Text>
      <ScrollView style={styles.optionsList}>
        {dietaryOptions.map((option, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.option, 
              selectedPreferences.has(option) && styles.selectedOption
            ]}
            onPress={() => togglePreference(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.skipButton} onPress={handleNext}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsList: {
    flex: 1,
  },
  option: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  skipButton: {
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  skipButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  nextButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  }
});

export default DietaryPreferencesScreen;
