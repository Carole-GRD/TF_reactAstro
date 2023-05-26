import './header.module.css';
import style from './header.module.css';

import planetLogo6 from '../../assets/planet-6.png';
// import planetLogo5 from '../../assets/planet-5.png';
// import planetLogo3 from '../../assets/planet-3.png';

import CustomNavlink from '../../components/custom-navlink/custom-navlink';
import { Link } from "react-router-dom";

import clsx from 'clsx';

import { logoutUser } from '../../store/actions/auth.action'; 
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import { orderActionClear } from '../../store/actions/order.action';

const Header = () => {

    const isConnected = useSelector(state => state.auth.isConnected);
    const currentOrder = useSelector(state => state.auth.currentOrder);
    // console.log('currentOrder : ', currentOrder);
    // console.log('currentOrder.Article_Orders.length : ', currentOrder.Article_Orders.length);
    
    let countArticlesInCurrentOrder;
    if (currentOrder) {
        // console.log('currentOrder OK');
        countArticlesInCurrentOrder = currentOrder.Article_Orders.length
        // console.log('countArticlesInCurrentOrder : ', countArticlesInCurrentOrder);
    } 
    else {
        console.log('PAS de currentOrder');
    }


    const dispatch = useDispatch();

    const onLogout = () => { 
        console.log('isConnected - onLogout : ', isConnected);
        dispatch(logoutUser()); 
        // reset(); 
        // if (isConnected) { 
        //     navigate('/account');
        // } 
        dispatch(orderActionClear());
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
                        {isConnected && (
                            <li>
                                <CustomNavlink to='/account' text='Mon compte' />
                                {
                                    countArticlesInCurrentOrder && (
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