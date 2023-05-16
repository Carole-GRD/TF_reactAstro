import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AllOrders from "./all-orders";
import CurrentOrder from "./current-order";
import MyPersonalData from "./my-personal-data";


import style from './basket.module.css';

const Basket = () => {

    const userId = useSelector(state => state.auth.userId);
    // console.log('userId : ', userId);
    
    const [allOrders, setAllOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);


    const [displayAllOrders, setDisplayAllOrders] = useState(false);
    const [displayMyPersonalData, setDisplayMyPersonalData] = useState(false);
    const [displayCurrentOrder, setDisplayCurrentOrder] = useState(false);


    useEffect(() => {
        async function fetchOrders() {
            const response = await axios.get(`http://localhost:8080/api/order/user/${userId}`);
            console.log('response - order : ', response);
            setAllOrders(response.data.results);
            setCurrentOrder(response.data.results.filter(order => order.order_status === 'En attente'));
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

    // console.log('allOrders : ', allOrders);

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
                displayCurrentOrder && (
                    <CurrentOrder currentOrder={currentOrder} />
                )
            }


            <h3 onClick={onDisplayAllOrders}>Voir mes commandes</h3>
            {
                displayAllOrders && (
                    allOrders.map(order => <AllOrders key={order.id} {...order} />)
                )
            }


        </div>
    )
}

export default Basket;