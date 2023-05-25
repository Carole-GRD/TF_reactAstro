import { createReducer } from '@reduxjs/toolkit';
import { articlesActionSave } from '../actions/articles.action';

const initialState = {
    articles: []
  };
  
  const articlesReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(articlesActionSave.fulfilled , (state, action) => {
        // console.log('action.payload : ', action.payload);
        
        const articles = action.payload;
        console.log('articles : ', articles);
        
        state.articles.push(action.payload);
        // state.allOrders = orders.filter((order) => order.order_status !== 'En attente');
        // state.currentOrder = orders.find((order) => order.order_status === 'En attente');
      });
  });
  
  
  
  export default articlesReducer;