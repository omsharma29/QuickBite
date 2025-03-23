import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import OrderPage from "../pages/OrderPage";
import OrderSuccess from "../pages/Order-Sucessful";
import { auth } from "../lib/firebase-auth";
import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Listen for user authentication changes
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        
        {user ? (
          <>
            <Route path="/orderpage" element={<OrderPage />} />
            <Route path="/ordersuccessful" element={<OrderSuccess />} />
          </>
        ) : (
          <Route path="/orderpage" element={<Home />} /> // Redirect unauth users
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
