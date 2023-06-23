

import { createReducer } from '@reduxjs/toolkit';
import { articleActionGetAll } from '../actions/article.action';

const initialState = {
    listArticles: []
};

const articleReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(articleActionGetAll.fulfilled, (state, action) => {
            console.log('action.payload : ', action.payload);
            state.listArticles = action.payload;
        })
})

export default articleReducer;