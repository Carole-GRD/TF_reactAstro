import { useForm } from "react-hook-form";

import style from './article-form.module.css';

const ArticleForm = () => {

    const { register, handleSubmit, reset } = useForm();


    const onValidateArticle = () => {
        console.log('modifier l\'article');
    }

    const onSetOpenArticleDetail = () => {
        console.log('revenir aux détails de l\'article');
    }
  
    return (
        <article className={style['articleForm-container']}>
        
                <form onSubmit={handleSubmit(onValidateArticle)}>

                    {/* <div className={style['form-group']}>  */}
                    <div> 
                        <label htmlFor="name">Nom de l'article</label>
                        <input id='name' type='text' placeholder={'AJOUTER le nom actuel de l\'article'} {...register('name')} />  
                    </div> 

                    {/* <div className={style['form-group']}>  */}
                    <div> 
                        <label htmlFor="picture">Image</label> 
                        <input id='picture' type='file'  {...register('path')} /> 
                    </div> 


                   
                    {/* <div className={style['popup-btn']}> */}
                    <div>
                        <button type="submit">Modifier l'article</button>
                        <button type="button" onClick={() => { onSetOpenArticleDetail() }}>Annuler</button>
                    </div>

                </form>
                
            </article>
    )
};

export default ArticleForm;