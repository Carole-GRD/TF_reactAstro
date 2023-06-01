
import { useSelector, useDispatch } from 'react-redux';
import { currentOrderActionAddArticle, currentOrderActionRemoveArticle } from '../../store/actions/order.action';
import style from './basket.module.css';




const CurrentOrder = () => {

    const dispatch = useDispatch();

    const currentOrder = useSelector(state => state.order.currentOrder);
    const articles = useSelector(state => state.order.articles);


    // ===============================================================================================================================
    // Si l'utilisateur n'a pas de commande en cours, on retourne un message ...
    // ===============================================================================================================================
    if (!currentOrder) {
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
    const onIncrArticle = (articleId, quantity, storeId, increment, link) => {
        console.log('onIncrArticle : ... ↓');
        console.log(' -> articleId : ', articleId);
        console.log(' -> quantity : ', quantity);
        // console.log(' -> newQuantity : ', newQuantity);
        console.log(' -> storeId : ', storeId);
        console.log(' -> link : ', link);


        // l'identifiant de la commande pour l'url est récupérer dans l'action grâce au thunkAPI
        // Data à envoyer (voir insomnia) :
        //  {
		// 	    "ArticleId": 1,
		// 	    "quantity": 1,
		// 	    "store": 5
	    //  }


        if (increment === 'plus') {
            // On ajoute un article
            newQuantity = quantity + 1;
            dispatch(currentOrderActionAddArticle({articleId, newQuantity, storeId}));
        }
        else if (increment === 'min' && quantity > 1) {
            // On retire un article (cas où l'article a une quantité supérieure à 1)
            newQuantity = quantity - 1;
            dispatch(currentOrderActionAddArticle({articleId, newQuantity, storeId}));          
        }
        else {
            // On supprime un article (cas où l'article a une quantité égale à 1)
            // console.log(' -> supprimer l\'article !!!! ', ' -> LINK : ', link);
            dispatch(currentOrderActionRemoveArticle(link));
        }    

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
                <p>Mode de paiement : {currentOrder.payment_method}</p>
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