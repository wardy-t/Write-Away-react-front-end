import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import "./SigninForm.css"; // Import your custom CSS

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      props.setUser(user);
      navigate("/dashboard"); // Redirect to dashboard (Inbox page)
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-rectangle">
        <div className="login-ellipse"></div>
        <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
          <h1 className="login-title">Log In</h1>
          <p className="login-message">{message}</p>

          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            placeholder="Enter username"
            value={formData.username}
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
            value={formData.password}
            onChange={handleChange}
          />

          <div className="form-buttons">
            <button type="submit" className="login-button">
              Log In
            </button>
            <Link to="/">
              <button type="button" className="cancel-button">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
