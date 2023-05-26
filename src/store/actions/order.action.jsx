

import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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



export const orderActionClear = createAction('ordersByUser/clear');



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
      console.log('articleData : ', articleData);


      const response = await axios.post(`http://localhost:8080/api/order/${orderId}/createArticle`, articleData);
      console.log('createArticle.api (response.data) : ', response.data);


      // ThunkAPI => Permet d'obtenir dans l'action : le store, le distpacher, ...
      thunkAPI.dispatch(currentOrderActionSave());
      // console.log('orderState:', orderState);
      

      return response.data;



      // const response = await axios.get(`http://localhost:8080/api/order/user/${userId}`);
      // // console.log('response.data.results : ', response.data.results);
      // return response.data.results;
    } 
    catch (error) {
      console.error('Erreur lors de la création du lien vers l\'article : ', error);
    }
  }
);








// export const currentOrderActionAddArticle = createAsyncThunk(
//   'ordersByUser/addArticle',
//   async ({orderId, articleId, storeId, newQuantity}, thunkAPI) => {
//     try {

//       // ThunkAPI => Permet d'obtenir dans l'action : le store, le distpacher, ...

//       // console.log("action:articleId ", articleId)
//       // console.log("action:storeId ", storeId)
   
//       // Requête AJAX vers le serveur Backend
//       const response1 = await axios.get(`http://localhost:8080/api/article/${articleId}/store/${storeId}`);
//       const articleToAdd = response1.data.result;
//       // console.log("articleToAdd = response1.data.result ", articleToAdd);

//       const articleData = {
//         ArticleId: articleToAdd.ArticleId,
//         quantity: newQuantity,
//         store: storeId
//       };

//       // console.log('articleData : ', articleData);
//       // console.log('commande n° : ', orderId);

//       const response3 = await axios.post(`http://localhost:8080/api/order/${orderId}/createArticle`, articleData);
//       console.log('createArticle.api (response3.data) : ', response3.data);

//       return response3.data;
//     } 
//     catch (error) {
//       console.error('Erreur lors de la création du lien vers l\'article : ', error);
//     }
//   }
// );

