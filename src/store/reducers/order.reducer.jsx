

// import { createReducer } from '@reduxjs/toolkit';
// import { currentOrderActionSave } from '../actions/order.action';

// const initialState = {
//   allOrders: [],
//   currentOrder: null,
//   articles: []
// };

// const currentOrderReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(currentOrderActionSave.fulfilled, (state, action) => {
//       // console.log('action.payload : ', action.payload);
      
//       const orders = action.payload;
//       // console.log('orders : ', orders);

//       state.allOrders = orders.filter((order) => order.order_status !== 'En attente');

//       const currentOrder = orders.find((order) => order.order_status === 'En attente');
//       // console.log('currentOrder : ', currentOrder);
//       state.currentOrder = currentOrder;
      
//       // console.log('currentOrder.Article_Orders.map(article => article.Article) : ', currentOrder.Article_Orders.map(article => article.Article));
//       const allArticles = currentOrder.Article_Orders.map(article => article.Article);
//       state.articles = allArticles;
//     });
// });



export default currentOrderReducer;