

import { createReducer } from '@reduxjs/toolkit';
import { currentOrderActionAddArticle } from '../actions/order.action';

const initialState = {
  articleToAdd: {}
};

const addArticleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(currentOrderActionAddArticle, (state, action) => {
      console.log('addArticleReducer - state.currentOrder : ', state.currentOrder);
    });
});

export default addArticleReducer;