import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, loading, error, query }) => {
  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!loading && recipes.length === 0 && query) {
    return <p>No recipes found for "{query}". Try another search!</p>;
  }
  if (!loading && !error && recipes.length === 0 && !query) {
    return <p>Enter a dish or ingredient to find recipes!</p>;
  }

  return (
    <div className="recipe-results">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;
