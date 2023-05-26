
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { currentOrderActionAddArticle } from '../../store/actions/order.action';
import style from './basket.module.css';




const CurrentOrder = () => {

    const dispatch = useDispatch();

    const currentOrder = useSelector(state => state.order.currentOrder);
    const articles = useSelector(state => state.order.articles);

    if (!currentOrder) {
        return (
            <article className={style['data']}>
                <p>Vous n'avez pas de commande en cours pour le moment.</p>
                <p>Parcourez notre catalogue et ajoutez des produits à votre panier pour commencer une nouvelle commande !</p>
            </article>
        )
    }


    let total = 0;
    for (let article of articles) {
        total += parseInt((article.Stores.find(store => store.id === (currentOrder.Article_Orders.find(a => a.ArticleId === article.id).store)).MM_Article_Store.price * currentOrder.Article_Orders.find(a => a.ArticleId === article.id).quantity).toFixed(2));
    }
    // console.log('total : ', total);


    let newQuantity;
    const onIncrArticle = (articleId, quantity, storeId) => {
        console.log('onIncrArticle : ... ↓');
        console.log(' -> articleId : ', articleId);
        console.log(' -> newQuantity : ', newQuantity);
        console.log(' -> storeId : ', storeId);

        // l'identifiant de la commande pour l'url est récupérer dans l'action grâce au thunkAPI
        // Data à envoyer (voir insomnia) :
        //  {
		// 	    "ArticleId": 1,
		// 	    "quantity": 1,
		// 	    "store": 5
	    //  }
        newQuantity = quantity + 1;

        dispatch(currentOrderActionAddArticle({articleId, newQuantity, storeId}));
        



    }

    const onDecrArticle = (articleId, quantity) => {
        console.log('onDecrArticle', ' -> articleId : ', articleId, ' -> quantity : ', quantity);
    }

    

    return (

        <>
                <article className={style['data']}>
                <p>Statut de la commande : {currentOrder.order_status}</p>
                <p>Statut de l'envoi : {currentOrder.sending_status}</p>
                <p>Mode de paiement : {currentOrder.payment_method}</p>
                <p>Status de paiement : {currentOrder.payment_status}</p>

                <p>Articles : </p>
                <table>
                    <thead>
                        <tr>
                            <th>Articles</th>
                            <th>Magasin</th>
                            <th>Prix unitaire</th>
                            <th>Quantité</th>
                            <th></th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articles.map(article => (
                                <tr key={article.id}>
                                    {/* Nom de l'article */}
                                    <td>{article.name}</td>
                                    {/* Nom du magasin */}
                                    <td>{article.Stores.find(store => store.id === (currentOrder.Article_Orders.find(a => a.ArticleId === article.id).store)).name}</td> 
                                    {/* Prix unitaire */}
                                    <td>{article.Stores.find(store => store.id === (currentOrder.Article_Orders.find(a => a.ArticleId === article.id).store)).MM_Article_Store.price.toFixed(2)} €</td> 
                                    {/* Quantité */}
                                    <td>{currentOrder.Article_Orders.find(a => a.ArticleId === article.id).quantity}</td>
                                    <td>
                                        <button 
                                            onClick={() => { onIncrArticle(
                                                article.id, 
                                                currentOrder.Article_Orders.find(a => a.ArticleId === article.id).quantity,
                                                article.Stores.find(store => store.id === (currentOrder.Article_Orders.find(a => a.ArticleId === article.id).store)).id
                                            )}}>
                                                +
                                        </button>
                                        /
                                        <button 
                                            onClick={() => { onDecrArticle(
                                                article.id, 
                                                currentOrder.Article_Orders.find(a => a.ArticleId === article.id).quantity,
                                                article.Stores.find(store => store.id === (currentOrder.Article_Orders.find(a => a.ArticleId === article.id).store)).id
                                                )}}>
                                                    -
                                        </button>
                                    </td>
                                    {/* Prix pour cet article en fonction de la quantité */}
                                    <td>{(article.Stores.find(store => store.id === (currentOrder.Article_Orders.find(a => a.ArticleId === article.id).store)).MM_Article_Store.price * currentOrder.Article_Orders.find(a => a.ArticleId === article.id).quantity).toFixed(2)} €</td>                                    
                                </tr>
                            ))    
                        }
                        <tr>
                            <td>TOTAL</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{total.toFixed(2)} €</td>
                        </tr>
                    </tbody>
                </table>   

                <button className={style['btn-current-order']}>Commander</button>
            </article>
        </>
    )
}

export default CurrentOrder;