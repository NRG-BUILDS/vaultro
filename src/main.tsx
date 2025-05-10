import { createRoot } from "react-dom/client";
import "./index.css";
import "./satoshi.css";
import { StrictMode } from "react";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
