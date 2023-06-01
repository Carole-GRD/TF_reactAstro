

import style from './article-detail.module.css';

import axios from 'axios';
import { useEffect } from 'react';
import article from '../../../assets/article.png';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const ArticleDetail = () => {

    const { articleId, storeId } = useParams();
    console.warn('articleId', articleId);
    console.warn('storeId', storeId);

    const [details, setDetails] = useState([]);
    const [mark, setMark] = useState();
    const [storeInfos, setStoreInfos] = useState();

    // console.log('articleId : ', articleId);


    useEffect(() => {
        axios.get(`http://localhost:8080/api/article/${articleId}`)
            .then((article) => {
                setDetails(article.data.result);
                const markId = article.data.result.MarkId;    
                console.log('markId : ', markId);
                return markId;  
                // return article.data.result.MarkId;      
            })
            .then((markId) => {
                console.log('markId : ', markId);
                
                // TODO : Vérifier si l'article est un livre (car dans ce cas, il n'y a pas de mark !)  => on récupère la mark uniquement si ce n'est pas un livre 


                // le "markId" fourni dans les parenthèses est envoyé par le "return" de la requête (voir le "then" ci-desssus)
                axios.get(`http://localhost:8080/api/mark/${markId}`)
                    .then((mark) => {
                        setMark(mark.data.result.name)
                    }) 
                    .catch((error) => {
                        console.error('Error fetching mark:', error);
                    });   
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

    console.log('details : ', details);
    console.log('mark : ', mark);
    console.log('storeInfos : ', storeInfos);



    const onAddToCurrentOrder = (articleId, storeId) => {
        console.warn('ajouter l\'article');
        console.log('articleId : ', articleId);
        console.log('storeId : ', storeId);
    }

    


    return (
        <div className={style['articleDetail-container']}>
   
            <Link to="/articles" className={style['link-back']}>Retour à la liste des articles</Link>
            

            <div className={style['articleDetail-content']}>
            
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


                    <button onClick={() => { onAddToCurrentOrder(storeInfos.ArticleId, storeInfos.StoreId) }}>Ajouter au panier</button>

                </section>
            </div>
        </div>

    )

}

export default ArticleDetail;