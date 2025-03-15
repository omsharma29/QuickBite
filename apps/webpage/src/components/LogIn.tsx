import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { DialogHeader, DialogTitle } from "@repo/ui/dialog"

interface LoginProps {
  onSwitchToSignup: () => void;
}

export function LogIn({ onSwitchToSignup }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading] = useState(false);
  const [error] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault()
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Log In</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFB20E] focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFB20E] focus:border-transparent"
              placeholder="Create a password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FFB20E] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#e6a00d] transition-colors duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Log In'}
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button 
          onClick={onSwitchToSignup}
          className="text-[#FFB20E] hover:underline font-medium"
        >
          Sign up
        </button>
      </p>
    </>
  );
}