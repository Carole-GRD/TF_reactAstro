
// import { createAction } from '@reduxjs/toolkit';



// export const currentOrderActionSave = createAction('currentOrder/save');

// export const currentOrderActionAddArticle = createAction('currentOrder/addArticle');



// // export const currentOrderActionRemoveArticle = createAction('currentOrder/removeArticle');


// /////////////////////////////////////////////////////////////////////////////////////////




// import { createAsyncThunk } from '@reduxjs/toolkit'; 
// // import { createAction, createAsyncThunk } from '@reduxjs/toolkit'; 
// import axios from 'axios'; 


// export const currentOrderActionSave = createAsyncThunk('currentOrder/save', 
//     async () => { 
        
//         // Requete AJAX vers le serveur Backend 
//         const response = await axios.get(`http://localhost:8080/api/order/user/${userId}`)
//         return response.data; 
//     } 
// ); 





// export const currentOrderActionAddArticle = createAsyncThunk('currentOrder/addArticle', 
    
//     function createArticle async (orderId, articleIdToAdd, storeId, newQuantity) => { 
        
//         // Requete AJAX vers le serveur Backend 
//         try {
//             // Récupérer l'article à ajouter dans le bon magasin (article sur lequel l'utilisateur a cliqué)
//             const response1 = await axios.get(`http://localhost:8080/api/article/${articleIdToAdd}/store/${storeId}`);
//             const articleToAdd = response1.data.result;
//             // console.log('createArticle.api (response1.data.result) : ', articleToAdd);
            
//             const articleData = {
//                 id: articleToAdd.ArticleId,
//                 quantity: newQuantity,
//                 store: storeId
//             }
//             console.log('articleData : ', articleData);
//             console.log('commande n° : ', orderId);
    
//             const response3 = await axios.post(`http://localhost:8080/api/order/${orderId}/createArticle`, articleData);
//             console.log('createArticle.api (response3) : ', response3);
    
//             return response3;
//         } 
//         catch (error) {
//             console.error('Erreur lors de la création de l\'article : ', error);
//             throw error;
//         }



//         return response.data; 
//     } 
// ); 



// //////////////////////////////////////////////////////////////////////////////////::


import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const currentOrderActionSave = createAsyncThunk(
  'currentOrder/save',
  async (userId) => {
    try {
        // console.log('currentOrder/save');
        // console.log('userId => ', userId);
      // Requête AJAX vers le serveur Backend
      const response = await axios.get(`http://localhost:8080/api/order/user/${userId}`);
      console.log('response.data.results : ', response.data.results);
      return response.data.results;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la commande : ', error);
      throw error;
    }
  }
);

export const currentOrderActionAddArticle = createAsyncThunk(
  'currentOrder/addArticle',
  async ({orderId, articleId, storeId, newQuantity}, thunkAPI) => {
    try {

      // ThunkAPI => Permet d'obtenir dans l'action : le store, le distpacher, ...

      // console.log("action:articleId ", articleId)
      // console.log("action:storeId ", storeId)
   
      // Requête AJAX vers le serveur Backend
      const response1 = await axios.get(`http://localhost:8080/api/article/${articleId}/store/${storeId}`);
      const articleToAdd = response1.data.result;
      // console.log("articleToAdd = response1.data.result ", articleToAdd);

      const articleData = {
        ArticleId: articleToAdd.ArticleId,
        quantity: newQuantity,
        store: storeId
      };

      // console.log('articleData : ', articleData);
      // console.log('commande n° : ', orderId);

      const response3 = await axios.post(`http://localhost:8080/api/order/${orderId}/createArticle`, articleData);
      console.log('createArticle.api (response3.data) : ', response3.data);

      return response3.data;
    } 
    catch (error) {
      console.error('Erreur lors de la création du lien vers l\'article : ', error);
    }
  }
);

