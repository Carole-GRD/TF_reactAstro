
// auth.action.jsx

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios'; 


import { validateToken } from '../../api/auth.api'; 

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

        try {

            const response = await axios.post('http://localhost:8080/api/auth/login', data); 
            
            const token = response.data.result.token;
            localStorage.setItem('authToken', token);

            return response.data.result; 

        } catch (error) {

            console.log('Erreur lors de l\'authentification :', error);
            
        }
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






// Rester connecter lors de la réactualisation de la page
export const autoAuthenticate = createAsyncThunk(
    'auth/autoAuthenticate',
    async (storedToken, thunkAPI) => {
      try {

        
        if (storedToken) {
            // Appeler l'API pour valider le token et obtenir les informations de l'utilisateur
            // voir fichier "api/auth.api.js"
            const response = await validateToken(storedToken);
            
            // Si la validation du token est réussie et les informations de l'utilisateur sont obtenues
            if (response.success) {
                return response;
            } else {
                // Si la validation du token échoue, dispatcher une action pour déconnecter l'utilisateur
                thunkAPI.dispatch(logoutUser());
              }
        }
        else {
            // Si aucun token n'est trouvé dans le localStorage, dispatcher une action pour déconnecter l'utilisateur
            thunkAPI.dispatch(logoutUser());
          }
      } catch (error) {
        // Gérez les erreurs si la validation du token échoue
        console.log('Erreur lors de l\'authentification automatique :', error);
      }
    }
  );






