import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../components/ui/Modal';
import { apiFetch } from '../utils/api';

export default function Register() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password and confirm password must match.');
      return;
    }

    try {
      const data = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: { name: name.trim(), email: email.trim(), password },
      });
      localStorage.setItem('IBID_USER_TOKEN', data.token);
      localStorage.setItem('IBID_USER_NAME', data.user.name);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setIsOpen(true);
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-orange-600">Get started</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Create your account</h1>
            <p className="mt-3 text-sm text-slate-500">Join iBid to save favorites and get exclusive book updates.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500"
            />
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
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="w-full rounded-full bg-orange-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-600">Create account</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-orange-600 hover:text-orange-700">Sign in</Link>
          </p>
        </div>
      </div>

      <Modal
        open={isOpen}
        title="Registration complete"
        message={error ? error : `Thanks for joining iBid, ${localStorage.getItem('IBID_USER_NAME') || name}! Your new account has been created successfully.`}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
