

import { createReducer } from '@reduxjs/toolkit';
import { currentOrderActionSave/*, currentOrderActionAddArticle, currentOrderActionRemoveArticle*/ } from '../actions/order.action';


// "immer" est présent dans le toolkit -> on ne doit pas l'installer !

const initialState = {
    allOrders: [],
    currentOrder: null
}

const currentOrderReducer = createReducer(initialState, builder => {
    builder 
        .addCase(currentOrderActionSave, (state, action) => {
            const orders = action.payload;

            state.allOrders = orders.filter(order => order.order_status !== 'En attente');
            state.currentOrder = orders.find(order => order.order_status === 'En attente')
        })
        // .addCase(currentOrderActionAddArticle, (state) => {
        //     state.countArticles = state.countArticles++;
        // })
        // .addCase(currentOrderActionRemoveArticle, (state) => {
        //     state.countArticles = state.countArticles--;
        // })
})


export default currentOrderReducer;


// REMARQUE : en fonction de la manière dont on utilise l'action :
    // presenceActionRemovePerson( 42 )            -> action.payload
    // presenceActionRemovePerson( {id: 42} )      -> action.payload.id



