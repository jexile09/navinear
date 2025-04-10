// src/main.tsx
import React from "react"; // Import React core functionality
import ReactDOM from "react-dom/client"; // Import React DOM rendering library
import App from "./App"; // Import the root App component
import "./index.css"; // Import global CSS styles

// Mount the React application to the DOM inside the HTML element with id="root"
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* Enable development checks and best practices */}
    <App /> {/* Render the main App component */}
  </React.StrictMode>
);
