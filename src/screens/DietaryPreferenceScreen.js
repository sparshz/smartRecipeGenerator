

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dietaryOptions } from '../components/constants/DietaryOptions';


const { width } = Dimensions.get('window');



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
    navigation.navigate('RecipeSuggestions', {
      dietaryPreferences: [...selectedPreferences],
      ingredients: route.params?.ingredients || [],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Dietary Preferences</Text>
          <Text style={styles.subHeader}>Select all that apply to you</Text>
        </View>

        <ScrollView 
          style={styles.optionsList}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.optionsGrid}>
            {dietaryOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selectedPreferences.has(option) && styles.selectedOption,
                  { transform: [{ scale: selectedPreferences.has(option) ? 1.05 : 1 }] }
                ]}
                onPress={() => togglePreference(option)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.checkbox,
                  selectedPreferences.has(option) && styles.checkedBox
                ]} />
                <Text style={[
                  styles.optionText,
                  selectedPreferences.has(option) && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.skipButton} 
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.nextButton,
              selectedPreferences.size > 0 && styles.nextButtonActive
            ]} 
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <Text style={styles.nextButtonText}>
              {selectedPreferences.size > 0 ? 'Continue' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    padding: 24,
    paddingTop: 40,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  optionsList: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  option: {
    width: (width - 48) / 2,
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eeeeee',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#f0f7ff',
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dddddd',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  optionText: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    flexWrap: 'wrap',
  },
  selectedOptionText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 24,
    paddingBottom: 34,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  skipButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginRight: 12,
  },
  skipButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    fontWeight: '600',
  },
  nextButton: {
    flex: 2,
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
  },
  nextButtonActive: {
    backgroundColor: '#ef476f',
  },
  nextButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  }
});

export default DietaryPreferencesScreen;
