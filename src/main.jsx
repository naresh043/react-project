// import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
// importing the store from configStore
import { store, persistor } from "./Redux/redux/config_store.js";
import { PersistGate } from "redux-persist/integration/react"; 

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
