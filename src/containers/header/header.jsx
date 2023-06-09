import './header.module.css';
import style from './header.module.css';


import planetLogo6 from '../../assets/planet-6.png';


import CustomNavlink from '../../components/custom-navlink/custom-navlink';
import { Link } from "react-router-dom";

import clsx from 'clsx';

import { autoAuthenticate, logoutUser } from '../../store/actions/auth.action'; 
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { currentOrderActionClear, currentOrderActionSave } from '../../store/actions/order.action';
import { useEffect } from 'react';

const Header = () => {

    const isConnected = useSelector(state => state.auth.isConnected);
    const currentOrder = useSelector(state => state.order.currentOrder);

    const countArticlesInCurrentOrder = useSelector(state => state.order.currentOrder?.Article_Orders.length);
    // console.log('countArticlesInCurrentOrder : ', countArticlesInCurrentOrder);


    const dispatch = useDispatch();


    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        // Si le token est stocké dans le Local Storage
        if (storedToken) {
            // On reconnecte l'utilisateur 
            dispatch(autoAuthenticate(storedToken));
            // On récupère les infos sur ses commandes
            dispatch(currentOrderActionSave());   
        }
    }, [])

    

    const onLogout = () => { 
        // console.log('isConnected - onLogout : ', isConnected);
        dispatch(logoutUser()); 
        // reset(); 
        // if (isConnected) { 
        //     navigate('/account');
        // } 
        dispatch(currentOrderActionClear());
    } 

    return (
        <header>
            <div>
                <img src={planetLogo6} className={style['logo-invert']} alt={"Planet5 logo"} />
            </div>
            
            {/* navigation for the website */}
            <div>
                <nav>
                    <ul className={style['nav-links']}>
                        <li>
                            <CustomNavlink to='/' text='Accueil' />
                        </li>
                        <li>
                            <CustomNavlink to='/articles' text='Articles' />
                        </li>
                        {
                            isConnected && (
                                <li>
                                    <CustomNavlink to='/account' text='Mon compte' />
                                    {
                                        (currentOrder && countArticlesInCurrentOrder !== 0) && (
                                            <div className={style['count-display']}><p>{countArticlesInCurrentOrder}</p></div>
                                        )
                                    }
                                </li>
                        )}
                    </ul>
                </nav>
            </div>
            
            {/* navigation for authentication */}
            <div>
                <nav>
                    <ul className={clsx(style['nav-links'], style['auth-links'])}>

                        {!isConnected && (
                            <li>
                                <Link to='/login'>Login</Link>
                                {/* <CustomNavlink to='/login' text='Login' /> */}
                            </li>
                        )}

                        {isConnected && (
                            <li>
                                <Link to='/articles' onClick={onLogout}>Logout</Link>
                                {/* <CustomNavlink to='/articles' text='Logout' /> */}
                            </li>
                        )}

                    </ul>
                </nav>
            </div>

        </header>
    )
}

export default Header