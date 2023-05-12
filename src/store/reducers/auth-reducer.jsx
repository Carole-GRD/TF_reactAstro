
import { createReducer } from '@reduxjs/toolkit'; 
import { loginUser, registerUser, logoutUser } from '../actions/auth-action'; 

const initialState = { 
    isConnected: false, 
    token: null, 
    errorMsg: null, 
    userId: '', 
    userRole: '', 
    userFirstName: '', 
    userLastName: '',
    userAvatar: null 
}; 

const authReducer = createReducer(initialState, (builder) => { 
    builder 
        .addCase(registerUser.fulfilled, (state, action) => { 
            state.isConnected = true; 
            state.token = action.payload.token;                    // payload -> response.data 
            state.userId = action.payload.userId;                  // payload -> response.data 
            state.userRole = action.payload.userRole;              // payload -> response.data 
            state.userFirstName = action.payload.userFirstName;    // payload -> response.data  
            state.userLastName = action.payload.userLastName;      // payload -> response.data 
            state.errorMsg = null; 
            state.userAvatar = action.payload.userAvatar;
        }) 
        .addCase(loginUser.fulfilled, (state, action) => { 
            state.isConnected = true; 
            state.token = action.payload.result.token; 
            state.userId = action.payload.result.userToConnect.id; 
            state.userRole = action.payload.result.userToConnect.role; 
            state.userFirstName = action.payload.result.userToConnect.firstname; 
            state.userLastName = action.payload.result.userToConnect.lastname; 
            state.errorMsg = null; 
            state.userAvatar = action.payload.result.userToConnect.avatar;
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
            state.userFirstName = ''; 
            state.userLastName = ''; 
            state.errorMsg = null; 
            state.userAvatar = null;
        }); 
}); 

export default authReducer;