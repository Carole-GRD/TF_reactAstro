

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ---------------------   FORMULAIRE POUR AJOUTER UN ARTICLE   ---------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import axios from 'axios';

import style from './article-add-form.module.css';
import articleIMGDefault from '../../../assets/article.png';
import { useDispatch } from "react-redux";
import { articleActionGetAll } from "../../../store/actions/article.action";





const ArticleAddForm = () => {

    const URL__API__ASTRO = import.meta.env.VITE_URL__API__ASTRO;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [allMark, setAllMark] = useState([]);
    const [allStore, setAllStore] = useState([]);
    // const [listArticles, setListArticles] = useState([]);

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        // On récupère toutes les "Mark" de la base de données (table "Mark")
        axios
            .get(`${URL__API__ASTRO}/mark`)
            .then((response) => {
                // console.log('response.data.results : ', response.data.results);
                setAllMark(response.data.results);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des marques:', error);
            });
        // On récupère toutes les "Store" de la base de données (table "Store")
        axios
            .get(`${URL__API__ASTRO}/store`)
            .then((response) => {
                // console.log('response.data.results : ', response.data.results);
                setAllStore(response.data.results);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des magasins:', error);
            });
    }, [])



    const onAddArticle = async (data) => {
        // console.log(data.store);

        try {
            // Requête pour les informations concernant la table "Article"
            // -----------------------------------------------------------
            if (
                data.name !== '' && 
                data.reference !== '' 
                && data.description !== '', 
                data.store !== '' && 
                data.price !== '' && 
                data.discount !== '' && 
                data.stock !== ''
            ) {
                const articleData = {
                    name: data.name,
                    author: data.author || null,
                    reference: data.reference,
                    description: data.description,
                    MarkId: parseInt(data.mark)
                }
                // console.log('articleData : ', articleData);


                const response = await axios.post(`${URL__API__ASTRO}/article`, articleData);
                const newArticle = response.data.result.id;

                if (data.store !== '' && data.price !== '' && data.discount !== '' && data.stock !== '') {
                    const storeData = {
                        StoreId: data.store,
                        price: data.price,
                        discount: data.discount / 100,
                        stock: data.stock
                    };
                    axios.put(`${URL__API__ASTRO}/article/${newArticle}/updateStore`, storeData);
                }
            }

            dispatch(articleActionGetAll());
            navigate('/articles');
        }
        catch (err) {
            console.log('Erreur lors de la création de l\'article => ', err);
        }
    }

    return (
        <section className={style['article-container']}>

            <div className={style['articleDetail-content']}>

                <article className={style['data']}>

                    <form onSubmit={handleSubmit(onAddArticle)}>

                        <div className={style['form-group']}> 
                            <label htmlFor="name">Nom de l'article</label>
                            <input id='name' type='text' placeholder="" {...register('name')} />  
                        </div> 

                        <div className={style['form-group']}> 
                            <label htmlFor="mark">Marque</label>
                            <select id='mark' {...register('mark')}>
                                <option value=''>-- Sélectionnez une marque --</option>
                                {   
                                    allMark
                                        .map(eachMark => (
                                            <option key={eachMark.id} value={eachMark.id}>
                                                {eachMark.name}
                                            </option>
                                        ))
                                }
                            </select>
                        </div> 

                        <div className={style['form-group']}> 
                            <label htmlFor="author">Auteur</label>
                            <input id='author' type='text' placeholder="" {...register('author')} />  
                        </div> 

                        <div className={style['form-group']}> 
                            <label htmlFor="reference">Référence</label>
                            <input id='reference' type='text' placeholder="" {...register('reference')} />  
                        </div> 

                        <div className={style['form-group']}> 
                            <label htmlFor="picture">Image</label> 
                            <img src={articleIMGDefault} alt={`Image de ...`} />
                            {/* TODO : s'il y a déjà une image, l'afficher au lieu de l'image par défaut */}
                            {/* TODO : afficher la nouvelle image choisie */}
                            <input id='picture' type='file'  {...register('path')} /> 
                        </div> 

                        <div className={style['form-group']}> 
                            <label htmlFor="description">Description</label>
                            <textarea id='description' type='text' placeholder="" {...register('description')} />  
                        </div> 

                        <div className={style['form-group']}> 
                            <label htmlFor="store">Store</label>
                            <select id='store' {...register('store')}>
                                <option value=''>-- Sélectionnez un magasin --</option>
                                {   
                                    allStore
                                        .map(eachStore => (
                                            <option key={eachStore.id} value={eachStore.id}>
                                                {eachStore.name} ({eachStore.address_city})
                                            </option>
                                        ))
                                }
                            </select>
                        </div> 

                        <div className={style['form-group']}> 
                            <label htmlFor="price">Prix (en euros)</label>
                            <input id='price' type='text' placeholder="" {...register('price')} />  
                        </div> 

                        <div className={style['form-group']}> 
                            <label htmlFor="discount">Réduction (en pourcentage)</label>
                            <input id='discount' type='text' placeholder="" {...register('discount')} />  
                        </div> 

                        <div className={style['form-group']}> 
                            <label htmlFor="stock">Stock</label>
                            <input id='stock' type='text' placeholder="" {...register('stock')} />  
                        </div> 
                    
                        
                        <div>
                            <button type="submit">Ajouter l'article</button>
                            <button type="button" onClick={() => { navigate(`/articles`) }}>Annuler</button>
                        </div>

                    </form>
                    
                </article>
            </div>
        </section>
    )
}

export default ArticleAddForm;