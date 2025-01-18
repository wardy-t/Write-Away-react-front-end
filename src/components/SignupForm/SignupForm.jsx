import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import './SignupForm.css';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const handleLogout = () => {
    authService.signout(); // Clear user data
    props.setUser(null); // Reset user state
    navigate('/'); // Redirect to Landing page
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <div className="signup-container">
      <div className="signup-rectangle">
        <div className="signup-ellipse"></div>
        <form className="signup-form" autoComplete="off" onSubmit={handleSubmit}>
          <h1 className="signup-title">Sign Up</h1>
          <p className="signup-message">{message}</p>

          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
          />
          <label htmlFor="passwordConf" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="passwordConf"
            name="passwordConf"
            className="form-input"
            placeholder="Confirm password"
            value={passwordConf}
            onChange={handleChange}
          />
          <div className="form-buttons">
            <button
              type="submit"
              className="signup-button"
              disabled={isFormInvalid()}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
