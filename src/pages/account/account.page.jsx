


import style from './account.module.css';
import { useSelector } from 'react-redux';


const AccountPage = () =>  {
    
    const userFirstName = useSelector(state => state.auth.userFirstName)
    const userLastName = useSelector(state => state.auth.userLastName)

    return (
        <>
            {(!userFirstName || !userLastName) && (
                <div className={style['home-container']}>
                    <p>Patientez ...</p>
                </div>
            )}

            {(userFirstName && userLastName) && (
                <div className={style['home-container']}>
        
                    <p>Heureux de vous revoir {userFirstName} {userLastName} !</p>
                    
                </div>
            )}
        </>
    )
}

export default AccountPage