import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import style from './article-form.module.css';

const ArticleForm = () => {

    const { articleId, storeId } = useParams();

    const { register, handleSubmit, reset } = useForm();

    const navigate = useNavigate();


    const onValidateArticle = () => {
        console.log('modifier l\'article');
    }

  
    return (
        <section className={style['article-container']}>

            <div className={style['articleDetail-content']}>

                <article className={style['data']}>
                
                        <form onSubmit={handleSubmit(onValidateArticle)}>

                            <div className={style['form-group']}> 
                                <label htmlFor="name">Nom de l'article</label>
                                <input id='name' type='text' placeholder={'AJOUTER le nom actuel de l\'article'} {...register('name')} />  
                            </div> 

                            <div className={style['form-group']}> 
                                <label htmlFor="mark">Marque</label>
                                <input id='mark' type='text' placeholder={'AJOUTER la marque'} {...register('mark')} />  
                            </div> 

                            <div className={style['form-group']}> 
                                <label htmlFor="author">Auteur</label>
                                <input id='author' type='text' placeholder={'AJOUTER le nom de l\'auteur'} {...register('author')} />  
                            </div> 

                            <div className={style['form-group']}> 
    
                                <label htmlFor="picture">Image</label> 
                                <input id='picture' type='file'  {...register('path')} /> 
                            </div> 

                            <div className={style['form-group']}> 
                                <label htmlFor="description">Description</label>
                                <input id='description' type='text' placeholder={'AJOUTER la description'} {...register('description')} />  
                            </div> 

                            <div className={style['form-group']}> 
                                <label htmlFor="price">Prix</label>
                                <input id='price' type='text' placeholder={'AJOUTER le prix'} {...register('price')} />  
                            </div> 

                            <div className={style['form-group']}> 
                                <label htmlFor="discount">Réduction</label>
                                <input id='discount' type='text' placeholder={'AJOUTER la réduction'} {...register('discount')} />  
                            </div> 
                        
                            
                            <div>
                                <button type="submit">Modifier l'article</button>
                                <button type="button" onClick={() => { navigate(`/articleDetail/${articleId}/store/${storeId}`) }}>Annuler</button>
                            </div>

                        </form>
                        
                    </article>
                </div>
            </section>

    )
};

export default ArticleForm;