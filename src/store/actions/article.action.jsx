

import { createAsyncThunk } from '@reduxjs/toolkit';
// import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL__API__ASTRO = import.meta.env.VITE_URL__API__ASTRO;

// Récupérer les articles
// -----------------------
export const articleActionGetAll = createAsyncThunk(
    'article/getAll',
    async (_, thunkAPI) => {
        const response = await axios.get(`${URL__API__ASTRO}/article`);
        return response.data.results;
    }
);

export const articleActionDelete = createAsyncThunk(
    'article/delete',
    async (articleId) => {
        const response = await axios.delete(`${URL__API__ASTRO}/article/${articleId}`);
    }
)