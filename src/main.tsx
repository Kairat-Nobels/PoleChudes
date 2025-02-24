import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';

import 'rsuite/dist/rsuite.min.css';
import './styles/main.scss';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={3000} />
      <App />
    </Provider>
  </React.StrictMode>
);
