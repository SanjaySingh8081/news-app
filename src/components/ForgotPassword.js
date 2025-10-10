import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
      setIsSuccess(response.ok);

    } catch (error) {
      setMessage('Failed to connect to the server.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="main-title">Reset Password</h2>
          <p>Enter your email address and we will send you a link to reset your password.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Send Reset Link</button>
          </form>

          {message && (
            <div className={`alert ${isSuccess ? 'alert-info' : 'alert-danger'} mt-3`}>
              {message}
            </div>
          )}

          <p className="mt-3">
            Remember your password? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}