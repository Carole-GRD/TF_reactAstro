
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { currentOrderActionAddArticle, currentOrderActionRemoveArticle, currentOrderActionSave } from '../../store/actions/order.action';
import style from './basket.module.css';




const CurrentOrder = () => {

    const dispatch = useDispatch();

    const currentOrder = useSelector(state => state.order.currentOrder);
    const articles = useSelector(state => state.order.articles);
    
    // console.log('articles : ', articles);
    // console.log('articles.length : ', articles.length);

    // articles ? console.log('article') : console.log('vide');
    // articles.length !== 0 ? console.log('article') : console.log('vide');
   

    const { register, handleSubmit, reset } = useForm();


    // ===============================================================================================================================
    // Si l'utilisateur n'a pas de commande en cours, on retourne un message ...
    // ===============================================================================================================================
    if (!currentOrder || articles.length === 0) {
        return (
            <article className={style['data']}>
                <p>Vous n'avez pas de commande en cours pour le moment.</p>
                <p>Parcourez notre catalogue et ajoutez des produits à votre panier pour commencer une nouvelle commande !</p>
            </article>
        )
    }


    // ===============================================================================================================================
    // Calcul du total de la commande en cours
    // ===============================================================================================================================
    let total = 0;
    for (let article_order of currentOrder.Article_Orders) {
        // console.log('total : ', total.toFixed(2));
        // console.warn('article_order : ', article_order);
       
        // total += prix * réduction * quantité;
        total +=    article_order.Article.Stores.find(store => store.id === article_order.store).MM_Article_Store.price
                    * 
                    (1 - article_order.Article.Stores.find(store => store.id === article_order.store).MM_Article_Store.discount) 
                    * 
                    article_order.quantity;                 
    }
    // console.log('total : ', total.toFixed(2));



    // ===============================================================================================================================
    // Fonction qui permet d'ajouter ou retirer un article de la commande en cours  (lancée au clique sur les boutons + et -)
    // ===============================================================================================================================
    let newQuantity;
    // ↓ IMPORTANT : initialisation de "orderId" après avoir vérifier s'il y a une commande en cours (au sinon, il n'y a pas de "currentOrder.id")
    const orderId = currentOrder.id;     
    const onIncrArticle = (articleId, quantity, storeId, increment, article_order_Id) => {

        if (increment === 'plus') {
            // On ajoute un article
            newQuantity = quantity + 1;
            dispatch(currentOrderActionAddArticle({articleId, newQuantity, storeId, orderId}));
        }
        else if (increment === 'min' && quantity > 1) {
            // On retire un article (cas où l'article a une quantité supérieure à 1)
            newQuantity = quantity - 1;
            dispatch(currentOrderActionAddArticle({articleId, newQuantity, storeId, orderId}));          
        }
        else {
            // On supprime un article (cas où l'article a une quantité égale à 1)
            // console.log(' -> supprimer l\'article !!!! ', ' -> LINK : ', link);
            dispatch(currentOrderActionRemoveArticle(article_order_Id));
        }    

    }






    // ===============================================================================================================================
    // Choix du mode de paiement
    // ===============================================================================================================================
    const handlePaymentMethod = (data) => {
        // console.log('data : (mode de paiement) : ', data);

        axios.put(`http://localhost:8080/api/order/${orderId}`, data);

        dispatch(currentOrderActionSave());
        
        reset();
    }


    const handleChangePaymentMethod = () => {

        axios.put( `http://localhost:8080/api/order/${orderId}`, {payment_method: null} );

        dispatch(currentOrderActionSave());
    }





    // ===============================================================================================================================
    // Rendu de la commande en cours
    // ===============================================================================================================================
    return (

        <>
                <article className={style['data']}>

                {/* Infos sur la commande en cours */}
                <p>Statut de la commande : {currentOrder.order_status}</p>
                <p>Statut de l'envoi : {currentOrder.sending_status}</p>

                {/* TODO : créer une route patch pour modifier "payment_method" */}
                { 

                    currentOrder.payment_method ? 

                        ( 
                            <form onSubmit={handleSubmit(handleChangePaymentMethod)}>
                                <p>Mode de paiement : {currentOrder.payment_method}</p>
                                <button type="submit">Changer le mode de paiement</button> 
                            </form>

                        ) : (
                        
                            <form onSubmit={handleSubmit(handlePaymentMethod)}>

                                <fieldset>
                                    <legend>Choisissez un mode de paiement :</legend>

                                    <div>
                                        <input
                                            type="radio"
                                            id="Visa"
                                            name="payment_method"
                                            value="Visa"
                                            {...register('payment_method')}
                                        />
                                        <label htmlFor="Visa">Visa</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="Maestro"
                                            name="payment_method"
                                            value="Maestro"
                                            {...register('payment_method')}
                                        />
                                        <label htmlFor="Maestro">Maestro</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="Payconiq"
                                            name="payment_method"
                                            value="Payconiq"
                                            {...register('payment_method')}
                                        />
                                        <label htmlFor="Payconiq">Payconiq</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="PayPal"
                                            name="payment_method"
                                            value="PayPal"
                                            {...register('payment_method')}
                                        />
                                        <label htmlFor="PayPal">PayPal</label>
                                    </div>

                                    <button type='submit'>Confirmer</button>

                                </fieldset>

                            </form>
                        )
                                
                }
                   
                
            
                <p>Status de paiement : {currentOrder.payment_status}</p>

                {/* ============================================================================================================================================= */}

                {/* Tableau reprenant tous les articles dans la commande en cours, ainsi que le total de l'ensemble de la commande  */}
                <p>Articles : </p>
                <table>
                    <thead>
                        <tr>
                            <th>Articles</th>
                            <th>Magasin</th>
                            <th>Prix unitaire</th>
                            <th>Réduction</th>
                            <th>Nouveau prix</th>
                            <th>Quantité</th>
                            <th></th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            
                            currentOrder.Article_Orders.map( (article_order) => (
                                
                                <tr key={article_order.id}>

                                    {/* Nom de l'article */}
                                    <td>{article_order.Article.name}</td>

                                    {/* Nom du magasin */}
                                    <td>{article_order.Article.Stores.find(store => store.id === article_order.store).name}</td> 

                                    {/* Prix unitaire */}
                                    <td>{article_order.Article.Stores.find(store => store.id === article_order.store).MM_Article_Store.price.toFixed(2)} €</td> 

                                    {/* Réduction */}
                                    <td>{article_order.Article.Stores.find(store => store.id === article_order.store).MM_Article_Store.discount * 100} %</td> 

                                     {/* Prix après réduction (nouveau prix -> prix * réduction) */}
                                     <td>
                                        {
                                            (
                                                article_order.Article.Stores.find(store => store.id === article_order.store).MM_Article_Store.price
                                                * 
                                                (1 - article_order.Article.Stores.find(store => store.id === article_order.store).MM_Article_Store.discount)
                                            ).toFixed(2) 
                                        } €
                                    </td> 
                                    
                                    {/* Quantité */}
                                    <td>{article_order.quantity}</td>

                                    
                                    {/* Bouton + et - permettant d'ajouter ou retirer un article de la commande */}
                                    <td>
                                        <button 
                                            onClick={() => { onIncrArticle(
                                                article_order.Article.id, 
                                                article_order.quantity,
                                                article_order.store,
                                                'plus'
                                            )}}>
                                                +
                                        </button>
                                        /
                                        <button 
                                            onClick={() => { onIncrArticle(
                                                article_order.Article.id, 
                                                article_order.quantity,
                                                article_order.store,
                                                'min',
                                                article_order.id
                                                )}}>
                                                    -
                                        </button>
                                    </td>

                                    {/* Prix (prix * réduction * quantité) */}
                                    <td>{
                                            (
                                                article_order.Article.Stores.find(store => store.id === article_order.store).MM_Article_Store.price
                                                * 
                                                (1 - article_order.Article.Stores.find(store => store.id === article_order.store).MM_Article_Store.discount) 
                                                * 
                                                article_order.quantity
                                            ).toFixed(2) 
                                        } €
                                    </td>
                                    
                                </tr>
                            )) 
                               
                        }

                        {/* Total de l'ensemble de la commande */}
                        <tr>
                            <td>TOTAL</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{total.toFixed(2)} €</td>
                        </tr>
                    </tbody>
                </table>  


                {/* ============================================================================================================================================= */}

                <button className={style['btn-current-order']}>{'<< Continuer vos achats'}</button>
        
                <button className={style['btn-current-order']}>Commander</button>

            </article>

        </>
    )
}

export default CurrentOrder;