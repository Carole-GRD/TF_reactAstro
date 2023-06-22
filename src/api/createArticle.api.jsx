// import axios from 'axios';


// export const createArticle = async (orderId, articleIdToAdd, storeId, newQuantity) => {

//     try {
//         // Récupérer l'article à ajouter dans le bon magasin (article sur lequel l'utilisateur a cliqué)
//         const response1 = await axios.get(`http://localhost:8080/api/article/${articleIdToAdd}/store/${storeId}`);
//         const articleToAdd = response1.data.result;
//         // console.log('createArticle.api (response1.data.result) : ', articleToAdd);
        
//         const articleData = {
//             id: articleToAdd.ArticleId,
//             quantity: newQuantity,
//             store: storeId
//         }
//         console.log('articleData : ', articleData);
//         console.log('commande n° : ', orderId);

//         const response3 = await axios.post(`http://localhost:8080/api/order/${orderId}/createArticle`, articleData);
//         console.log('createArticle.api (response3) : ', response3);

//         return response3;
//     } 
//     catch (error) {
//         console.error('Erreur lors de la création de l\'article : ', error);
//         throw error;
//     }
 
// }