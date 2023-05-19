
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './reducers/auth.reducer';
// import currentOrderReducer from './reducers/order.reducer';


// const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         order: currentOrderReducer
//     },
//     devTools: import.meta.env.dev,
//     // preloadedState: JSON.parse(localStorage.getItem('state') ?? '{}')
// })

// // store.subscribe(()=> {
// //     localStorage.setItem('state', JSON.stringify(store.getState()));
// //     // localStorage.setItem('state', JSON.stringify({item: store.getState().item}));
// // })

// export default store;



// /////////////////////////////////////////////////////////////////////////////////////////



// configureStore.js

import { configureStore } from '@reduxjs/toolkit';
// OU BIEN ... ???
// import { configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import rootReducer from './root.reducer';
 
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'order'] // only navigation will be persisted
}
 

const persistedReducer = persistReducer(persistConfig, rootReducer);
 
export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.dev 
})

export const persistor = persistStore(store);