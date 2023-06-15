
// auth.action.jsx

import { createAction, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios'; 

import { validateToken } from '../../api/auth.api'; 

const URL__API__ASTRO = import.meta.env.VITE_URL__API__ASTRO;


// /////////////////////////////////////////////////////////////////////////////////////////////////


export const registerUser = createAsyncThunk('user/register', 

    async (data, thunkAPI) => { 
        
        const response = await axios.post(`${URL__API__ASTRO}/auth/register`, data); 
        
        const token = response.data.result.token;
        console.log('auth.action.jsx - token : ', token);
        localStorage.setItem('authToken', token);

        return response.data; 

    } 
); 


// /////////////////////////////////////////////////////////////////////////////////////////////////


export const loginUser = createAsyncThunk('user/login', 

    async (data, thunkAPI) => { 

        try {

            const response = await axios.post(`${URL__API__ASTRO}/auth/login`, data); 
            
            const token = response.data.result.token;
            localStorage.setItem('authToken', token);

            return response.data.result; 

        } catch (error) {

            console.log('Erreur lors de l\'authentification :', error);
            
        }
    } 
); 


// /////////////////////////////////////////////////////////////////////////////////////////////////


export const logoutUser = createAction('user/logout');


// /////////////////////////////////////////////////////////////////////////////////////////////////


export const getUserById = createAsyncThunk('user/getById',

    async (userId) => {
        
        const response = await axios.get(`${URL__API__ASTRO}/user/${userId}`);
        return response.data.result;
        

    }

);


// /////////////////////////////////////////////////////////////////////////////////////////////////


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






