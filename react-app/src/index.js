import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {LoadScript} from '@react-google-maps/api'
import {Provider} from 'react-redux'
import { ModalProvider } from './context/Modal';
import configureStore from "./store";
import * as sessionActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}
const libraries = ["places"]

ReactDOM.render(
  <React.StrictMode>
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY} libraries={libraries} >
      <ModalProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ModalProvider>
    </LoadScript>
  </React.StrictMode>,
  document.getElementById("root")
);
