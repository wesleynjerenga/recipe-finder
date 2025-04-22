import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TheMealDB uses '1' as a demo API key for general access
  const API_KEY = '1';
  const API_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?s=`;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);
    setRecipes([]);
    console.log(`Searching for recipes with query: ${query}`);

    try {
      const response = await fetch(`${API_URL}${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.meals) {
        // Map the API response to a simpler structure if needed,
        // or use the structure directly. Here we use it directly.
        setRecipes(data.meals);
      } else {
        // Handle case where API returns null for meals (no results)
        setRecipes([]);
        console.log('No recipes found for this query.');
      }

    } catch (err) {
      setError('Failed to fetch recipes. Please check your connection or try again.');
      console.error("Fetch error:", err);
      setRecipes([]); // Ensure recipes are cleared on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes (e.g., chicken, pasta)"
          className="search-input"
          aria-label="Search for recipes"
        />
        <button type="submit" disabled={loading || !query} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="recipe-results">
        {loading && <p>Loading recipes...</p>}
        {!loading && !error && recipes.length === 0 && query && (
            <p>No recipes found for "{query}". Try another search!</p>
        )}
         {/* Initial state message - only show if not loading, no error, no recipes, and no query attempted */}
         {!loading && !error && recipes.length === 0 && !query && (
            <p>Enter a dish or ingredient to find recipes!</p>
         )}
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
             {/* Add an image if available */}
             {recipe.strMealThumb && (
                <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{maxWidth: '100%', height: 'auto', borderRadius: '4px'}} />
             )}
            <h2>{recipe.strMeal}</h2>
            {/* Display category or area if desired */}
            {recipe.strCategory && <p>Category: {recipe.strCategory}</p>}
            {recipe.strArea && <p>Area: {recipe.strArea}</p>}
            {/* Link to instructions or display them */}
            {recipe.strInstructions && <p style={{ maxHeight: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{recipe.strInstructions.substring(0, 150)}...</p>}
             {/* You might want a link to full recipe details */}
             {recipe.strSource && <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">View Source</a>}
             {recipe.strYoutube && <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" style={{marginLeft: '10px'}}>Watch Video</a>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;