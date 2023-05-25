import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const articlesActionSave = createAsyncThunk(
  'articles/save',
  async ({ArticleId, StoreId}) => {
    try {
        // console.log('currentOrder/save');
        // console.log('userId => ', userId);
      // Requête AJAX vers le serveur Backend
      const response = await axios.get(`http://localhost:8080/api/article/${ArticleId}/store/${StoreId}`);
      console.log('response.data.results (articles) : ', response.data.results);
      return response.data.results;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la commande : ', error);
      throw error;
    }
  }
);