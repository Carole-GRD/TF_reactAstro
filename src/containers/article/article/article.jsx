

import style from './article.module.css';

import article from '../../../assets/article.png';
import { Link } from 'react-router-dom';


const Article = ({id, name, Stores}) => {


    console.log('store => ', Stores);

    const onAddToBasket = (articleToAdd) => {
        console.log('articleToAdd : ', articleToAdd);
    }

    return (
        <>
            {
                Stores.map(store =>
                    <>
                        <section key={store.store_id} className={style['article']}>
                            <Link className={style['articleLink']} to={`/articleDetail/${id}/store/${store.store_id}`} >
                                
                                    <p>{name}</p>
                                    <img src={article} alt={`Image de ${name}`} />
                                    
                                    <p>{store.store_name}</p>
                            
                            </Link>
                            <button onClick={() => { onAddToBasket(store.store_id) }}>Ajouter au panier</button>
                        </section>
                    </>
                )
            }
        </>
    );


}

export default Article;