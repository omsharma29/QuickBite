import { Button } from "@repo/ui/button";
import { ArrowRight, Mail, Lock, X } from "lucide-react";
import { useState } from "react";

export default function AuthModal() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading] = useState(false);
  const [error] = useState('');
  const [signup, setSignup] = useState(false)

  const toggle = () => {
    setModal((prev) => !prev);
  };

  const clickSignup = () => {
    setSignup((prev) => !prev)
  }

  const handleSubmit = () => { }

  return (
    <>
      <Button
        onClick={toggle}
        className="px-4 py-2 bg-[#FFB20E] text-white rounded-lg hover:bg-[#e6a00d] transition-colors duration-200"
      >
        Signin
      </Button>

      {modal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-[1000]">
          <div className="bg-white w-[30%] h-[500px] flex items-center justify-center text-black border border-gray-300 shadow-lg rounded-md">
            <div>
              <div className="flex justify-between mb-4 pb-8">
                <div className="font-bold text-3xl text-[#FFB20E]">
                  {signup ? "SignUp" : "LogIn"}
                </div>
                <X onClick={toggle} className="cursor-pointer text-gray-600" />
              </div>
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
                  {signup ? (loading ? 'Siging Up...' : 'Sign Up') : (loading ? 'Logging in...' : 'Log In')}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                {signup ? "Already Have an Account" : "Don't Have an account"} {' '}
                <button
                  onClick={clickSignup}
                  className="text-[#FFB20E] hover:underline font-medium"
                >
                  {signup ? "LogIn" : "SignUp"}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
