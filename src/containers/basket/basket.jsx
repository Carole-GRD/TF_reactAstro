
import { useState } from "react";

import AllOrders from "./all-orders";
import CurrentOrder from "./current-order";
import MyPersonalData from "./my-personal-data";


import style from './basket.module.css';



const Basket = () => {

    const [displayAllOrders, setDisplayAllOrders] = useState(false);
    const [displayMyPersonalData, setDisplayMyPersonalData] = useState(false);
    const [displayCurrentOrder, setDisplayCurrentOrder] = useState(false);

    const onDisplay = (setDisplay, display) => {
        setDisplay(!display);
    }
    
    return (

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

export default Basket;