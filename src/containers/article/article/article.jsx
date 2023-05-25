

import style from './article.module.css';

import articleDefaultIMG from '../../../assets/article.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import { createArticle } from '../../../api/createArticle.api';
import { currentOrderActionAddArticle } from '../../../store/actions/order.action';
import { useEffect } from 'react';

const Article = ({id, name, Stores}) => {

    // console.log('store => ', Stores);

    // const dispatch = useDispatch();


    // Récupération de la commande en cours, puis de son identifiant
    // const currentOrder = useSelector(state => state.order.currentOrder);
    // console.log('currentOrder : ', currentOrder);
    // const orderId = currentOrder.id;


    // Création d'un tableau contenant tous les articles dans la commande en cours
    // let articlesAlreadyInOrder = [];
    // currentOrder.Articles.forEach(article => {
    //     articlesAlreadyInOrder.push({
    //         ArticleId: article.id, 
    //         quantity: article.MM_Article_Order.quantity,
    //         store: article.Stores.find(store => store.id === article.MM_Article_Order.store).id
    //     });
    // });
    // console.log('articlesAlreadyInOrder : ', articlesAlreadyInOrderCurrentOrder
    

    // Lorsqu'on clique sur "Ajouter au panier", 
    // on reçoit l'identifiant de l'article à ajouter 
    // et l'identifiant du magasin dans lequel l'article se trouve
    
    // const onAddToCurrentOrder = (articleId, storeId) => {

    //     // console.log(articleId)
    //     // console.log(storeId)
    //     // Vérifier si l'article est déjà présent dans la commande en cours
    //     // attention, il faut vérifier aussi si c'est bien l'article de ce magasin (car l'article peut se trouver dans plusieurs magasins)
    //     const isAlreadyInOrder = articlesAlreadyInOrder.find(article => 
    //             (article.id === articleId && article.store === storeId)
    //     );
    //     console.log('isAlreadyInOrder : ', isAlreadyInOrder);

    //     // Si l'article ne se trouve pas encore sur la commande,
    //     // on l'ajoute un première fois avec une quantité de 1  -> "quantity = 1"
    //     if (!isAlreadyInOrder) {
    //         // console.log('nouvel article : ', articleToAdd);
    //         console.log('1', articleId)
    //         console.log('1', storeId)
    
    //         const quantity = 1;
    //         dispatch(currentOrderActionAddArticle({orderId, articleId, storeId, newQuantity: quantity}));
    //     }
    //     else{
    //         // Si l'article se trouve déjà sur la commande en cours
    //         // on l'ajoute encore une fois en augmentant la quantité - > "quantity + 1"
    //         console.log('isAlreadyInOrder.quantity : ', isAlreadyInOrder.quantity);
           
    //         const incrQuantity = isAlreadyInOrder.quantity + 1;
    //         console.log('incrQuantity : ', incrQuantity);

    //         console.log('2', articleId)
    //         console.log('2', storeId)

    //         dispatch(currentOrderActionAddArticle({orderId, articleId, storeId, newQuantity: incrQuantity}));
    //     }

    // }



    return (
        <>
            {
                Stores.map(store =>
                    <div key={store.store_id} >
                        <section className={style['article']}>
                            <Link className={style['articleLink']} to={`/articleDetail/${id}/store/${store.store_id}`} >
                                
                                <p>{name}</p>

                                <img src={articleDefaultIMG} alt={`Image de ${name}`} />
                                
                                <p>{store.store_name}</p>
                            
                            </Link>
                            {/* <button onClick={() => { onAddToCurrentOrder(id, store.store_id) }}>Ajouter au panier</button> */}
                        </section>
                    </div>
                )
            }
        </>
    );


}

export default Article;