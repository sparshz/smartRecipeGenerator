import React, { useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, Easing,TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  // Animation states
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity
  const slideAnim = useRef(new Animated.Value(50)).current; // Slide from the bottom

  // Start animation on component mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Lottie animation */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../assets/animations/food.json')}
          autoPlay
          loop
          style={{height:300, width:300,marginTop:-150}}
        // Add this style to control the size
        />
      </View>

      {/* Animated Title */}
      <Animated.Text style={[styles.title, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        Smart Recipe Generator
      </Animated.Text>

      {/* Animated Button */}
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        {/* <View style={{borderWidth:2,borderRadius:15}}>

        <Button
          title="Discover Recipies"
          onPress={() => navigation.navigate('IngredientRecognition')}
          color="#f48fb1"
          />
          </View> */}

<View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('IngredientRecognition')}
        >
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text style={styles.buttonText}> Discover Recipes ? </Text>
  </View>
        </TouchableOpacity>
      </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffebee', // Soft pink background
    paddingHorizontal: 20,
  },
  animationContainer: {
    // height: 750,  // Adjust the height and width for the animation
    // width: 350,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:-20,
  },
  lottie: {
    // width: 350,  // Make sure the width and height are set correctly
    // height: 350,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#d81b60', // Bold, dark pink color for the title
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium', // Stylish font
  },
  buttonWrapper: {
    // borderWidth: 2,
    // borderColor: '#f48fb1', // Same as the button's primary color
    borderRadius: 15,
    overflow: 'hidden', // Ensures button stays within border shape
  },
  button: {
    backgroundColor: '#fb5607', // Solid pink background
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff', // White text for contrast
    textAlign: 'center',
  },
});

export default HomeScreen;
