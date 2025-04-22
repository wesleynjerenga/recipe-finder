import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!query) return; // Don't search if query is empty

    setLoading(true);
    setError(null);
    setRecipes([]); // Clear previous recipes

    console.log(`Searching for recipes with query: ${query}`);

    // --- Placeholder for API call ---
    // In a real app, you would fetch data from a recipe API here
    // For example:
    // try {
    //   const response = await fetch(`https://api.example.com/recipes?search=${query}`);
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   const data = await response.json();
    //   setRecipes(data.results || []); // Adjust based on API response structure
    // } catch (err) {
    //   setError('Failed to fetch recipes. Please try again.');
    //   console.error(err);
    // } finally {
    //   setLoading(false);
    // }
    // --- End Placeholder ---

    // Simulate API call delay and set mock data for now
    setTimeout(() => {
        // Mock data - replace with actual API results
        const mockRecipes = [
            { id: 1, title: `Recipe for ${query} 1`, description: "Delicious description 1" },
            { id: 2, title: `Recipe for ${query} 2`, description: "Delicious description 2" },
        ];
        setRecipes(mockRecipes);
        setLoading(false);
    }, 1000); // Simulate 1 second loading
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
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="recipe-results">
        {loading && <p>Loading recipes...</p>}
        {!loading && recipes.length === 0 && !error && <p>No recipes found. Try another search!</p>}
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            {/* Add more recipe details here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;