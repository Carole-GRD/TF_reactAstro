
// auth.action.jsx

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios'; 



export const registerUser = createAsyncThunk('user/register', 

    async (data, thunkAPI) => { 
        
        const response = await axios.post('http://localhost:8080/api/auth/register', data); 
        return response.data; 

    } 
); 



export const loginUser = createAsyncThunk('user/login', 

    async (data, thunkAPI) => { 

        const response = await axios.post('http://localhost:8080/api/auth/login', data); 
        return response.data.result; 
        
    } 
); 



export const logoutUser = createAction('user/logout');


export const popupUpdateUser = createAction('user/popupUpdate');




