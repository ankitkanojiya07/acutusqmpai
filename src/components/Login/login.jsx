import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const demoAccounts = [
    { email: 'arindam.bhattacharya@acutusai.com', password: 'Acutus@2024' },
    { email: 'ankit.kanojiya@acutusai.com', password: 'Ankit@2024' },
    { email: 'tech@acutusai.com', password: 'Tech@2024' },
    { email: 'user@acutusai.com', password: 'AcutusAi@2024' },
    { email: 'ankesh.saxena@acutusai.com', password: 'AcutusAi@2024' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = demoAccounts.some(
      (account) => account.email === email && account.password === password
    );

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    if (!isValid) {
      setError('Invalid email or password.');
    } else {
      setError('');
      onLogin(); // Trigger authentication
      navigate('/'); // Redirect to Dashboard
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
