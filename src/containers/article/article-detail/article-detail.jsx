
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import style from './article-detail.module.css';
import article from '../../../assets/article.png';
import { currentOrderActionAddArticle, currentOrderActionSave } from '../../../store/actions/order.action';




    // TODO : créer des composants pour article-detail (popup (+ détails ?) )




const ArticleDetail = () => {


    const userRole = useSelector(state => state.auth.userRole);
    console.log('userRole : ', userRole);



    const { articleId, storeId } = useParams();
    // console.warn('articleId : ', articleId);
    // console.warn('storeId : ', storeId);

    const [details, setDetails] = useState([]);
    const [mark, setMark] = useState();
    const [storeInfos, setStoreInfos] = useState();
    const [popup, setPopup] = useState(false); // Utiliser un état pour gérer la valeur de popup


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isConnected = useSelector(state => state.auth.isConnected);
    const userId = useSelector(state => state.auth.userId);
    const currentOrder = useSelector(state => state.order.currentOrder);
    


    useEffect(() => {

        // On récuprère l'article afin d'accéder à ses détails (nom, description, référence, auteur, MarkId)
        // et grâce au "MarkId", on peut récupérer le nom de la marque
        axios
            .get(`http://localhost:8080/api/article/${articleId}`)
            .then((article) => {
                setDetails(article.data.result);
                const markId = article.data.result.MarkId;    
                // console.log('markId : ', markId);

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
        
        // On récupère les informations sur l'article (prix, réduction, stock) en fonction du magasin dans lequel il se trouve
        axios
            .get(`http://localhost:8080/api/article/${articleId}/store/${storeId}`)
            .then((response) => {
                setStoreInfos(response.data.result)
            })
            .catch((error) => {
                console.error('Error fetching Article By Id And By Store :', error);
            });
            
    }, []);

    // console.log('details : ', details);
    // console.log('mark : ', mark);
    // console.log('storeInfos : ', storeInfos);



    const onAddToCurrentOrder = async (articleId, storeId, userId) => {
        if (!isConnected) {
            // console.warn('créer un compte ou se connecter');
            setPopup(!popup); // Mettez à jour l'état de popup en utilisant setPopup
        }
        else {
            // console.warn('ajouter l\'article');
            // console.log('articleId : ', articleId);
            // console.log('storeId : ', storeId);


            let newQuantity = 1;

            // Vérifier si l'utilisateur a déjà une commande en cours pour pouvoir ajouter l'article
            // S'il n'a pas de commande en cours, il faut commencer par créer une commande, avant d'ajouter l'article !!!
            if (!currentOrder) {
                const orderData = {
                    order_status: 'En attente',
                    sending_status: 'en attente',
                    payment_method: null,
                    payment_status: 'En attente',
                    UserId: userId
                }
                // console.log('orderData : ', orderData);
                await axios.post('http://localhost:8080/api/order', orderData)
                            .then((newOrder) => {
                                // console.log('newOrder (id) : ', newOrder.data.result.id);
                                const orderId =  newOrder.data.result.id;
                                dispatch(currentOrderActionSave());
                                // Lancer l'action currentOrderActionAddArtticle
                                dispatch(currentOrderActionAddArticle({articleId, newQuantity, storeId, orderId}));
                            }) 
                            .catch((error) => {
                                console.error('Error creating order:', error);
                            });                       
            }
            else {
                // Si l'utilisateur est connecté et qu'il a une commande en cours
                // on vérifie si l'article est déjà dans la commande
                const isArticleAlreadyInOrder = currentOrder && currentOrder.Article_Orders.some(
                    (articleOrder) => articleOrder.ArticleId === articleId && articleOrder.store === storeId
                );
                
                // Ensuite, si l'article est déjà dans la commande, on augmente sa quantité de 1
                if (isArticleAlreadyInOrder) {
                    const articleOrder = currentOrder.Article_Orders.find(
                        (articleOrder) => articleOrder.ArticleId === articleId && articleOrder.store === storeId
                    );
                    newQuantity = articleOrder.quantity + 1;
                }

                const orderId = currentOrder.id;

                // Lancer l'action currentOrderActionAddArtticle
                 dispatch(currentOrderActionAddArticle({articleId, newQuantity, storeId, orderId}));

            }
  
        }
    }


    const onArticleUpdate = (articleId, storeId) => {
        console.log('Naviguer vers le formulaire pour modifier l\'article !');
        console.log('articleId : ', articleId);
        console.log('storeId : ', storeId);
        navigate(`/articleForm/${articleId}/store/${storeId}`);
    }

    


    return (
        <div className={style['articleDetail-container']}>
   
            <Link to="/articles" className={style['link-back']}>
                Retour à la liste des articles
            </Link>
            

            <div className={style['articleDetail-content']}>

                {   
                    popup ? (
                        <section className={style['article']}>

                            <p>Connectez-vous ou créez un compte</p>

                            <div className={style['popup-btn']}>
                                <button onClick={() => { navigate('/login') }}>Se connecter</button>
                                <button onClick={() => { navigate('/register') }}>Créer un compte</button>
                                <button onClick={() => { setPopup(!popup) }}>Annuler</button>
                            </div>

                        </section>
                    )
                    : (
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


                            <button onClick={() => { onAddToCurrentOrder(storeInfos.ArticleId, storeInfos.StoreId, userId) }}>
                                Ajouter au panier
                            </button>

                            {
                                (userRole === 'Admin' || userRole === 'Sous-Admin') && (
                                    <button type="button" onClick={() => {onArticleUpdate(storeInfos.ArticleId, storeInfos.StoreId)}}>Modifier</button>
                                )
                            }

                        </section> 
                    )
                }
               
            </div>
            
        </div>

    )

}

export default ArticleDetail;