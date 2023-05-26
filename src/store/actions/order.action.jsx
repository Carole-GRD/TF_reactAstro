

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const currentOrderActionSave = createAsyncThunk(
//   'currentOrder/save',
//   async (userId) => {
//     try {
//         // console.log('currentOrder/save');
//         // console.log('userId => ', userId);
//       // Requête AJAX vers le serveur Backend
//       const response = await axios.get(`http://localhost:8080/api/order/user/${userId}`);
//       // console.log('response.data.results : ', response.data.results);
//       return response.data.results;
//     } catch (error) {
//       console.error('Erreur lors de la sauvegarde de la commande : ', error);
//       throw error;
//     }
//   }
// );

// export const currentOrderActionAddArticle = createAsyncThunk(
//   'currentOrder/addArticle',
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

