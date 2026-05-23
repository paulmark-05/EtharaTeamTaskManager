import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background:
              "#1f2937",
            color: "#fff",
            borderRadius:
              "16px",
          },
        }}
      />

      <App />
    </>
  </React.StrictMode>
);