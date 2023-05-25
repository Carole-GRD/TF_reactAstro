


import style from './account.module.css';
import { useSelector } from 'react-redux';
import Basket from '../../containers/basket/basket';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentOrderActionSave } from '../../store/actions/order.action';


const AccountPage = () =>  {
    
    const userFirstname = useSelector(state => state.auth.userFirstname);
    const userLastname = useSelector(state => state.auth.userLastname);
    const userId = useSelector(state => state.auth.userId);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log('account.page - userId : ', userId);
        if (!userFirstname || !userLastname) {
            navigate('/login');    
        }
        console.log('account.page - useEffect (userId) : ', userId);
        dispatch(currentOrderActionSave(userId));

    }, []); 

    return (
        <>  
            {(userFirstname && userLastname) && (
                <div className={style['home-container']}>
        
                    <h2>Heureux de vous revoir {userFirstname} {userLastname} !</h2>

                    <Basket userId={userId} />
                    
                </div>
            )}
        </>
    )
}

export default AccountPage