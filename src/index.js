import React from "react";
import ReactDOM from "react-dom/client";
import App from "./config/App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, compose, legacy_createStore } from "redux";

//reducers
import reducers from "./config/redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

//toast css
import "react-toastify/dist/ReactToastify.css";

// boostrap
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import { ToastContainer } from "react-toastify";

import "./assets/css/style.css";

const globalStore = legacy_createStore(
  reducers,
  compose(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={globalStore}>
        <App />
      </Provider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover={false}
      />
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
