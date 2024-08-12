import React from "react";
import ReactDOM from "react-dom/client";
import Logo from "./Logo.tsx";
import Center from "./center.tsx";
import Text from "./text.tsx";
import "./index.css";
import Footer from "./footer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Logo />
    <Center />
    <Text />
    <Footer />
  </React.StrictMode>
);
