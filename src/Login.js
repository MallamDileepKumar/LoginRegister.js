import React, { useState} from 'react';
import './Login.css'; // External CSS for styling
import axios from 'axios';
const Login = () => { 
  const [error, setError] = useState(''); 
  const [data, setData] = useState({ username: '', password: '' });
  const { username, password } = data; 

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    // Check for empty fields
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
  
    try {
      // Fetch login data from the API
      const response = await axios.get('https://teluguskillhub-4cca9-default-rtdb.firebaseio.com/SignUp.json');
  
      // Check if response data exists and is an object
      const users = response.data;
      if (!users || typeof users !== 'object') {
        setError('Invalid response from the server');
        return;
      }
  
      // Validate username and password
      const isValidUser = Object.values(users).some(user => 
        user.username === username && user.password === password
      );
  
      if (isValidUser) {
        alert('Login Success');
        setError(''); // Clear any previous errors
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      // Handle request errors
      console.error('Error during login:', error);
      setError('An error occurred while logging in. Please try again.');
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login Form</h2>
        <form onSubmit={onSubmit} className="login-form">
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            placeholder="Enter Username"
            className="form-input"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter Password"
            className="form-input"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
