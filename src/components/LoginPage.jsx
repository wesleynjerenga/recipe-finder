import { useState } from 'react';

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Placeholder logic for login
    setError(null);
    onLoginSuccess();
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default LoginPage;
