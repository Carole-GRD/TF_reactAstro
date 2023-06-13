import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { route } from './routes/route';
const router = createBrowserRouter(route);


import { Provider } from 'react-redux';
import store from './store/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  // </React.StrictMode>
)

