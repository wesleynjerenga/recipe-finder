import React, { useState } from 'react';
import './App.css';

function Login({ onLoginSuccess, serverError }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError(''); // Clear any previous errors
    onLoginSuccess(username, password, isAdmin ? 'admin' : 'user');
  };

  const toggleLoginType = () => {
    setIsAdmin(!isAdmin);
    setUsername('');
    setPassword('');
    setLoginError('');
  };

  return (
    <div className="login-container">
      <button 
        className={`toggle-button ${isAdmin ? 'admin' : 'user'}`}
        onClick={toggleLoginType}
      >
        Switch to {isAdmin ? 'User' : 'Admin'} Login
      </button>

      <div className="login-form">
        <h2 className="login-title">{isAdmin ? 'Admin' : 'User'} Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="login-label" htmlFor="username">Username</label>
            <input
              id="username"
              className="login-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`${isAdmin ? 'Admin' : 'User'} Username`}
              required
            />
          </div>

          <div className="input-group">
            <label className="login-label" htmlFor="password">Password</label>
            <input
              id="password"
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          {serverError && <p className="error">{serverError}</p>}
          {loginError && <p className="error">{loginError}</p>}

          <button 
            className="login-button" 
            type="submit"
            disabled={!username || !password}
          >
            Login as {isAdmin ? 'Admin' : 'User'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;