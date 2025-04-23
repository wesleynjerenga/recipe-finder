import { useState } from 'react';
import './App.css';

import LoginPage from './components/LoginPage';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

  const handleLoginSuccess = () => setIsLoggedIn(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const response = await fetch(`${API_URL}${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please check your connection or try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setQuery('');
    setRecipes([]);
    setError(null);
    setLoading(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App">
      <h1>Recipe Finder</h1>
      <button onClick={handleLogout}>
        Logout
      </button>
      <SearchBar query={query} setQuery={setQuery} handleSearch={handleSearch} loading={loading} />
      <RecipeList recipes={recipes} loading={loading} error={error} query={query} />
    </div>
  );


export default App;
