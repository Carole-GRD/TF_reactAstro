import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AllOrders from "./all-orders";
import CurrentOrder from "./current-order";
import MyPersonalData from "./my-personal-data";


import style from './basket.module.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/actions/auth.action";
// import { currentOrderActionSave } from "../../store/actions/order.action";
// import fetchOrders from '../../api/fetchOrders.api';


const Basket = () => {

    const popupUpdateProfile = useSelector(state => state.auth.popupUpdateProfile);
    // console.log('popupUpdateProfile : ', popupUpdateProfile);


    const [displayAllOrders, setDisplayAllOrders] = useState(false);
    const [displayMyPersonalData, setDisplayMyPersonalData] = useState(false);
    const [displayCurrentOrder, setDisplayCurrentOrder] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
        // async function fetchOrders() {
        //     const response = await axios.get(`http://localhost:8080/api/order/user/${userId}`);
        //     // console.log('response - order : ', response.data.results.find(order => order.order_status === 'En attente'));
    
        //     dispatch(currentOrderActionSave(response.data.results));
        // };
        // fetchOrders();
        // //////////////////////////////////////////////////////////////////////////////
        // console.log('basket - userId : ', userId);
    // }, [])




    const onDisplay = (setDisplay, display) => {
        setDisplay(!display);
    }


    
    const onReconnect = () => {
        dispatch(logoutUser());
        navigate('/login');
    }


    
    
    return (
        <>
            {
                popupUpdateProfile ? (

                        <div className={style.basket}>
                            <button onClick={onReconnect}>Reconnectez-vous</button>
                        </div>

                ) : (

                    <div className={style.basket}>

                        <h3 onClick={ () => {onDisplay(setDisplayMyPersonalData, displayMyPersonalData)} }>Mon profil</h3>
                        {
                            displayMyPersonalData && (
                                <MyPersonalData />
                            )
                        }



                        <h3 onClick={ () => {onDisplay(setDisplayCurrentOrder, displayCurrentOrder)} }>Mon panier</h3>
                        {
                            (displayCurrentOrder) && (
                                <CurrentOrder />
                            )
                        }
                        


                        <h3 onClick={ () => {onDisplay(setDisplayAllOrders, displayAllOrders)} }>Voir mes commandes</h3>
                        {
                            ( displayAllOrders) && (
                                <AllOrders />
                            )
                        }
                        
                        
                    </div>
                )
            }
            
        </>
    )

    
}

export default Basket;