const RecipeCard = ({ recipe }) => (
    <div className="recipe-card">
      {recipe.strMealThumb && (
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
        />
      )}
      <h2>{recipe.strMeal}</h2>
      {recipe.strCategory && <p>Category: {recipe.strCategory}</p>}
      {recipe.strArea && <p>Area: {recipe.strArea}</p>}
      {recipe.strInstructions && (
        <p style={{ maxHeight: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {recipe.strInstructions.substring(0, 150)}...
        </p>
      )}
      {recipe.strSource && (
        <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
          View Source
        </a>
      )}
      {recipe.strYoutube && (
        <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
          Watch Video
        </a>
      )}
    </div>
  )
  
  export default RecipeCard;
  