
import React, { useState } from 'react';
import './Auth.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1200); // Simulate login
  };

  return (
    <div className="auth-grid">
      <div className="auth-visual login-visual">
        <h2>Welcome Back!</h2>
        <p>Sign in to access amazing events and connect with the community.</p>
        <img src="https://undraw.co/api/illustrations/secure_login.svg" alt="Login Visual" />
      </div>
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required autoFocus />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="auth-switch">Don't have an account? <a href="/register">Sign Up</a></p>
      </form>
    </div>
  );
};

export default Login;
