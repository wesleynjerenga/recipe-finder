import React, { useState } from 'react';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Move login logic to backend in production
      const isValidLogin = isAdmin 
        ? (username === "admin" && password === "admin123")
        : (username === "user" && password === "password");

      if (isValidLogin) {
        console.log(`${isAdmin ? 'Admin' : 'User'} login successful`);
        // Clear form
        setUsername('');
        setPassword('');
        // Notify parent component
        if (onLoginSuccess) {
          onLoginSuccess({ isAdmin });
        }
      } else {
        setError(`Invalid ${isAdmin ? 'admin' : 'user'} credentials`);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100vw',
    textAlign: 'center',
    margin: 0,
    padding: 0,
    color: 'black',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    minWidth: '300px'
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%'
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    padding: '8px',
    width: 'calc(100% - 16px)',
    border: '1px solid #ccc',
    borderRadius: '4px'
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    marginTop: '10px',
    opacity: isLoading ? 0.7 : 1
  };

  const errorStyle = {
    color: 'red',
    marginTop: '0',
    marginBottom: '10px',
    minHeight: '1.2em'
  };

  const toggleButtonStyle = {
    ...buttonStyle,
    backgroundColor: isAdmin ? '#dc3545' : '#28a745',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <button 
        style={toggleButtonStyle}
        onClick={() => {
          setIsAdmin(!isAdmin);
          setError('');
          setUsername('');
          setPassword('');
        }}
        type="button"
        disabled={isLoading}
      >
        Switch to {isAdmin ? 'User' : 'Admin'} Login
      </button>
      <p style={errorStyle}>{error || '\u00A0'}</p>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="username" style={labelStyle}>
            {isAdmin ? 'Admin Username:' : 'Username:'}
          </label>
          <input
            style={inputStyle}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="password" style={labelStyle}>
            {isAdmin ? 'Admin Password:' : 'Password:'}
          </label>
          <input
            style={inputStyle}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" style={buttonStyle} disabled={isLoading}>
          {isLoading ? 'Logging in...' : `Login as ${isAdmin ? 'Admin' : 'User'}`}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;