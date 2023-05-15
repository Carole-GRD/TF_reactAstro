

import style from './articles-detail.module.css';

import axios from 'axios';
import { useEffect } from 'react';
import article from '../../assets/article.png';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const ArticlesDetail = () => {


    const { articleId } = useParams();

    const [details, setDetails] = useState([]);
    const [mark, setMark] = useState();

    // console.log('articleId : ', articleId);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/article/${articleId}`)
            .then((article) => {
                console.log('article : ', article);
                setDetails(article.data.result);
                return article.data.result.MarkId;
            })
            .then((markId) => {
                axios.get(`http://localhost:8080/api/mark/${markId}`)
                    .then((mark) => {
                        console.log('mark : ', mark);
                        setMark(mark.data.result.name)
                    })
                    
            })
            

    }, []);

    console.log('details : ', details);


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

                </section>
            </div>
        </div>

    )

}

export default ArticlesDetail;