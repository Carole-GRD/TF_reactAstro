
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


    // async (data, thunkAPI) => { 

    //     const user = await axios.post('http://localhost:8080/api/auth/login', data);
                                
    //     console.log('user : ', user.data.result);
    //     console.log('userId : ', user.data.result.userToConnect.id);
        
    //     const order = await axios.get(`http://localhost:8080/api/order/user/${user.data.result.userToConnect.id}`);
    //     console.log('order.data.results : ', order.data.results);

    //     return {
    //         auth : user.data.result,
    //         order : order.data.results
    //     }   
    // } 

); 



export const logoutUser = createAction('user/logout');






