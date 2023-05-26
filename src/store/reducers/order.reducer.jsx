

import { createReducer } from '@reduxjs/toolkit';
import { currentOrderActionSave, orderActionClear, currentOrderActionAddArticle } from '../actions/order.action';

const initialState = {
    allOrders: [],
    currentOrder: null,
    articles: []
};

const currentOrderReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(currentOrderActionSave.fulfilled, (state, action) => {
          // console.log('action.payload : ', action.payload);
          
          const orders = action.payload;
          if (orders.length > 0) {
              state.allOrders = orders.filter((order) => order.order_status !== 'En attente');


              const currentOrder = orders.find((order) => order.order_status === 'En attente');
              // console.log('currentOrder : ', currentOrder);
                  
              if (currentOrder) {
                  state.currentOrder = currentOrder;
                  // console.log('currentOrder.Article_Orders.map(article => article.Article) : ', currentOrder.Article_Orders.map(article => article.Article));
                  const allArticles = currentOrder.Article_Orders.map(article => article.Article);
                  state.articles = allArticles;
              }
              else {
                  state.currentOrder = null;
                  state.articles = []
              }
          }
          else {
              state.allOrders = [],
              state.currentOrder = null,
              state.articles = []
          }
        })
      .addCase(orderActionClear, (state) => {
          state.allOrders = [],
          state.currentOrder = null,
          state.articles = []
      })
      .addCase(currentOrderActionAddArticle, (state, action) => {
          console.log('addArticleReducer - action.payload : ', action.payload);
          // state.articleToAdd = action.payload;
      })
});



export default currentOrderReducer;