

import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Récupérer la commande en cours pour l'affichage
// -----------------------------------------------
export const currentOrderActionSave = createAsyncThunk(
  // 'currentOrder/save',
  'ordersByUser/save',
  async (_, thunkAPI) => {
    try {
      // ThunkAPI => Permet d'obtenir dans l'action : le store, le distpacher, ...
      const userState = thunkAPI.getState().auth;
      // console.log('orderState:', orderState);
      const userId = userState.userId;
      // console.log('Order ID:', orderId);

      const response = await axios.get(`http://localhost:8080/api/order/user/${userId}`);
      // console.log('response.data.results : ', response.data.results);

      return response.data.results;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la commande : ', error);
      throw error;
    }
  }
);


// Supprimer la commande en cours lorsque l'utilisateur se déconnecte (logout -> voir header.jsx)
// ----------------------------------------------------------------------------------------------
export const currentOrderActionClear = createAction('ordersByUser/clear');



// Ajouter ou mettre à jour un article dans la commande en cours
// -------------------------------------------------------------
export const currentOrderActionAddArticle = createAsyncThunk(
  'ordersByUser/addArticle',
  async ({articleId, newQuantity, storeId}, thunkAPI) => {
    try {

      // ThunkAPI => Permet d'obtenir dans l'action : le store, le distpacher, ...
      const orderState = thunkAPI.getState().order;
      // console.log('orderState:', orderState);
      const orderId = orderState.currentOrder.id;
      // console.log('Order ID:', orderId);


      const articleData = {
        ArticleId: articleId,
        quantity: newQuantity,
        store: storeId
      };
      // console.log('articleData : ', articleData);


      const response = await axios.post(`http://localhost:8080/api/order/${orderId}/createArticle`, articleData);
      // console.log('createArticle.api (response.data) : ', response.data);


      // ThunkAPI => Permet d'obtenir dans l'action : le store, le distpacher, ...
      thunkAPI.dispatch(currentOrderActionSave());
      // console.log('orderState:', orderState);
      

      return response.data;

    } 
    catch (error) {
      console.error('Erreur lors de la création du lien vers l\'article : ', error);
    }
  }
);





// Supprimer un article dans la commande en cours
// ----------------------------------------------
export const currentOrderActionRemoveArticle = createAsyncThunk(
  'ordersByUser/removeArticle',
  async (link, thunkAPI) => {
    try {
      console.log('order.action - link:', link);

      // ThunkAPI => Permet d'obtenir dans l'action : le store, le distpacher, ...
      const orderState = thunkAPI.getState().order;
      // console.log('orderState:', orderState);
      const orderId = orderState.currentOrder.id;
      console.log('Order ID:', orderId);

      await axios.delete(`http://localhost:8080/api/order/${orderId}/deleteArticle`, { data : {link: link} });

      // ThunkAPI => Permet d'obtenir dans l'action : le store, le distpacher, ...
      thunkAPI.dispatch(currentOrderActionSave());
      // console.log('orderState:', orderState);

    } 
    catch (error) {
      console.error('Erreur lors de la suppression du lien vers l\'article : ', error);
    }
  }
);

