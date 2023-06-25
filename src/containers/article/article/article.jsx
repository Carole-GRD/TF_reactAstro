
import style from './article.module.css';

import articleDefaultIMG from '../../../assets/article.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { articleActionDelete, articleActionGetAll } from '../../../store/actions/article.action';



const Article = ({id, name, Stores}) => {

    const userRole = useSelector(state => state.auth.userRole);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onUpdateArticleForm = (articleId, storeId) => {
        navigate(`/articleForm/${articleId}/store/${storeId}`);
    }


    const onDeleteArticle = () => {
        // console.log('suppresion article');
        dispatch(articleActionDelete(id));
        dispatch(articleActionGetAll());
        navigate('/articles');
    }


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

                            {
                                (userRole === 'Admin' || userRole === 'Sous-Admin') && (
                                    <div>
                                        <button type="button" onClick={() => {onUpdateArticleForm(id, store.store_id)}}>Modifier</button>
                                        <button type='button' onClick={onDeleteArticle}>Supprimer l'article</button>
                                    </div>
                                )
                            }

                        </section>
                    </div>
                )
            }
        </>
    );


}

export default Article;