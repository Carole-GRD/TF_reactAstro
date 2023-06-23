import axios from 'axios';

const URL__API__ASTRO = import.meta.env.VITE_URL__API__ASTRO;


// Requête pour les informations concernant la table "Article"
// -----------------------------------------------------------
export const onUpdateArticle = async (articleId, articleData) => {
    const articleUpdated = await axios.put(`${URL__API__ASTRO}/article/${articleId}`, articleData);
}


// Requête pour les informations concernant la table "MM_Article_Store"
// --------------------------------------------------------------------
export const onUpdateArticleStore = async (articleId, storeData) => {
    const articleStoreUpdated = await axios.put(`${URL__API__ASTRO}/article/${articleId}/updateStore`, storeData);
}

// Requête pour les informations concernant la table "Mark"
// --------------------------------------------------------
export const onUpdateMarkLink = async (articleId, markData) => {
    const markLinkUpdated = await axios.put(`${URL__API__ASTRO}/article/${articleId}`, markData);
}