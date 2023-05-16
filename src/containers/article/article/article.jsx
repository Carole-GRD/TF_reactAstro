

import style from './article.module.css';

import article from '../../../assets/article.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Article = ({id, name, Stores}) => {

    const navigate = useNavigate();
    console.log('store => ', Stores);

    // const onDetail = () => {
    //     navigate(`/articleDetail/${id}/${}`);
    // }

    return (
        <>
            {
                Stores.map(store =>
                    <Link key={store.store_id} className={style['articleLink']} to={`/articleDetail/${id}/store/${store.store_id}`} >
                        <section className={style['article']}>
                        
                            <p>{name}</p>
                            <img src={article} alt={`Image de ${name}`} />
                            
                            <p>{store.store_name}</p>
                        </section>
                    </Link>
                )
            }
        </>
    );


}

export default Article;