# Recipe Suggestion App

## Overview
The Recipe Suggestion App is an innovative platform designed to simplify meal preparation by providing personalized recipe suggestions based on available ingredients. This project leverages advanced technologies to recognize ingredients, match them with suitable recipes, and cater to dietary restrictions, all while maintaining a seamless user experience.

## Features

### 1. Ingredient Recognition from Images
- Utilize image recognition APIs to identify ingredients from user-uploaded photos.
- Handle API failures by providing users with the option to manually input ingredients.

### 2. Recipe Matching Algorithm
- Match recognized ingredients with recipes using the Spoonacular API.
- Display recipes ranked by relevance, including missing ingredients count and alternative suggestions.

### 3. Substitution Suggestions
- Offer substitutions for unavailable ingredients to broaden recipe options.

### 4. Dietary Restrictions Handling
- Allow users to specify dietary preferences (e.g., vegetarian, vegan, gluten-free).
- Filter recipes based on the user’s dietary restrictions.

### 5. Error Handling and User Experience Enhancements
- Gracefully handle API errors with user-friendly fallback options.
- Provide clear and informative error messages.
- Use loading indicators to enhance interactivity.

## Project Highlights

### Data Structuring
- Designed data models to organize recipes, ingredients, and user preferences effectively.
- Ensured efficient data retrieval and storage.

### Evaluation Points
1. **Ingredient Classification Approach:** 
   - Used reliable APIs for ingredient recognition.
   - Implemented fallback mechanisms for manual input.

2. **Recipe Matching Logic:**
   - Developed algorithms to prioritize recipes based on the number of matched ingredients.

3. **Error Handling:**
   - Managed API failures without interrupting the user flow.
   - Displayed user-friendly error messages to enhance the app’s reliability.

4. **User Experience Considerations:**
   - Provided intuitive navigation and feedback mechanisms.
   - Ensured seamless transitions between features.

## Technologies Used
- **Frontend:** React Native
- **APIs:** Spoonacular API for recipes and ingredient recognition
- **UI/UX:** Lottie animations for enhanced user engagement
- **Backend:** Fetch API for making API calls
- **Error Handling:** Graceful fallback mechanisms

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recipe-suggestion-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd recipe-suggestion-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm start
   ```

## Usage
1. Upload an image of ingredients or manually input them.
2. View recipe suggestions ranked by relevance.
3. Explore details like missing ingredients, servings, and preparation time.
4. Navigate to detailed instructions for the selected recipe.

## Challenges and Solutions

### Challenge 1: API Failure Handling
**Solution:** Implemented manual ingredient input as a fallback, ensuring uninterrupted functionality.

### Challenge 2: Matching Logic Complexity
**Solution:** Designed efficient algorithms to prioritize recipes with minimal missing ingredients.

### Challenge 3: Dietary Restriction Filtering
**Solution:** Integrated user preference options to filter recipes dynamically.

## Future Enhancements
- **Real-time Updates:** Implement live updates for recipe suggestions as users modify their ingredient list.
- **Community Features:** Enable users to share custom recipes and reviews.
- **Machine Learning Integration:** Enhance ingredient recognition accuracy with custom ML models.

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

We hope you enjoy using the Recipe Suggestion App! Feel free to reach out for support or to share your feedback.
