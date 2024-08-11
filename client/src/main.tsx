import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Center from "./center.tsx";
import Bottom from "./bottom.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Center />
    <Bottom />
  </React.StrictMode>
);
