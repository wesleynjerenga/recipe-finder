import { useState } from 'react';
import './App.css';
import Login from './login';
import LoginPage from './components/LoginPage';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Mock users database with roles
  const validUsers = [
    { username: 'user1', password: 'pass123', role: 'user' },
    { username: 'admin1', password: 'admin123', role: 'admin' }
  ];

  const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

  const handleLoginSuccess = (username, password, role) => {
    const user = validUsers.find(
      u => u.username === username && 
          u.password === password && 
          u.role === role
    );
    
    if (user) {
      setIsLoggedIn(true);
      setUserRole(role);
      setError(null);
    } else {
      setError('Invalid credentials for ' + role + ' login');
    }
  };

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
    return <Login onLoginSuccess={handleLoginSuccess} error={error} />;
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
}

export default App;
