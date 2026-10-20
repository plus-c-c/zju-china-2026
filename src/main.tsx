import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/App/App.tsx";
import { BrowserRouter } from "react-router-dom";

// Own initial positioning; browser scroll restoration must not resume inside the opening.
window.history.scrollRestoration = "manual";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
