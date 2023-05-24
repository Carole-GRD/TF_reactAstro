// import axios from 'axios';

// import { currentOrderActionSave } from "../store/actions/order.action";


// const fetchOrders = async (userId) => {

//     const response = await axios.get(`http://localhost:8080/api/order/user/${userId}`);
//     console.log('response - order : ', response.data.results.find(order => order.order_status === 'En attente'));
    
//     currentOrderActionSave(response.data.results);

//     await axios.get(`http://localhost:8080/api/order/user/${userId}`)
//         .then((response) => {
//             // console.log('response - order : ', response.data.results.find(order => order.order_status === 'En attente'));

//             currentOrderActionSave(response.data.results);
        
//         })

// }

// export default fetchOrders;