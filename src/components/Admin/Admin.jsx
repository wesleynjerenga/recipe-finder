import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: ''
  });

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('your-api-endpoint/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('your-api-endpoint/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
      });
      if (response.ok) {
        setRecipes(prev => [...prev, newRecipe]);
        setNewRecipe({ title: '', ingredients: '', instructions: '', image: '' });
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Recipe Management</h2>
      
      <section className="add-recipe-form">
        <h3>Add New Recipe</h3>
        <form onSubmit={handleAddRecipe}>
          <input
            type="text"
            name="title"
            value={newRecipe.title}
            onChange={handleInputChange}
            placeholder="Recipe Title"
            required
          />
          <textarea
            name="ingredients"
            value={newRecipe.ingredients}
            onChange={handleInputChange}
            placeholder="Ingredients (one per line)"
            required
          />
          <textarea
            name="instructions"
            value={newRecipe.instructions}
            onChange={handleInputChange}
            placeholder="Cooking Instructions"
            required
          />
          <input
            type="text"
            name="image"
            value={newRecipe.image}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
          <button type="submit">Add Recipe</button>
        </form>
      </section>

      <section className="recipe-list">
        <h3>Existing Recipes</h3>
        <div className="recipes-grid">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h4>{recipe.title}</h4>
              {recipe.image && <img src={recipe.image} alt={recipe.title} />}
              <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
              <button onClick={() => handleEditRecipe(recipe.id)}>Edit</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;