import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/ui/Modal';
import { apiFetch } from '../utils/api';

export default function Login() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password) return;

    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: { email: email.trim(), password },
      });
      localStorage.setItem('IBID_USER_TOKEN', data.token);
      localStorage.setItem('IBID_USER_NAME', data.user.name);
      setEmail('');
      setPassword('');
      setMessage('Login successful! Redirecting to dashboard...');
      setIsOpen(true);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Welcome back</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Log in to your account</h1>
            <p className="mt-3 text-sm text-slate-500">Access your wishlist, orders, and personalized recommendations.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500"
            />
            <button type="submit" className="w-full rounded-full bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-600">Sign in</button>
          </form>
          {message ? <p className="mt-4 text-sm text-red-600">{message}</p> : null}
          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{' '}
            <Link to="/register" className="font-semibold text-orange-600 hover:text-orange-700">Create one</Link>
          </p>
        </div>
      </div>

      <Modal
        open={isOpen}
        title="Sign in successful"
        message={message || `Thanks for signing in! We’re glad to have you back, ${localStorage.getItem('IBID_USER_NAME') || email}.`}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
