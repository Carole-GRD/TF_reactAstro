
// auth.reducer.jsx

import { createReducer } from '@reduxjs/toolkit'; 
import { loginUser, registerUser, logoutUser, getUserById, autoAuthenticate } from '../actions/auth.action'; 

// const storedToken = localStorage.getItem('authToken') ?? null;
// const storedToken = localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null;
// const storedUserFirstname = localStorage.getItem('persist:root') ? JSON.parse(localStorage.getItem('persist:root')).userFirstname : '';
// const storedUserLastname = localStorage.getItem('persist:root') ? JSON.parse(localStorage.getItem('persist:root')).userLastname : '';

const initialState = { 
    // auth
    isConnected: false, 
    token: null, 
    errorMsg: null, 
    userId: '', 
    userRole: '', 
    userFirstname: '', 
    userLastname: '',
    userPseudo: '',
    userEmail: '',
    userAvatar: null,
    userAddressStreet: '',
    userAddressNumber: null,
    userAddressCity: '',
    userAddressPostalCode: null,
    userAddressCountry: ''
}; 

const authReducer = createReducer(initialState, (builder) => { 
    builder 
        .addCase(registerUser.fulfilled, (state, action) => { 
            state.isConnected = true; 
            state.token = action.payload.result.token;                      // payload -> response.data 
            state.userId = action.payload.result.user.id;                   // payload -> response.data 
            state.userRole = action.payload.result.user.role;               // payload -> response.data 
            state.userFirstname = action.payload.result.user.firstname;     // payload -> response.data  
            state.userLastname = action.payload.result.user.lastname;       // payload -> response.data 
            state.userPseudo = action.payload.result.user.pseudo;
            state.userEmail = action.payload.result.user.email;
            state.errorMsg = null; 
            state.userAvatar = action.payload.result.user.avatar;
            state.userAddressStreet = action.payload.result.user.address_street;
            state.userAddressNumber = action.payload.result.user.address_number;
            state.userAddressCity = action.payload.result.user.address_city;
            state.userAddressPostalCode = action.payload.result.user.address_postalCode;
            state.userAddressCountry = action.payload.result.user.address_country;
        }) 
        .addCase(loginUser.fulfilled, (state, action) => { 
            console.log('loginUser - action.payload : ', action.payload);
            // auth
            state.isConnected = true; 
            state.token = action.payload.token; 
            state.userId = action.payload.userToConnect.id; 
            state.userRole = action.payload.userToConnect.role; 
            state.userFirstname = action.payload.userToConnect.firstname; 
            state.userLastname = action.payload.userToConnect.lastname; 
            state.userPseudo = action.payload.userToConnect.pseudo;
            state.userEmail = action.payload.userToConnect.email;
            state.errorMsg = null; 
            state.userAvatar = action.payload.userToConnect.avatar;
            state.userAddressStreet = action.payload.userToConnect.address_street;
            state.userAddressNumber = action.payload.userToConnect.address_number;
            state.userAddressCity = action.payload.userToConnect.address_city;
            state.userAddressPostalCode = action.payload.userToConnect.address_postalCode;
            state.userAddressCountry = action.payload.userToConnect.address_country; 
        }) 
        .addCase(registerUser.rejected, (state, action) => { 
            state.errorMsg = 'Veuillez remplir toutes les données necessaires'; 
            console.log(action); 
        }) 
        .addCase(loginUser.rejected, (state, action) => { 
            state.errorMsg = 'Vos données sont invalides !'; 
            console.log(action); 
        }) 
        .addCase(logoutUser, (state, action) => { 
            // auth
            state.isConnected = false; 
            state.token = null; 
            state.userId = ''; 
            state.userRole = ''; 
            state.userFirstname = ''; 
            state.userLastname = ''; 
            state.userPseudo = '';
            state.userEmail = '';
            state.errorMsg = null; 
            state.userAvatar = null; 
            state.userAddressStreet = '';
            state.userAddressNumber = null;
            state.userAddressCity = '';
            state.userAddressPostalCode = null;
            state.userAddressCountry = '';
        }) 
        .addCase(getUserById.fulfilled, (state, action) => {
            console.log('getUserById - action.payload : ', action.payload);
            state.userFirstname = action.payload.firstname; 
            state.userLastname = action.payload.lastname; 
            state.userPseudo = action.payload.pseudo;
            state.userEmail = action.payload.email;
            state.userAvatar = action.payload.avatar;
            state.userAddressStreet = action.payload.address_street;
            state.userAddressNumber = action.payload.address_number;
            state.userAddressCity = action.payload.address_city;
            state.userAddressPostalCode = action.payload.address_postalCode;
            state.userAddressCountry = action.payload.address_country; 
        })
        .addCase(autoAuthenticate.fulfilled, (state, action) =>  {
            // console.log('autoAuthenticate - action.payload : ', action.payload);
            // auth
            state.isConnected = true; 
            state.token = localStorage.getItem('authToken'); 
            state.userId = action.payload.userToConnect.id; 
            state.userRole = action.payload.userToConnect.role; 
            state.userFirstname = action.payload.userToConnect.firstname; 
            state.userLastname = action.payload.userToConnect.lastname; 
            state.userPseudo = action.payload.userToConnect.pseudo;
            state.userEmail = action.payload.userToConnect.email;
            state.errorMsg = null; 
            state.userAvatar = action.payload.userToConnect.avatar;
            state.userAddressStreet = action.payload.userToConnect.address_street;
            state.userAddressNumber = action.payload.userToConnect.address_number;
            state.userAddressCity = action.payload.userToConnect.address_city;
            state.userAddressPostalCode = action.payload.userToConnect.address_postalCode;
            state.userAddressCountry = action.payload.userToConnect.address_country; 
        })
}); 

export default authReducer;


