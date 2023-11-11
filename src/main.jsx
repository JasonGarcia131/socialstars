import './index.css';
import App from './App.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider.jsx';
import {disableReactDevTools} from "@fvilers/disable-react-devtools";

if(process.env.NODE_ENV === 'production'){
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <App />
    </AuthProvider>
)
