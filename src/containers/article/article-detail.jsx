

import style from './article-detail.module.css';

import axios from 'axios';
import { useEffect } from 'react';
import article from '../../assets/article.png';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const ArticleDetail = () => {


    const { articleId } = useParams();

    const [details, setDetails] = useState([]);
    const [mark, setMark] = useState();
    const [listStores, setListStores] = useState([]);

    // console.log('articleId : ', articleId);


    useEffect(() => {
        axios.get(`http://localhost:8080/api/article/${articleId}`)
            .then((article) => {
                setDetails(article.data.result);

                return {
                    markId : article.data.result.MarkId,
                    storesId : article.data.result.Stores.map(store => store.store_id)
                }

            })
            .then((data) => {
                // les "data" fournies sont les données envoyées dans le "return" de la requête (voir ci-desssus)

                axios.get(`http://localhost:8080/api/mark/${data.markId}`)
                    .then((mark) => {
                        setMark(mark.data.result.name)
                    }) 
                    .catch((error) => {
                        console.error('Error fetching mark:', error);
                    });   

                axios.get('http://localhost:8080/api/store')
                    .then((stores) => {
                        console.log('stores : ', stores);
                        
                        // TODO : ↓ ici je récupère tous les stores mais il faut les filtrer pour ne récupérer que les magasins où l'on vend l'article en question
                        // ATTENTION : ne faudrait-il pas le faire dans le composant article pour afficher le nom du magasin où l'article est vendu ?
                        setListStores(stores.data.results);
                    })
                    .catch((error) => {
                        console.error('Error fetching stores:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching article:', error);
            });
            

    }, []);

    // console.log('details : ', details);


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

                    <p>{details.description}</p>

                    <p>Prix : ... €</p>

                </section>
            </div>
        </div>

    )

}

export default ArticleDetail;