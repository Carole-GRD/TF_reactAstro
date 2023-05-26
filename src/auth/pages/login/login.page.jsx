import { loginUser } from '../../../store/actions/auth.action'; 
// import { currentOrderActionSave } from '../../../store/actions/order.action';
import { useForm } from 'react-hook-form'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react'; 
import { useState } from 'react';


import authStyle from '../../pages/auth.page.module.css';
// import style from './login.module.css';
import clsx from 'clsx';


const AuthNavlink = ({ to, text }) => (
    <NavLink to={to} className={({ isActive }) => isActive ? authStyle['active-link'] : ''}>
        {text}
    </NavLink>
)



const LoginPage = () => { 
    const { handleSubmit, register, reset } = useForm(); 
    const dispatch = useDispatch(); 
    const isConnected = useSelector(state => state.auth.isConnected); 
    const userId = useSelector(state => state.auth.userId); 
    const errorMsg = useSelector(state => state.auth.errorMsg); 
    const navigate = useNavigate(); 

    const [buttonText, setButtonText] = useState('Connexion');

    
    useEffect(() => { 
        if (isConnected) { 
            console.log('isConnected : ', isConnected);
            // dispatch(currentOrderActionSave(userId));
            navigate('/account'); 
        } 
    }, [isConnected, navigate]) 
    
    

    const onLogin = async (data) => {

        setButtonText('Chargement...');
        dispatch(loginUser(data));
        reset();

        // navigate('/account');
      };
    
    
    return (
        <> 
            
            <div className={clsx(authStyle['home-container'], authStyle['form-login'])}>

                <div className={authStyle['form-container']}>

                    <ul className={authStyle['nav-links']}>
                        <li>
                            <AuthNavlink to='/login' text='Login' />
                        </li>
                        <li>
                            <AuthNavlink to='/register' text='Sign up' />
                        </li>
                    </ul>
                    
                    <form onSubmit={handleSubmit(onLogin)}> 
                        <div className={authStyle['form-group']}> 
                            <label htmlFor="credential">Pseudo ou email</label> 
                            <input id='credential' type='text' placeholder='Pseudo ou email' {...register('credential')} /> 
                        </div> 
                        <div className={authStyle['form-group']}> 
                            <label htmlFor="password">Mot de passe</label> 
                            <input id='password' type='password' placeholder='Mot de passe' {...register('password')} /> 
                        </div> 
                        <div className={authStyle.btn}> 
                            <button type='submit'>{buttonText}</button> 
                        </div> 
                        {/* <div>
                            {loading && (<p>Chargement...</p>)}
                        </div> */}
                        <div>
                            {errorMsg && (<p>{errorMsg}</p>)} 
                        </div>
                    </form> 
                
                </div>
                
            </div> 
            
        </>
    ); 

}; 
    

export default LoginPage;