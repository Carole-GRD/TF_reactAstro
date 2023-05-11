

import authStyle from '../../pages/auth.page.module.css';
// import style from './login.module.css';

import CustomNavLink from '../../../components/custom-navlink/custom-navlink';

const RegisterPage = () => (

    <div className={authStyle['home-container']}>
        <h2>Register Works !</h2>

        <p>Déjà un compte ?</p>

        <ul className={authStyle['nav-links']}>
            <li>
                <CustomNavLink to='/login' text='Se connecter' />
            </li>
        </ul>
    </div>

)

export default RegisterPage