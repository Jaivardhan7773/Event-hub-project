
import React, { useState } from 'react';
import './Auth.css';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';


const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { signup, isSigningIn } = useAuthStore();

  const validateForm = () => {
    if(!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return false;
    }
    if(form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if(!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Invalid email format");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if(!success) {
      console.error("Validation failed");
      return
    } // Stop if validation fails
    if(success === true) signup(form) // Simulate signup
  };

  return (
    <div className="auth-grid">
      <div className="auth-visual signup-visual">
        <h2>Join Events Hub!</h2>
        <p>Create your account and never miss an event again.</p>
        <img src="https://media.istockphoto.com/id/1171466650/photo/praying-hands-with-faith-in-religion-and-belief-in-god-on-dark-background-power-of-hope-or.jpg?b=1&s=612x612&w=0&k=20&c=WyvaxNpUx7sNofEbLG4f3cFbHpVKgRFXLp6wUYUUBvs=" alt="Sign Up Visual" />
      </div>
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Sign Up</h2>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required autoFocus />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email"  value={form.email} 
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password"  value={form.password} 
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required />
        </div>
        <button type="submit" className="auth-btn" disabled={isSigningIn}>
          {isSigningIn ? 'Signing up...' : 'Sign Up'}
        </button>
        <p className="auth-switch">Already have an account? <Link to={"/login"}>Login</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
