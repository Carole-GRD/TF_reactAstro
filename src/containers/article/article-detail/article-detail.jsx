

import style from './article-detail.module.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import article from '../../../assets/article.png';


const ArticleDetail = () => {

    const { articleId, storeId } = useParams();
    // console.warn('articleId : ', articleId);
    // console.warn('storeId : ', storeId);

    const [details, setDetails] = useState([]);
    const [mark, setMark] = useState();
    const [storeInfos, setStoreInfos] = useState();
    const [popup, setPopup] = useState(false); // Utilisez un état pour gérer la valeur de popup

    const isConnected = useSelector(state => state.auth.isConnected);


    useEffect(() => {
        axios.get(`http://localhost:8080/api/article/${articleId}`)
            .then((article) => {
                setDetails(article.data.result);
                const markId = article.data.result.MarkId;    
                // console.log('markId : ', markId);
                return markId;  
                // return article.data.result.MarkId;      
            })
            .then((markId) => {
                // console.log('markId : ', markId);
                
                // Attention, si l'article sur lequel l'utilisateur a cliqué est un livre, il n'y a pas de "mark"
                // Donc, on vérifie si on a récupéré un "markId" pour lancer la requête
                if (markId) {
                    // le "markId" fourni dans les parenthèses est envoyé par le "return" de la requête (voir le "then" ci-desssus)
                    axios.get(`http://localhost:8080/api/mark/${markId}`)
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
        
        axios.get(`http://localhost:8080/api/article/${articleId}/store/${storeId}`)
            .then((response) => {
                // console.log('response : ', response);
                setStoreInfos(response.data.result)
            })
            
    }, []);

    // console.log('details : ', details);
    // console.log('mark : ', mark);
    // console.log('storeInfos : ', storeInfos);

    
    const onAddToCurrentOrder = (articleId, storeId) => {
        if (!isConnected) {
            console.warn('créer un compte ou se connecter');
            setPopup(!popup); // Mettez à jour l'état de popup en utilisant setPopup
        }
        else {
            console.warn('ajouter l\'article');
            console.log('articleId : ', articleId);
            console.log('storeId : ', storeId);

        }
    }

    


    return (
        <div className={style['articleDetail-container']}>
   
            <Link to="/articles" className={style['link-back']}>Retour à la liste des articles</Link>
            

            <div className={style['articleDetail-content']}>

                
                {   
                    popup && (
                        <section className={style['article']}>
                            {console.log('popup (true) : ', popup)}
                            <p>Connectez-vous ou créez un compte</p>
                            <Link to="/login">Se connecter</Link>
                            <Link to="/register">Créer un compte</Link>
                            <button onClick={() => { setPopup(!popup) }}>Annuler</button>

                        </section>
                    )
                }

                
                {   
                    !popup && (
                        <section className={style['article']}>
                            {console.log('popup (false) : ', popup)}
                
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


                            <button onClick={() => { onAddToCurrentOrder(storeInfos.ArticleId, storeInfos.StoreId) }}>Ajouter au panier</button>

                        </section>
                    )
                }
            
                
            </div>
        </div>

    )

}

export default ArticleDetail;