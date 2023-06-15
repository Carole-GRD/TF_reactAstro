import axios from 'axios';



export const validateToken = async (token) => {
    try {

        const URL__API__ASTRO = import.meta.env.VITE_URL__API__ASTRO;
        
        const response = await axios.post(`${URL__API__ASTRO}/auth/validateToken`, { token }); 
        // console.log('response : ', response);
        // console.log('response.data : ', response.data);
        return response.data;
    } catch (error) {
        throw new Error('Erreur lors de la validation du token');
    }
};