


import style from './account.module.css';
import { useSelector } from 'react-redux';


const AccountPage = () =>  {
    
    const userFirstname = useSelector(state => state.auth.userFirstname)
    const userLastname = useSelector(state => state.auth.userLastname)

    return (
        <>
            {(!userFirstname || !userLastname) && (
                <div className={style['home-container']}>
                    <p>Patientez ...</p>
                </div>
            )}

            {(userFirstname && userLastname) && (
                <div className={style['home-container']}>
        
                    <p>Heureux de vous revoir {userFirstname} {userLastname} !</p>
                    
                </div>
            )}
        </>
    )
}

export default AccountPage