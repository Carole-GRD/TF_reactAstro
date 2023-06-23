

import style from './article.module.css';

import articleDefaultIMG from '../../../assets/article.png';
import { Link } from 'react-router-dom';




const Article = ({id, name, Stores}) => {


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
                            
                            {/* <button onClick={() => { onAddToCurrentOrder(id, store.store_id) }}>Ajouter au panier</button> */}

                        </section>
                    </div>
                )
            }

        </>
    );


}

export default Article;