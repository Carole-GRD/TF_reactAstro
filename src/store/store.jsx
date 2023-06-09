
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './reducers/auth.reducer';
// import currentOrderReducer from './reducers/order.reducer';


// const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         order: currentOrderReducer
//     },
//     devTools: import.meta.env.dev,
//     preloadedState: JSON.parse(localStorage.getItem('state') ?? '{}')
// })

// // store.subscribe(()=> {
// //     localStorage.setItem('state', JSON.stringify(store.getState()));
// //     // localStorage.setItem('state', JSON.stringify({item: store.getState().item}));
// // })

// export default store;



// /////////////////////////////////////////////////////////////////////////////////////////



// configureStore.js

// Reducer
import authReducer from "./reducers/auth.reducer";
import currentOrderReducer from './reducers/order.reducer';
import tokenReducer from "./reducers/token.persist.reducer";
// Redux
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
// Redux-Persist
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import {REGISTER, PURGE, PERSIST, PAUSE, REHYDRATE, FLUSH} from "redux-persist/es/constants";


// import rootReducer from './root.reducer';
const rootReducer = combineReducers({
    token: tokenReducer,
    auth: authReducer,
    order: currentOrderReducer
});


const persistConfig = {
  key: 'root',
  storage,                       // storage, <-> storage: storage,
  whitelist: ['token']   // only navigation will be persisted
  // whitelist: ['auth', 'order']   // only navigation will be persisted
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
 

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.dev,
    // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk]
    // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware().concat(loggerMiddleware), thunk ]
    middleware: (getDefaultMiddleware )=> getDefaultMiddleware({
      thunk,
      serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  })
})

export const persistor = persistStore(store);