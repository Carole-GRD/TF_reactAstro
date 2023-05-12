
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth-reducer';


const store = configureStore({
    reducer: {
        auth: authReducer
    },
    devTools: import.meta.env.dev,
    // preloadedState: JSON.parse(localStorage.getItem('state') ?? '{}')
})

// store.subscribe(()=> {
//     localStorage.setItem('state', JSON.stringify(store.getState()));
//     // localStorage.setItem('state', JSON.stringify({item: store.getState().item}));
// })

export default store;