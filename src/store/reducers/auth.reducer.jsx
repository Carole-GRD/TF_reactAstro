
import { createReducer } from '@reduxjs/toolkit'; 
import { loginUser, registerUser, logoutUser } from '../actions/auth.action'; 

const initialState = { 
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
            // console.log('action.payload : ', action.payload);
            state.isConnected = true; 
            state.token = action.payload.result.token; 
            state.userId = action.payload.result.userToConnect.id; 
            state.userRole = action.payload.result.userToConnect.role; 
            state.userFirstname = action.payload.result.userToConnect.firstname; 
            state.userLastname = action.payload.result.userToConnect.lastname; 
            state.userPseudo = action.payload.result.userToConnect.pseudo;
            state.userEmail = action.payload.result.userToConnect.email;
            state.errorMsg = null; 
            state.userAvatar = action.payload.result.userToConnect.avatar;
            state.userAddressStreet = action.payload.result.userToConnect.address_street;
            state.userAddressNumber = action.payload.result.userToConnect.address_number;
            state.userAddressCity = action.payload.result.userToConnect.address_city;
            state.userAddressPostalCode = action.payload.result.userToConnect.address_postalCode;
            state.userAddressCountry = action.payload.result.userToConnect.address_country;
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
            state.isConnected = false; 
            state.token = null; 
            state.userId = ''; 
            state.userRole = ''; 
            state.userFirstname = ''; 
            state.userLastname = ''; 
            state.userPseudo = '',
            state.userEmail = '',
            state.errorMsg = null; 
            state.userAvatar = null; 
            state.userAddressStreet = '',
            state.userAddressNumber = null,
            state.userAddressCity = '',
            state.userAddressPostalCode = null,
            state.userAddressCountry = '' 
        }); 
}); 

export default authReducer;