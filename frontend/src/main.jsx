import React from "react";
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import store from "./redux/store";
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="457362271121-884c7c6gh96brv09tninlatnk4q9kisv.apps.googleusercontent.com"> 
      <App />
    </GoogleOAuthProvider>
  </Provider>
)
