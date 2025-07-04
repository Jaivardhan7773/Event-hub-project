
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const {login , isLoggingIn} = useAuthStore();



  const validateForm = () => {
    if (!form.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(form.email)) return toast.error("Invalid email format");
    if (!form.password) return toast.error("Password is required");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(form);
  }

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
          <input type="email" id="email"  value={form.email} onChange={(e) => setForm({...form , email: e.target.value})} required autoFocus />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={form.password} onChange={(e) => setForm({...form , password: e.target.value})} required />
        </div>
        <button type="submit" className="auth-btn" disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
        <p className="auth-switch">Don't have an account? <Link to={"/signup"}>Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;
