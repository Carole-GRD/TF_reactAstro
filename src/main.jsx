import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { route } from './routes/route';
const router = createBrowserRouter(route);


import { Provider } from 'react-redux';
// import store from './store/store';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
 

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
)

