import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import axios from 'axios';

import style from './article-form.module.css';
import articleIMGDefault from '../../../assets/article.png';
import { onUpdateArticle, onUpdateArticleStore, onUpdateMarkLink } from "../../../api/updateArticle";



const ArticleForm = () => {

    const URL__API__ASTRO = import.meta.env.VITE_URL__API__ASTRO;


    const { articleId, storeId } = useParams();

    const { register, handleSubmit, reset } = useForm();

    const navigate = useNavigate();

    const [details, setDetails] = useState([]);
    const [mark, setMark] = useState();
    const [allMark, setAllMark] = useState([]);
    const [storeInfos, setStoreInfos] = useState();


    useEffect(() => {

        // On récuprère l'article afin d'accéder à ses détails (nom, description, référence, auteur, MarkId)
        // et grâce au "MarkId", on peut récupérer le nom de la marque
        axios
            .get(`${URL__API__ASTRO}/article/${articleId}`)
                .then((article) => {
                    setDetails(article.data.result);
                    const markId = article.data.result.MarkId;    
                    // console.log('markId : ', markId);

                    // Attention, si l'article sur lequel l'utilisateur a cliqué est un livre, il n'y a pas de "mark"
                    // Donc, on vérifie si on a récupéré un "markId" pour lancer la requête
                    if (markId) {
                        // le "markId" fourni dans les parenthèses est envoyé par le "return" de la requête (voir le "then" ci-desssus)
                        axios
                        .get(`${URL__API__ASTRO}/mark/${markId}`)
                            .then((mark) => {
                                console.log(mark.data.result)
                                // setMark(mark.data.result.name)
                                setMark(mark.data.result)
                            }) 
                            .catch((error) => {
                                console.error('Error fetching mark:', error);
                            });   
                    }       
                })
                .catch((error) => {
                    console.error('Error fetching article:', error);
                });
        
        // On récupère les informations sur l'article (prix, réduction, stock) en fonction du magasin dans lequel il se trouve
        axios
            .get(`${URL__API__ASTRO}/article/${articleId}/store/${storeId}`)
            .then((response) => {
                // console.log(response.data.result);
                setStoreInfos(response.data.result);
            })
            .catch((error) => {
                console.error('Error fetching Article By Id And By Store :', error);
            });

        // On récupère toutes les "Mark" de la table
        axios
            .get(`${URL__API__ASTRO}/mark`)
            .then((response) => {
                console.log('response.data.results : ', response.data.results);
                setAllMark(response.data.results);
            })
            
    }, []);

    

    // TODO : ajouter des validations (trim, required ...)

    const onValidateArticle = async (data) => {
        // console.log('modifier l\'article');
        // console.log('data : ', data);
        

        // Requête pour les informations concernant la table "Article"
        // -----------------------------------------------------------
        if (data.name !== '' || data.author !== '' || data.reference !== '' || data.description !== '') {
            const articleData = {
                name: data.name,
                author: data.author,
                reference: data.reference,
                description: data.description
            }
            if (data.name === '') {
                articleData.name = details.name;
            }
            if (data.author === '') {
                // TODO : vérifier la condition lorsque la requête pour le changement de marque sera faite
                // S'il y a une "Mark", c'est que l'article n'est pas un livre et donc il n'y a pas d'auteur 
                if (data.mark !== null) {
                    articleData.author = null;
                }
                else {
                    articleData.author = details.author;
                }
            }
            if (data.reference === '') {
                articleData.reference = details.reference;
            }
            if (data.description === '') {
                articleData.description = details.description;
            }
            // console.log('articleData : ', articleData);
            
            await onUpdateArticle(articleId, articleData);
        }

        // Requête pour les informations concernant la table "Mark"
        // --------------------------------------------------------
        // Vérifier si l'utilisateur a sélectionné une marque
        if (data.mark !== "") {
            // Vérifier si l'utilisateur a sélectionné une marque différente
            if (mark.id !== data.mark) {
                const markData = {
                    MarkId: data.mark
                }
                console.log('markData : ', markData.MarkId);
                console.log('mark : ', mark.id);
                await onUpdateMarkLink(articleId, markData); 
            }
        }
        
        // Requête pour les informations concernant la table "MM_Article_Store"
        // --------------------------------------------------------------------
        if (data.price !== '' || data.discount !== '' || data.stock !== '') {
            const storeData = {
                StoreId: storeId,
                price: data.price,
                discount: data.discount/100,
                stock: data.stock
            }
            if (data.price === '') {
                storeData.price = storeInfos.price;
            }
            if (data.discount === '') {
                storeData.discount = storeInfos.discount;
            }
            if (data.stock === '') {
                storeData.stock = storeInfos.stock;
            }
            // console.log('storeData : ', storeData);
            
            await onUpdateArticleStore(articleId, storeData);
        }
        
        navigate(`/articleDetail/${articleId}/store/${storeId}`);

    }





    return (
        <section className={style['article-container']}>

            <div className={style['articleDetail-content']}>

                <article className={style['data']}>
                
                        <form onSubmit={handleSubmit(onValidateArticle)}>

                            <div className={style['form-group']}> 
                                <label htmlFor="name">Nom de l'article</label>
                                <input id='name' type='text' placeholder={details.name} {...register('name')} />  
                            </div> 

                            {/* <div className={style['form-group']}> 
                                <label htmlFor="mark">Marque</label>
                                <input id='mark' type='text' placeholder={mark} {...register('mark')} />  
                            </div>  */}
                            <div className={style['form-group']}> 
                                <label htmlFor="mark">Marque</label>
                                {/* <select id='mark' {...register('mark')}> */}
                                <select id='mark' placeholder={mark?.name} {...register('mark')}>
                                    <option value='' placeholder={mark?.name}>-- Sélectionnez une marque --</option>
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
                                <input id='author' type='text' placeholder={details.author} {...register('author')} />  
                            </div> 

                            <div className={style['form-group']}> 
                                <label htmlFor="reference">Référence</label>
                                <input id='reference' type='text' placeholder={details.reference} {...register('reference')} />  
                            </div> 

                            <div className={style['form-group']}> 
                                <label htmlFor="picture">Image</label> 
                                <img src={articleIMGDefault} alt={`Image de ${details.name}`} />
                                {/* TODO : s'il y a déjà une image, l'afficher au lieu de l'image par défaut */}
                                {/* TODO : afficher la nouvelle image choisie */}
                                <input id='picture' type='file'  {...register('path')} /> 
                            </div> 

                            <div className={style['form-group']}> 
                                <label htmlFor="description">Description</label>
                                <textarea id='description' type='text' placeholder={details.description} {...register('description')} />  
                            </div> 

                            <div className={style['form-group']}> 
                                <label htmlFor="price">Prix (en euros)</label>
                                {/* <input id='price' type='text' placeholder={storeInfos ? storeInfos.price.toFixed(2) + '€' : ''} {...register('price')} />   */}
                                <input id='price' type='text' placeholder={storeInfos?.price?.toFixed(2) + '€'} {...register('price')} />  
                            </div> 

                            <div className={style['form-group']}> 
                                <label htmlFor="discount">Réduction (en pourcentage)</label>
                                <input id='discount' type='text' placeholder={storeInfos ? storeInfos.discount * 100 + '%' : ''} {...register('discount')} />  
                            </div> 

                            <div className={style['form-group']}> 
                                <label htmlFor="stock">Stock</label>
                                <input id='stock' type='text' placeholder={storeInfos ? storeInfos.stock : ''} {...register('stock')} />  
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