import { registerUser } from '../../../store/actions/auth.action'; 
import { useForm } from 'react-hook-form'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import { NavLink } from 'react-router-dom';
// import { useEffect } from 'react'; 


import authStyle from '../../pages/auth.page.module.css';
// import style from './login.module.css';
import clsx from 'clsx';
import { useState } from 'react';


const AuthNavlink = ({ to, text }) => (
    <NavLink to={to} className={({ isActive }) => isActive ? authStyle['active-link'] : ''}>
        {text}
    </NavLink>
)



const RegisterPage = () => { 

    const { handleSubmit, register, reset } = useForm(); 

    const dispatch = useDispatch(); 
    // const isConnected = useSelector(state => state.auth.isConnected); 
    const errorMsg = useSelector(state => state.auth.errorMsg); 
    const navigate = useNavigate(); 

    const [showPassword, setShowPassword] = useState('password');

    // ↓ Pas d'intérêt ca mon bouton "Login" disparait lorsque l'utilisateur est connecté
    // useEffect(() => { 
    //     if (isConnected) { navigate('/account'); } 
    // }, [isConnected, navigate]) 
    

    const onRegister = (data) => { 
        dispatch(registerUser(data)); 
        reset(); 
        navigate('/account');
    } 


    const onDisplay = () => {
        //  fonction qui affiche ou cache le mot de passe (type de l'input)
        if (showPassword === 'password') {
            setShowPassword('text'); 
        }
        else {
            setShowPassword('password'); 
        }
    }
    

    return (
        <> 
            
            <div className={clsx(authStyle['home-container'], authStyle['form-register'])}>

                <div className={authStyle['form-container']}>

                    <ul className={authStyle['nav-links']}>
                        <li>
                            <AuthNavlink to='/login' text='Login' />
                        </li>
                        <li>
                            <AuthNavlink to='/register' text='Sign up' />
                        </li>
                    </ul>
                    
                    <form onSubmit={handleSubmit(onRegister)}> 

                        <section>

                            <article>

                                <div className={authStyle['form-group']}> 
                                    <label htmlFor="firstname">Prénom</label> 
                                    <input id='firstname' type='text' placeholder='Prénom' {...register('firstname')} /> 
                                </div> 
                                <div className={authStyle['form-group']}> 
                                    <label htmlFor="lastname">Nom</label> 
                                    <input id='lastname' type='text' placeholder='Nom' {...register('lastname')} /> 
                                </div> 
                                <div className={authStyle['form-group']}> 
                                    <label htmlFor="pseudo">Pseudo</label> 
                                    <input id='pseudo' type='text' placeholder='Pseudo' {...register('pseudo')} /> 
                                </div> 
                                <div className={authStyle['form-group']}> 
                                    <label htmlFor="email">Email</label> 
                                    <input id='email' type='email' placeholder='Email' {...register('email')} /> 
                                </div> 
                                <div className={authStyle['form-group']}> 
                                    <label htmlFor="password">Mot de passe</label> 
                                    <div className={authStyle['register-pwd']}>
                                        <input id='password' type={showPassword} placeholder='Mot de passe' {...register('password')} /> 
                                        <button type="button" onClick={onDisplay}>Voir</button>
                                    </div>
                                </div> 

                            </article>

                            <article>

                                {/* <p>Adresse :</p> */}

                                <div className={authStyle['form-group']}> 
                                    <label htmlFor="street">Rue</label> 
                                    <input id='street' type='text' placeholder='Rue' {...register('address_street')} /> 
                                </div> 
                                <div className={authStyle['form-group']}> 
                                    <label htmlFor="number">Numéro</label> 
                                    <input id='number' type='text' placeholder='Numéro' {...register('address_number')} /> 
                                </div> 
                                <div className={authStyle['form-group']}> 
                                    <label htmlFor="city">Localité</label> 
                                    <input id='city' type='text' placeholder='Localité' {...register('address_city')} /> 
                                </div> 
                                <div className={authStyle['form-group']}> 
                                    <label htmlFor="postalCode">Code postal</label> 
                                    <input id='postalCode' type='text' placeholder='Code postal' {...register('address_postalCode')} /> 
                                </div> 
                                <div className={authStyle['form-group']}> 
                                    <label htmlFor="country">Pays</label> 
                                    <input id='country' type='text' placeholder='Pays' {...register('address_country')} /> 
                                </div> 

                            </article>

                        </section>
                        
                        <div className={authStyle.btn}>  
                            <button type='submit'>Connexion</button> 
                        </div> 

                        <div>
                            {errorMsg && (<p>{errorMsg}</p>)} 
                        </div>

                    </form> 
                
                </div>
                
            </div> 
            
        </>
    ); 

}; 
    

export default RegisterPage;