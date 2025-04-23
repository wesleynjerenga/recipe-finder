const LoginPage = ({ onLoginSuccess }) => {
    const handleLogin = () => {
      // Placeholder logic
      onLoginSuccess();
    };
  
    return (
      <div className="login-page">
        <h2>Login</h2>
        {/* Add inputs as needed */}
        <button onClick={handleLogin}>Log In</button>
      </div>
    );
  }
  
  export default LoginPage;
  