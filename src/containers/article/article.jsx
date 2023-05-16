

import style from './article.module.css';

import article from '../../assets/article.png';
import { useNavigate } from 'react-router-dom';


const Article = ({id, name}) => {

    const navigate = useNavigate();


    const onDetail = () => {
        navigate(`/articleDetail/${id}`);
    }


    return (

            <section className={style['article']} onClick={onDetail}>

                

                    {/* TODO: récupérer les images du téléscope et supprimer l'image "type" (+ supprimer l'import) */}
                    <p>{name}</p>
                    <img src={article} alt={`Image de ${name}`} />

                
            </section>

    )

}

export default Article;