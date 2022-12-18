import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import { ThemeProvider } from "@material-tailwind/react";

const store = configureStore();

// Display it in the console

store.subscribe(() => console.log(store.getState()));

// // Dispatch
// store.dispatch(increment());
// store.dispatch(decrement());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
