
import { createReducer } from '@reduxjs/toolkit'; 
import { loginUser, registerUser } from '../actions/auth.action'; 

const initialState = {
    token: ''
};

const tokenReducer = createReducer(initialState, (builer) => {
    builer
        .addCase(registerUser.fulfilled, (state, action) => {
            state.token = action.payload.result.token;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            console.log('token-persist => loginUser => action.payload.token : ', action.payload.token);
            state.token = action.payload.token; 
        })
});


export default tokenReducer;