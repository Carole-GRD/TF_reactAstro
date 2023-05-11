
import authStyle from '../../pages/auth.page.module.css';
// import style from './login.module.css';

import CustomNavLink from '../../../components/custom-navlink/custom-navlink';

const LoginPage = () => (

    <div className={authStyle['home-container']}>
        <h2>Login Works !</h2>


        <p>Pas encore de compte ?</p>
        
        <ul className={authStyle['nav-links']}>
            <li>
                <CustomNavLink to='/register' text='Créer un compte' />
            </li>
        </ul>
    </div>

)

export default LoginPage