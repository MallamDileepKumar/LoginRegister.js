import React, { useState } from 'react';
import './SignUp.css'; // Import external CSS file
import axios from 'axios';
const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [error, setError] = useState('');
  const { username, email, password, confirmPassword } = data;

  const changeHandle = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value.trim() });
    setError('');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
    }
     else if (password === confirmPassword) {
      axios.post('https://teluguskillhub-4cca9-default-rtdb.firebaseio.com/SignUp.json', data)
      .then(response => {
        console.log(response);
      });
      alert('Registration Successful!');
    } 
    else {
      setError('Passwords do not match!');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create an Account</h2>
        <form onSubmit={submitHandler} className="register-form">
          <input
            type="text"
            name="username"
            value={username}
            onChange={changeHandle}
            placeholder="Enter Username"
            className="form-input"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={changeHandle}
            placeholder="Enter Email"
            className="form-input"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={changeHandle}
            placeholder="Enter Password"
            className="form-input"
          />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={changeHandle}
            placeholder="Confirm Password"
            className="form-input"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
