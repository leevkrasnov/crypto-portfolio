import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function AuthForm() {
  const { login, setDemoMode, setIsAuthenticated } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }

    try {
      login(password);
      setError(false);
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const handleDemoMode = () => {
    setDemoMode(true);
    setIsAuthenticated(true);
  };

  return (
    <div className="flex flex-col items-center mt-[20%]">
      <h1 className="text-5xl font-bold mb-8">Ходлер, да?</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-center"
        style={{ width: '100%', maxWidth: '260px' }}
      >
        <div className="mb-4 w-full">
          <label htmlFor="password" className="sr-only">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            value={password}
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 text-lg bg-gray-200 border border-gray-900 rounded-none focus:bg-white duration-500 outline-none ${
              error ? 'shake' : ''
            }`}
          />
        </div>
        <section className="flex gap-4 justify-between mt-5">
          <button type="submit" className="button-auth">
            ВОЙТИ
          </button>
          <button
            type="button"
            onClick={handleDemoMode}
            className="button-auth"
          >
            ДЕМО
          </button>
        </section>
      </form>
    </div>
  );
}
