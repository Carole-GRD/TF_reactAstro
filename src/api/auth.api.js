import axios from 'axios';

export const validateToken = async (token) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/validateToken', { token }); 
        // console.log('response : ', response);
        // console.log('response.data : ', response.data);
        return response.data;
    } catch (error) {
        throw new Error('Erreur lors de la validation du token');
    }
};