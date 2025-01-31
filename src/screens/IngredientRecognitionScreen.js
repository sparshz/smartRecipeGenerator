import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { classifyIngredients } from '../services/ImageRecognitionService' // Ensure the correct import path
import { Camera, ImagePlus, X } from 'lucide-react-native';
import { fetchRecipesFromIngredients } from '../services/fetchRecipesFromIngredients';
import LottieView from 'lottie-react-native';


const ManualIngredientModal = ({ visible, onClose, onSubmit, associatedImage }) => {
  const [ingredient, setIngredient] = useState('');

  const handleSubmit = () => {
    if (ingredient.trim()) {
      onSubmit(ingredient.trim(), associatedImage);
      setIngredient('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Ingredient Manually</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter ingredient name"
            value={ingredient}
            onChangeText={setIngredient}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Ingredient</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

console.log('hello');

const IngredientRecognitionScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [imageIngredientMap, setImageIngredientMap] = useState({}); // Maps image URIs to their ingredients
  const [currentImage, setCurrentImage] = useState(null);

  const removeImage = (indexToRemove) => {
    const imageUri = images[indexToRemove];
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);

    // Remove associated ingredients
    const ingredientsToRemove = imageIngredientMap[imageUri] || [];
    const updatedIngredients = ingredients.filter(
      (ingredient) => !ingredientsToRemove.includes(ingredient)
    );

    // Update the image-ingredient mapping
    const newImageIngredientMap = { ...imageIngredientMap };
    delete newImageIngredientMap[imageUri];

    setIngredients(updatedIngredients);
    setImageIngredientMap(newImageIngredientMap);
  };

  // const handleImageAnalysis = async (uri) => {
  //   setIsLoading(true);
  //   try {
  //     const newIngredients = await classifyIngredients(uri);
  //     if (newIngredients && newIngredients.length > 0) {
  //       setIngredients((prev) => [...prev, ...newIngredients]);
  //       setImageIngredientMap((prev) => ({
  //         ...prev,
  //         [uri]: newIngredients,
  //       }));
  //     } else {
  //       Alert.alert(
  //         'Image Analysis Failed',
  //         'Sorry, couldn\'t analyze the image. Would you like to enter ingredients manually?',
  //         [
  //           {
  //             text: 'Cancel',
  //             style: 'cancel',
  //           },
  //           {
  //             text: 'Enter Manually',
  //             onPress: () => {
  //               setCurrentImage(uri);
  //               setShowManualInput(true);
  //             },
  //           },
  //         ]
  //       );
  //     }
  //   } catch (error) {
  //     Alert.alert(
  //       'Analysis Error',
  //       'Sorry, could not analyze the image. Would you like to enter ingredients manually?',
  //       [
  //         {
  //           text: 'Cancel',
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Enter Manually',
  //           onPress: () => {
  //             setCurrentImage(uri);
  //             setShowManualInput(true);
  //           },
  //         },
  //       ]
  //     );
  //   } finally {
  //     setIsLoading(false); // Hide loader
  //   }
  // };


  const handleImageAnalysis = async (uri) => {
    setIsLoading(true);
    try {
      const newIngredients = await classifyIngredients(uri);
  
      if (newIngredients && newIngredients.length > 0) {
        setIngredients((prev) => [...prev, ...newIngredients]);
        setImageIngredientMap((prev) => ({
          ...prev,
          [uri]: newIngredients,
        }));
      } else {
        Alert.alert(
          'Image Analysis Failed',
          'Sorry, couldn\'t analyze the image. Would you like to enter ingredients manually?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => {
                // Remove image from map and UI
                setImageIngredientMap((prev) => {
                  const updatedMap = { ...prev };
                  delete updatedMap[uri];
                  return updatedMap;
                });
  
                // Remove the image from the display list
                setImages((prev) => prev.filter((image) => image !== uri));
              },
            },
            {
              text: 'Enter Manually',
              onPress: () => {
                setCurrentImage(uri); // Set the current image URI for manual addition
                setShowManualInput(true); // Show the modal
              },
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        'Analysis Error',
        'Sorry, could not analyze the image. Would you like to enter ingredients manually?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              // Remove image from map and UI
              setImageIngredientMap((prev) => {
                const updatedMap = { ...prev };
                delete updatedMap[uri];
                return updatedMap;
              });
  
              // Remove the image from the display list
              setImages((prev) => prev.filter((image) => image !== uri));
            },
          },
          {
            text: 'Enter Manually',
            onPress: () => {
              setCurrentImage(uri); // Set the current image URI for manual addition
              setShowManualInput(true); // Show the modal
            },
          },
        ]
      );
    } finally {
      setIsLoading(false); // Hide loader
    }
  };
  
  

  const renderLoader = () => (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#FF4081" />
      {/* <LottieView source={require('../assets/animations/loading.json')} autoPlay loop height={100} width={100}/> */}
      <Text style={styles.loaderText}>Analyzing Image...</Text>
    </View>
  );



  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 0,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Image Picker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const newImages = response.assets.map((asset) => asset.uri);
        setImages((prev) => [...prev, ...newImages]);
        response.assets.forEach((asset) => handleImageAnalysis(asset.uri));
      }
    });
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        console.log('granted', granted);
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const openCamera = async () => {

    const isCameraPermitted = await requestCameraPermission()



    if (isCameraPermitted) {
      console.log('isCameraPermitted', isCameraPermitted);
      await launchCamera({
        mediaType: 'photo',
        quality: 1,
      }, (response) => {
        console.log('response', response);
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.error('Camera Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          console.log('hiii');
          const uri = response.assets[0].uri;
          setImages((prev) => [...prev, uri]); // Add the image URI to the state
          handleImageAnalysis(uri); // Analyze the captured image

        } else {
          Alert.alert('Error', 'No photo was captured.');
        }
      });
    }




    
  };


  const addManualIngredient = (ingredient, associatedImage) => {
    setIngredients((prev) => [...prev, ingredient]);
    setImageIngredientMap((prev) => ({
      ...prev,
      [associatedImage]: [...(prev[associatedImage] || []), ingredient],
    }));
  };

  const findRecipes = () => {
    if (ingredients.length === 0) {
      Alert.alert('No Ingredients', 'No ingredients detected! Add ingredients to proceed.');
      return;
    }
    navigation.navigate('DietaryPreference', { ingredients });
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ingredient Scanner</Text>
        <Text style={styles.subtitle}>Take photos or upload your ingredients</Text>
      </View>

      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <View style={styles.buttonContent}>
            <ImagePlus color="#ffffff" size={24} />
            <Text style={styles.buttonText}>Upload Images</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.uploadButton, styles.cameraButton]}
          onPress={openCamera}
        >
          <View style={styles.buttonContent}>
            <Camera color="#ffffff" size={24} />
            <Text style={styles.buttonText}>Take Photo</Text>
          </View>
        </TouchableOpacity>
      </View>


      {isLoading ? (
        renderLoader()
      ) : images.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageContainer}
        >
          {images.map((imageUri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}
              >
                <X color="#FF4081" size={20} />
              </TouchableOpacity>
              <Image source={{ uri: imageUri }} style={styles.image} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No images selected yet</Text>
          <Text style={styles.emptyStateSubtext}>Take a photo or upload from gallery</Text>
        </View>
      )}

      {ingredients.length > 0 && !isLoading && (
        <View style={styles.ingredientsContainer}>
          <Text style={styles.sectionTitle}>Detected Ingredients</Text>
          <ScrollView style={styles.ingredientsList}>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.findRecipesButton}
            onPress={findRecipes}
            disabled={isLoading}
          >
            <Text style={styles.findRecipesText}>
              {isLoading ? 'Loading...' : 'Find Recipes'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ManualIngredientModal
        visible={showManualInput}
        onClose={() => setShowManualInput(false)}
        onSubmit={addManualIngredient}
        associatedImage={currentImage}
      />
    </View>
  );
};

export default IngredientRecognitionScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4F566B',
  },
  uploadSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: '#635BFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cameraButton: {
    backgroundColor: '#3ECF8E',
    marginRight: 0,
    marginLeft: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  imageContainer: {
    // marginBottom: 24,
  },
  imageWrapper: {
    marginRight: 16,
    // borderRadius: 12,
    overflow: 'hidden',
    // elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  ingredientsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginTop: -300
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1F36',
    marginBottom: 16,
  },
  ingredientsList: {
    flex: 1,
  },
  ingredientItem: {
    backgroundColor: '#F7F9FC',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: '#4F566B',
  },
  findRecipesButton: {
    backgroundColor: '#635BFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  findRecipesText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyStateContainer: {
    height: 120,
    backgroundColor: '#F0F2F7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4F566B',
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#8792A2',
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  closeButton: {
    fontSize: 20,
    color: '#666',
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF4081',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height:150,
    // width:150
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF4081',
  },
});

