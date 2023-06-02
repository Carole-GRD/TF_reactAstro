
import style from './article-detail.module.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import article from '../../../assets/article.png';
import { currentOrderActionAddArticle, currentOrderActionSave } from '../../../store/actions/order.action';



const ArticleDetail = () => {

    const { articleId, storeId } = useParams();
    console.warn('articleId : ', articleId);
    console.warn('storeId : ', storeId);

    const [details, setDetails] = useState([]);
    const [mark, setMark] = useState();
    const [storeInfos, setStoreInfos] = useState();
    const [popup, setPopup] = useState(false); // Utilisez un état pour gérer la valeur de popup


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isConnected = useSelector(state => state.auth.isConnected);
    const currentOrder = useSelector(state => state.order.currentOrder);
    const orderId = useSelector(state => state.order.currentOrder.id);



    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/article/${articleId}`)
            .then((article) => {
                setDetails(article.data.result);
                const markId = article.data.result.MarkId;    
                console.log('markId : ', markId);

                // Attention, si l'article sur lequel l'utilisateur a cliqué est un livre, il n'y a pas de "mark"
                // Donc, on vérifie si on a récupéré un "markId" pour lancer la requête
                if (markId) {
                    // le "markId" fourni dans les parenthèses est envoyé par le "return" de la requête (voir le "then" ci-desssus)
                    axios
                    .get(`http://localhost:8080/api/mark/${markId}`)
                        .then((mark) => {
                            setMark(mark.data.result.name)
                        }) 
                        .catch((error) => {
                            console.error('Error fetching mark:', error);
                        });   
                }       
            })
            .catch((error) => {
                console.error('Error fetching article:', error);
            });
        
        axios
            .get(`http://localhost:8080/api/article/${articleId}/store/${storeId}`)
            .then((response) => {
                setStoreInfos(response.data.result)
            })
            
    }, []);

    // console.log('details : ', details);
    // console.log('mark : ', mark);
    // console.log('storeInfos : ', storeInfos);



    const onAddToCurrentOrder = (articleId, storeId, orderId) => {
        if (!isConnected) {
            // console.warn('créer un compte ou se connecter');
            setPopup(!popup); // Mettez à jour l'état de popup en utilisant setPopup
        }
        else {
            // console.warn('ajouter l\'article');
            // console.log('articleId : ', articleId);
            // console.log('storeId : ', storeId);


            let isArticleAlreadyInOrder = false;

            // Si l'utilisateur est connecter et qu'il a une commande en cours
            // on crée un tableau contenant les identifiants des articles dans la commande
            // ainsi qu'un tableau contenant les identifiants des magasins dans lesquels se trouvent les articles
            if (currentOrder) {
                const articleIds = currentOrder.Article_Orders.map(article_order => article_order.ArticleId);
                const storeIds = currentOrder.Article_Orders.map(article_order => article_order.store);
                
                for (let i = 0; i < articleIds.length; i++) {
                    if (articleIds[i] === articleId && storeIds[i] === storeId) {
                    isArticleAlreadyInOrder = true;
                    break;
                    }
                }
            }
            
            
            console.log('isArticleAlreadyInOrder : ', isArticleAlreadyInOrder);

            const newQuantity = 1;

            if (isArticleAlreadyInOrder) {

                console.log('récupérer l\'article_order pour modifier sa quantité');
                console.log('newQuantity = quantity + 1');

                // ///////////////////////////////////////////////////////////////////
                // TODO : récupérer l'article_order pour incrémenter sa quantité
                // ///////////////////////////////////////////////////////////////////
                
                // axios
                //     .get(`http://localhost:8080/api/article/${articleId}/store/${storeId}/order/${orderId}`)
                //     .then((response) => {
                //         console.log('response : ', response);

                //         // const quantity = response.data....

                //         // newQuantity = quantity + 1;
                //     })

            }
            console.log('newQuantity : ', newQuantity);
            
            // ///////////////////////////////////////////////////////////////////
            // TODO : lancer l'action currentOrderActionAddArtticle
            // ///////////////////////////////////////////////////////////////////

            dispatch(currentOrderActionSave());
        }
    }

    


    return (
        <div className={style['articleDetail-container']}>
   
            <Link to="/articles" className={style['link-back']}>
                Retour à la liste des articles
            </Link>
            

            <div className={style['articleDetail-content']}>

                {   
                    popup && (
                        <section className={style['article']}>

                            <p>Connectez-vous ou créez un compte</p>

                            <div className={style['popup-btn']}>
                                <button onClick={() => { navigate('/login') }}>Se connecter</button>
                                <button onClick={() => { navigate('/register') }}>Créer un compte</button>
                                <button onClick={() => { setPopup(!popup) }}>Annuler</button>
                            </div>

                        </section>
                    )
                }

                
                {   
                    !popup && (
                        <section className={style['article']}>
                
                            <p>{details.name}</p>

                            {mark && <p>{mark}</p>}

                            {details.author && <p>Auteur(s) : {details.author}</p>}

                            <p>Référence : {details.reference}</p>
                        
                            <img src={article} alt={`Image de ${details.name}`} />

                            <p className={style.description}>{details.description}</p>

                            {   
                                storeInfos && (
                                    <p>Prix : {storeInfos.price.toFixed(2)} €</p>
                            )}

                            {
                                (storeInfos && (storeInfos.discount !== 0)) && (
                                    <>
                                        <p>Réduction : {storeInfos.discount * 100}%</p>
                                        <p>Nouveau prix : {(storeInfos.price * (1 - storeInfos.discount)).toFixed(2)} €</p>
                                    </>
                            )}


                            <button onClick={() => { onAddToCurrentOrder(storeInfos.ArticleId, storeInfos.StoreId, orderId) }}>
                                Ajouter au panier
                            </button>

                        </section>
                    )
                }
             
            </div>
        </div>

    )

}

export default ArticleDetail;