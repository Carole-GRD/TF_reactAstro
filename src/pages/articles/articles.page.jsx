
import { useEffect } from 'react';
import Articles from '../../containers/article/article/article';
import style from './articles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { articleActionGetAll } from '../../store/actions/article.action';


const ArticlesPage = () => {

    const listArticles = useSelector(state => state.article.listArticles);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRole = useSelector(state => state.auth.userRole);


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