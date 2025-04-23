const SearchBar = ({ query, setQuery, handleSearch, loading }) => (
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
  );
  
  export default SearchBar;
  