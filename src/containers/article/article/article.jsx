

import style from './article.module.css';

import articleDefaultIMG from '../../../assets/article.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { articleActionDelete, articleActionGetAll } from '../../../store/actions/article.action';




const Article = ({id, name, Stores}) => {


    const userRole = useSelector(state => state.auth.userRole);

    const dispatch = useDispatch();


    const onDeleteArticle = () => {
        console.log('suppresion article');
        dispatch(articleActionDelete(id));
        dispatch(articleActionGetAll());
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
                                        <button type='button' onClick={onDeleteArticle}>Supprimer l'article</button>
                                    )
                                }
                            
                            {/* <button onClick={() => { onAddToCurrentOrder(id, store.store_id) }}>Ajouter au panier</button> */}

                        </section>
                    </div>
                )
            }

        </>
    );


}

export default Article;