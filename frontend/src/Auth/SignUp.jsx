
import React, { useState } from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1200); // Simulate signup
  };

  return (
    <div className="auth-grid">
      <div className="auth-visual signup-visual">
        <h2>Join Events Hub!</h2>
        <p>Create your account and never miss an event again.</p>
        <img src="https://undraw.co/api/illustrations/sign_up_n6im.svg" alt="Sign Up Visual" />
      </div>
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Sign Up</h2>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required autoFocus />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <p className="auth-switch">Already have an account? <Link to={"/login"}>Login</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
