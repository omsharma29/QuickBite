import { Button } from "@repo/ui/button";
import { ArrowRight, Mail, Lock, X } from "lucide-react";
import { useState } from "react";
import { auth, provider } from "../lib/firebase-auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";


export default function AuthModal() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [Gloading, setGLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState("");

  const toggle = () => {
    setModal((prev) => !prev);
    resetErrors();
  };

  const clickSignup = () => {
    setSignup((prev) => !prev);
    resetErrors();
  };

  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    resetErrors(); // Reset previous errors

    try {
      if (signup) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User Created Successfully");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User Logged In Successfully");
      }
      setModal(false); // Close modal on success
    } catch (error: any) {
      console.error("Auth Error:", error.code);

      if (error.code === "auth/email-already-in-use") {
        setEmailError("This email is already registered. Please log in.");
      } else if (error.code === "auth/user-not-found") {
        setEmailError("No account found with this email. Please sign up.");
      } else if (error.code === "auth/invalid-email") {
        setEmailError("Invalid email format. Please enter a valid email.");
      } else if (error.code === "auth/wrong-password") {
        setPasswordError("Incorrect password. Please try again.");
      } else if (error.code === "auth/weak-password") {
        setPasswordError("Password should be at least 6 characters.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Ensure loading stops after execution
    }
  };

  const handleGoogle = async()=>{
    setGLoading(true);
    try {
      await signInWithPopup(auth, provider )
      setGLoading(false)
    } catch (error) {
      console.error(error)
    }
    

  }

  return (
    <>
      <Button
        onClick={toggle}
        className="px-4 py-2 bg-[#FFB20E] text-white rounded-lg hover:bg-[#e6a00d] transition-colors duration-200"
      >
        Sign In
      </Button>

      {modal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-[1000]">
          <div className="bg-white w-[30%] h-[500px] flex items-center justify-center text-black border border-gray-300 shadow-lg rounded-md">
            <div>
              <div className="flex justify-between mb-4 pb-2">
                <div className="font-bold text-3xl text-[#FFB20E]">
                  {signup ? "Sign Up" : "Log In"}
                </div>
                <X onClick={toggle} className="cursor-pointer text-gray-600" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 mt-2">
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
                      className={`pl-10 w-full px-4 py-3 rounded-lg border ${emailError ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-[#FFB20E] focus:border-transparent`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
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
                      className={`pl-10 w-full px-4 py-3 rounded-lg border ${passwordError ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-[#FFB20E] focus:border-transparent`}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FFB20E] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#e6a00d] transition-colors duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (signup ? "Signing Up..." : "Logging In...") : signup ? "Sign Up" : "Log In"}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                {signup ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={clickSignup}
                  className="text-[#FFB20E] hover:underline font-medium"
                >
                  {signup ? "Log In" : "Sign Up"}
                </button>
              </p>
              <hr className="border-t border-gray-300 my-4" />

              <button
                type="button"
                disabled={loading}
                 onClick={handleGoogle}
                className="w-full mt-5 bg-[#FFB20E] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#e6a00d] transition-colors duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FcGoogle size={24} /> {Gloading ? "Logging" : "Google"}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
