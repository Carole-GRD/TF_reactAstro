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

    const [allOrders, setAllOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState([]);


    const [displayAllOrders, setDisplayAllOrders] = useState(false);
    const [displayMyPersonalData, setDisplayMyPersonalData] = useState(false);
    const [displayCurrentOrder, setDisplayCurrentOrder] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchOrders() {
            const response = await axios.get(`http://localhost:8080/api/order/user/${userId}`);
            // console.log('response - order : ', response.data.results.find(order => order.order_status === 'En attente'));
            setAllOrders(response.data.results.filter(order => order.order_status !== 'En attente'));
            setCurrentOrder(response.data.results.find(order => order.order_status === 'En attente'));
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

    console.log('allOrders : ', allOrders); 

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
                (displayCurrentOrder && currentOrder) && (
                    <CurrentOrder currentOrder={currentOrder} />
                )
            }
            {
                (displayCurrentOrder && !currentOrder) && (
                    <article className={style['data']}>
                        <p>Vous n'avez pas de commande en cours pour le moment.</p>
                        <p>Parcourez notre catalogue et ajoutez des produits à votre panier pour commencer une nouvelle commande !</p>
                    </article>
                )
            }


            <h3 onClick={onDisplayAllOrders}>Voir mes commandes</h3>
            {
                ( displayAllOrders && allOrders.length > 0) && (
                    allOrders.map(order => <AllOrders key={order.id} {...order} />)
                )
            }
            {   
                ( displayAllOrders && allOrders.length === 0) && (
                    <article className={style['data']}>
                        <p>Vous n'avez pas encore passé de commande.</p>
                        <p>Commencez dès maintenant et découvrez notre sélection de produits exceptionnels !</p>
                    </article>
                )
            }
            
        </div>
    )
}

export default Basket;