
import axios from 'axios';
import { useEffect } from 'react';
// import { useState } from 'react';
import Articles from '../../containers/article/article/article';
import style from './articles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { articleActionGetAll } from '../../store/actions/article.action';


const ArticlesPage = () => {

    const listArticles = useSelector(state => state.article.listArticles);
    // const [listArticles, setListArticles] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRole = useSelector(state => state.auth.userRole);
    console.log('userRole : ', userRole);


    // useEffect(() => {

    //     const URL__API__ASTRO = import.meta.env.VITE_URL__API__ASTRO;

    //     axios.get(`${URL__API__ASTRO}/article`)
    //         .then((response) => {
    //             setListArticles(response.data.results);
    //         })
    // }, [])
    // console.log('listArticles : ', listArticles);

    useEffect(() => {
        dispatch(articleActionGetAll());
    }, [])



    return (
        <div className={style['article-container']}>

            <div className={style['article-content']}>

                <div>
                    
                    <div>
                        {
                            (userRole === 'Admin' || userRole === 'Sous-Admin') && (
                                <button type="button" onClick={() => {navigate('/articleAddForm')}}>Ajouter un article</button>
                            )
                        }
                    </div>
                    
                    <div className={style['article-list']}>
                        {listArticles.map(article => (
                            <Articles key={article.id} {...article} />
                        ))}
                    </div>

                </div>
                
            </div>
    

        </div>
    )

}

export default ArticlesPage