


import style from './account.module.css';
import { useSelector } from 'react-redux';
import Basket from '../../containers/basket/basket';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const AccountPage = () =>  {
    
    const userFirstname = useSelector(state => state.auth.userFirstname);
    const userLastname = useSelector(state => state.auth.userLastname);

    const navigate = useNavigate();

    useEffect(() => {
        if (!userFirstname || !userLastname) {
            navigate('/login');    
            }
    }, []); 

    return (
        <>  
            {(userFirstname && userLastname) && (
                <div className={style['home-container']}>
        
                    <h2>Heureux de vous revoir {userFirstname} {userLastname} !</h2>

                    <Basket />
                    
                </div>
            )}
        </>
    )
}

export default AccountPage