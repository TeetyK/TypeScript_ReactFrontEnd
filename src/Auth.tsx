import { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 ${isLogin ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 ${!isLogin ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      {isLogin ? <Login /> : <Register />}
      <div className="mt-4 text-center text-sm">
        <a href="/api-tester" className="underline">
          Go to API Tester
        </a>
      </div>
    </div>
  );
}
