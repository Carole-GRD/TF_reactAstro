
// auth.action.jsx

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios'; 


export const registerUser = createAsyncThunk('user/register', 
    async (data, thunkAPI) => { 
        
        // Requete AJAX vers le serveur Backend 
        const response = await axios.post('http://localhost:8080/api/auth/register', data); 
        return response.data; 
        // _pStore.dispatch({
        //     type: 'REGISTER',
        //     payload: response.data,
        //   });
    } 
); 

export const loginUser = createAsyncThunk('user/login', 
    async (data, thunkAPI) => { 
        const response = await axios.post('http://localhost:8080/api/auth/login', data); 
        return response.data; 
        // _pStore.dispatch({
        //     type: 'LOGIN',
        //     payload: response.data,
        //   });
    } 
); 

export const logoutUser = createAction('user/logout');



// ////////////////////////////////////////////////////////////////////////////////////



// import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const registerUserFulfilled = createAction('user/registerFulfilled');
// export const registerUserRejected = createAction('user/registerRejected');
// export const loginUserFulfilled = createAction('user/loginFulfilled');
// export const loginUserRejected = createAction('user/loginRejected');
// export const logoutUser = createAction('user/logout');


// export const registerUser = createAsyncThunk('user/register', async (data, thunkAPI) => {
//   try {
//     const response = await axios.post('http://localhost:8080/api/auth/register', data);
//     thunkAPI.dispatch(registerUserFulfilled(response.data));
//   } catch (error) {
//     thunkAPI.dispatch(registerUserRejected(error));
//   }
// });

// export const loginUser = createAsyncThunk('user/login', async (data, thunkAPI) => {
//   try {
//     const response = await axios.post('http://localhost:8080/api/auth/login', data);
//     thunkAPI.dispatch(loginUserFulfilled(response.data));
//   } catch (error) {
//     thunkAPI.dispatch(loginUserRejected(error));
//   }
// });