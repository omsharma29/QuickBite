import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import { Toaster } from "@repo/ui/sonner"; // Adjust path based on your setup



const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <App />
      <Toaster/>
    </React.StrictMode>,
  );
} else {
  throw new Error("Could not find root element");
}
