

import authStyle from '../../pages/auth.page.module.css';
// import style from './login.module.css';

import CustomNavlink from '../../../components/custom-navlink/custom-navlink';

const RegisterPage = () => (

    <div className={authStyle['home-container']}>
        <h2>Register Works !</h2>

        <p>Déjà un compte ?</p>

        <ul className={authStyle['nav-links']}>
            <li>
                <CustomNavlink to='/login' text='Login' />
            </li>
        </ul>
    </div>

)

export default RegisterPage