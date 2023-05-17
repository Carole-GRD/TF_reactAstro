import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AllOrders from "./all-orders";
import CurrentOrder from "./current-order";
import MyPersonalData from "./my-personal-data";


import style from './basket.module.css';
import { useDispatch } from "react-redux";
import { currentOrderActionSave } from "../../store/actions/store-action";



const Basket = () => {

    const userId = useSelector(state => state.auth.userId);
    // console.log('userId : ', userId);

    const [displayAllOrders, setDisplayAllOrders] = useState(false);
    const [displayMyPersonalData, setDisplayMyPersonalData] = useState(false);
    const [displayCurrentOrder, setDisplayCurrentOrder] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchOrders() {
            const response = await axios.get(`http://localhost:8080/api/order/user/${userId}`);
            // console.log('response - order : ', response.data.results.find(order => order.order_status === 'En attente'));
    
            dispatch(currentOrderActionSave(response.data.results));
        };
        fetchOrders();
    }, [userId])



    // TODO : généraliser la fonction
    const onDisplayAllOrders = () => {
        setDisplayAllOrders(!displayAllOrders);
    };
    const onDisplayMyPersonalData = () => {
        setDisplayMyPersonalData(!displayMyPersonalData);
    };
    const onDisplayCurrentOrder = () => {
        setDisplayCurrentOrder(!displayCurrentOrder);
    };



    return (
        <div className={style.basket}>
            <h3 onClick={onDisplayMyPersonalData}>Mes données</h3>
            {
                displayMyPersonalData && (
                    <MyPersonalData />
                )
            }


            <h3 onClick={onDisplayCurrentOrder}>Mon panier</h3>
            {
                (displayCurrentOrder) && (
                    <CurrentOrder />
                )
            }
            


            <h3 onClick={onDisplayAllOrders}>Voir mes commandes</h3>
            {
                ( displayAllOrders) && (
                    <AllOrders />
                )
            }
           
            
        </div>
    )
}

export default Basket;