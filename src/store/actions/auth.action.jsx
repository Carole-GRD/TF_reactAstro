
// auth.action.jsx

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios'; 


// /////////////////////////////////////////////////////////////////////////////////////////////////
export const registerUser = createAsyncThunk('user/register', 

    async (data, thunkAPI) => { 
        
        const response = await axios.post('http://localhost:8080/api/auth/register', data); 
        return response.data; 

    } 
); 

// export const registerUserToken = createAsyncThunk('user/registerToken', 

//     async (data, thunkAPI) => { 
        
//         const response = await axios.post('http://localhost:8080/api/auth/register', data); 
//         return response.data.token; 

//     } 
// ); 


// /////////////////////////////////////////////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////////////////////////////////////////////
export const loginUser = createAsyncThunk('user/login', 

    async (data, thunkAPI) => { 

        const response = await axios.post('http://localhost:8080/api/auth/login', data); 
        return response.data.result; 
        
    } 
); 

// export const loginUserToken = createAsyncThunk('user/loginToken', 

//     async (data, thunkAPI) => { 

//         const response = await axios.post('http://localhost:8080/api/auth/login', data); 
//         return response.data.result.token; 
        
//     } 
// ); 
// /////////////////////////////////////////////////////////////////////////////////////////////////



export const logoutUser = createAction('user/logout');


// export const popupUpdateUser = createAction('user/popupUpdate');


export const getUserById = createAsyncThunk('user/getById',

    async (userId) => {

        const response = await axios.get(`http://localhost:8080/api/user/${userId}`);
        return response.data.result;

    }

);




