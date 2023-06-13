

import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Récupérer la commande en cours pour l'affichage
// -----------------------------------------------
export const currentOrderActionSave = createAsyncThunk(
    // 'currentOrder/save',
    'ordersByUser/save',
    async (_, thunkAPI) => {

        try {
            // Utiliser une Promise pour attendre que l'ID de l'utilisateur soit disponible
            await new Promise((resolve) => {
                const intervalId = setInterval(() => {
                    // ThunkAPI => Permet d'obtenir dans l'action : le store, le distpacher, ...
                    const state = thunkAPI.getState();
                    const userId = state.auth.userId;
                    if (userId) {
                        clearInterval(intervalId);
                        resolve();
                    }
                }, 100); // Attendre 100 millisecondes avant chaque vérification
            });

            // Une fois que l'ID est disponible, on le récupère
            const state = thunkAPI.getState();
            const userId = state.auth.userId;
            if (!userId) {
                throw new Error('User ID is not available.');
            }

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
  async ({articleId, newQuantity, storeId, orderId}, thunkAPI) => {
    try {

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
      throw error;
    }
  }
);





// Supprimer un article dans la commande en cours
// ----------------------------------------------
export const currentOrderActionRemoveArticle = createAsyncThunk(
  'ordersByUser/removeArticle',
  async (article_order_Id, thunkAPI) => {
    try {
      // console.log('order.action - article_order_Id:', article_order_Id);

      // ThunkAPI => Permet d'obtenir dans l'action : le store, le distpacher, ...
      const orderState = thunkAPI.getState().order;
      // console.log('orderState:', orderState);
      const orderId = orderState.currentOrder.id;
      // console.log('Order ID:', orderId);

      await axios.delete(`http://localhost:8080/api/order/${orderId}/deleteArticle`, { data : {link: article_order_Id} });


      // Appeler l'action qui permet de récupérer les commandes (après avoir supprimer l'article)
      await thunkAPI.dispatch(currentOrderActionSave());
      // console.log('orderState:', orderState);



      // Vérifier s'il y a encore des articles dans la commande en cours
      // ↓ "isArticle" retourne le nombre d'articles dans la commande en cours
      const isArticle = thunkAPI.getState().order.articles.length;
      // console.log('isArticle:', isArticle);  

      // S'il n'y a plus d'article dans la commande en cours, on supprime la commande en cours
      if (isArticle === 0) {
        await axios.delete(`http://localhost:8080/api/order/${orderId}`);
        // Actualiser les commandes après suppression du lien
        thunkAPI.dispatch(currentOrderActionSave());
      }


    } 
    catch (error) {
      console.error('Erreur lors de la suppression du lien vers l\'article : ', error);
    }
  }
);

