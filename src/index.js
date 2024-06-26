import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { LoadingProvider } from './components/app-loader/LoadingContext';
import { CustomDialogProvider } from './components/custom-dialog/CustomDialogContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<BrowserRouter>
<LoadingProvider>
  <CustomDialogProvider>
<Provider store={store}>
    <App />
  </Provider>
  </CustomDialogProvider>
  </LoadingProvider>
    </BrowserRouter>
      </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
