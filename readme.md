# Recipe Search Web Component

A beautiful, interactive web component for searching recipes by ingredient using TheMealDB API. Built with vanilla JavaScript and Web Components, featuring smooth animations and a modern glassmorphism design.

![Recipe Search Component Demo](https://img.shields.io/badge/Status-Ready%20to%20Use-brightgreen) ![Web Components](https://img.shields.io/badge/Technology-Web%20Components-blue) ![Vanilla JS](https://img.shields.io/badge/Built%20with-Vanilla%20JavaScript-yellow)

## ✨ Features

- 🔍 **Ingredient-based recipe search** - Find recipes using any ingredient
- ⚡ **Smooth animations** - Engaging transitions and hover effects
- 📱 **Responsive design** - Works perfectly on desktop and mobile devices
- 🍳 **Recipe details modal** - View full recipe instructions and cooking videos
- 🗑️ **Interactive recipe management** - Remove recipes from search results
- 🎯 **Zero dependencies** - Pure vanilla JavaScript implementation
- 🔄 **Loading states** - Visual feedback during API calls
- ❌ **Error handling** - Graceful handling of network issues and empty results

## 🚀 Quick Start

### Basic Usage

1. Include the component files in your project:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Your App</title>
</head>
<body>
    <!-- Use the component -->
    <recipe-search-app></recipe-search-app>
    
    <!-- Include the script -->
    <script src="recipe_search.js"></script>
</body>
</html>
```

### Custom Styling

```html
<!-- Custom sized component -->
<recipe-search-app style="
    width: 100%; 
    height: 600px; 
    max-width: 900px; 
    margin: 0 auto;
"></recipe-search-app>
```

## 🔧 Implementation Details

### Architecture
- **Web Component**: Built using native Custom Elements API
- **Shadow DOM**: Encapsulated styles and DOM structure
- **Event-driven**: Responsive to user interactions with proper event handling
- **Async/Await**: Modern JavaScript for API calls

### File Structure
```
recipe-search-component/
├── recipe_search.js           # Main component code
├── recipe_search_component.html # Demo implementation
└── README.md                  # This documentation
```

### Core Methods
- `search()` - Handles form submission and initiates recipe search
- `callApiForMenuList()` - Fetches recipes by ingredient from TheMealDB API
- `showMealList()` - Renders the grid of recipe results
- `getRecipe()` - Fetches detailed recipe information
- `displayRecipeDetails()` - Shows recipe modal with full details
- `deleteMenuItem()` - Removes a recipe from the current results

## 🌐 API Integration

### TheMealDB API
This component integrates with [TheMealDB](https://www.themealdb.com/api.php), a free recipe database API.

**Endpoints Used:**
- **Search by Ingredient**: `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}`
- **Recipe Details**: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}`

**API Features:**
- ✅ Free to use (no API key required)
- ✅ CORS enabled
- ✅ High-quality recipe images
- ✅ Detailed cooking instructions
- ✅ YouTube video links when available
- ✅ Recipe categorization and origin info

## 🎯 Use Cases

This component is perfect for:

### 🍽️ Food & Recipe Websites
- Recipe discovery platforms
- Cooking blogs and magazines
- Restaurant websites with recipe sections
- Food delivery apps with cooking features

### 🏠 Lifestyle Applications
- Home cooking apps
- Meal planning tools
- Kitchen management systems
- Diet and nutrition websites

### 📚 Educational Platforms
- Cooking tutorial websites
- Culinary school applications
- Food science educational tools
- Cultural food exploration apps

### 🛒 E-commerce Integration
- Grocery shopping apps (find recipes for ingredients)
- Kitchen appliance websites
- Cooking supply stores
- Meal kit delivery services

## 🎨 Customization

### CSS Custom Properties
The component uses CSS custom properties for easy theming:

```css
recipe-search-app {
    --orange: #edb268;  /* Primary accent color */
    --green: #4db29e;   /* Secondary accent color */
}
```

### Styling Override Example
```css
/* Custom theme */
recipe-search-app {
    --orange: #ff6b6b;
    --green: #4ecdc4;
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0,0,0,0.15);
}
```

## 📱 Browser Support

- ✅ Chrome 54+
- ✅ Firefox 63+
- ✅ Safari 10.1+
- ✅ Edge 79+

*Requires Web Components support (Custom Elements v1)*

## 🚨 Error Handling

The component gracefully handles:
- Network connectivity issues
- API downtime
- Empty search results
- Invalid ingredient searches
- Malformed API responses

## 📖 API Response Examples

### Search Results
```json
{
  "meals": [
    {
      "idMeal": "52772",
      "strMeal": "Teriyaki Chicken Casserole",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg"
    }
  ]
}
```

### Recipe Details  
```json
{
  "meals": [
    {
      "idMeal": "52772",
      "strMeal": "Teriyaki Chicken Casserole",
      "strCategory": "Chicken",
      "strArea": "Japanese",
      "strInstructions": "Preheat Oven to 375...",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      "strYoutube": "https://www.youtube.com/watch?v=4aZr5hZXP_s"
    }
  ]
}
```

## 🙏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) - For providing the free recipe API
- [Google Fonts](https://fonts.google.com/) - Poppins font family
- Web Components community for excellent documentation and examples

---

**Ready to cook up something amazing?** 🍳 Add this component to your project and start building delicious recipe experiences!
