import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Auths/AuthContext.jsx";
import { SearchProvider } from "./Context/SearchContext.jsx";
import { Provider } from "react-redux";
import { store } from "./Chatbot/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
