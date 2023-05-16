
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Articles from '../../containers/article/article/article';
import style from './articles.module.css';



const ArticlesPage = () => {

    const [listArticles, setListArticles] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/api/article')
            .then((response) => {
                setListArticles(response.data.results);
            })
    }, [])

    return (
        <div className={style['article-container']}>

            <div className={style['article-content']}>

                <div className={style['article-list']}>
                    
                    {listArticles.map(article => (
                        <Articles key={article.id} {...article} />
                    ))}

                </div>
                
            </div>
    

        </div>
    )

}

export default ArticlesPage