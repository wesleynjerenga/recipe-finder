import React, { useState } from 'react';

// Accept onLoginSuccess as a prop
function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add error state for feedback

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    // Add your actual login logic here (e.g., API call)
    console.log('Attempting login with:', username, password);

    // --- MOCK LOGIN ---
    // Replace this with your actual authentication check
    if (username === "user" && password === "password") {
        console.log('Login successful');
        if (onLoginSuccess) {
          onLoginSuccess(); // Call the handler passed from App
        }
    } else {
        console.log('Login failed');
        setError('Invalid username or password.'); // Provide feedback
    }
    // --- END MOCK LOGIN ---

    // Don't reset fields immediately if login fails, let user correct them
    // setUsername('');
    // setPassword('');
  };

  // Basic centering styles - modified for full screen
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Use full viewport height
    width: '100vw',     // Use full viewport width
    textAlign: 'center',
    // Optional: Add a background color if needed
    // backgroundColor: '#eef',
    // Ensure no external margins interfere (best handled globally, but can try here)
    margin: 0,
    padding: 0,
    color: 'black', // Text color
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Spacing between form elements
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    minWidth: '300px' // Ensure form has some width
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Align labels to the left
    width: '100%'
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    padding: '8px',
    width: 'calc(100% - 16px)', // Account for padding
    border: '1px solid #ccc',
    borderRadius: '4px'
  };

   const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const errorStyle = {
      color: 'red',
      marginTop: '0',
      marginBottom: '10px', // Add space below error
      minHeight: '1.2em' // Reserve space even when no error
  };


  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      {/* Display login errors */}
      <p style={errorStyle}>{error || '\u00A0'}</p> {/* Use non-breaking space to maintain height */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="username" style={labelStyle}>Username or Email:</label>
          <input
            style={inputStyle}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="password" style={labelStyle}>Password:</label>
          <input
            style={inputStyle}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;