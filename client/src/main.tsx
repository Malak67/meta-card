import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MetaCardProvider } from "./context/MetaCardContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MetaCardProvider>
        <App />
        <ToastContainer />
      </MetaCardProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
