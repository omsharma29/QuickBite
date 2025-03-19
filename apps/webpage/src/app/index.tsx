import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import OrderPage from "../pages/OrderPage";
import { auth } from "../lib/firebase-auth";
import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Listen for user authentication changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Update the user state
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {user && <Route path="/orderpage" element={<OrderPage />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
