import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from 'axios';


import style from './basket.module.css';


import defaultAvatar from '../../assets/avatar.jpg'; 
import { useNavigate } from "react-router-dom";
import { logoutUser, popupUpdateUser } from "../../store/actions/auth.action";
import { useDispatch } from "react-redux";




const MyPersonalData = () => {

    const { register, handleSubmit, reset } = useForm();

    const navigate= useNavigate();
    const dispatch = useDispatch();

    const isConnected = useSelector(state => state.auth.isConnected);
    const auth = useSelector(state => state.auth);
    // console.log(auth);
    const userId = auth.userId;
    // console.log(userId);

    // ↓ "openForm" est une variable qui permet d'afficher le formulaire lorsque l'utilisateur souhaite modifier ses données
    const [openForm, setOpenForm] = useState(false);
    



    // const [showPassword, setShowPassword] = useState('password');


    const onOpenForm = () => {
        setOpenForm(!openForm);
    }
    const onValidForm = async (data) => {

        if (data.firstname === '') {
            data.firstname = auth.userFirstname;
        }
        if (data.lastname === '') {
            data.lastname = auth.userLastname;
        }
        if (data.pseudo === '') {
            data.pseudo = auth.userPseudo;
        }
        // if (data.avatar === '') {
        //     data.avatar = auth.auth.avatar;
        // }
        // if (data.password === '') {
        //     data.password = auth.auth.password;
        // }
        if (data.email === '') {
            data.email = auth.userEmail;
        }
        if (data.address_street === '') {
            data.address_street = auth.userAddressStreet;
        }
        if (data.address_number === '') {
            data.address_number = auth.userAddressNumber;
        }
        if (data.address_city === '') {
            data.address_city = auth.userAddressCity;
        }
        if (data.address_postalCode === '') {
            data.address_postalCode = auth.userAddressPostalCode;
        }
        if (data.address_country === '') {
            data.address_country = auth.userAddressCountry;
        }
        
        console.log(data);

        // const newData = {
        //     firstname : data.firstname,
        //     lastname : data.lastname
        // }

        // console.log(newData);
        
        axios.put(`http://localhost:8080/api/user/${userId}`, data);
        
        reset();
        
        dispatch(popupUpdateUser());

        navigate('/account');
    }





    // const onShowPassord = (e) => {
    //     e.preventDefault();

    //     if (showPassword === 'password') {
    //         setShowPassword('text');
    //     }
    //     else {
    //         setShowPassword('password');
    //     }
    // }


    // TODO : créer des composants pour my-personal-data (formulaire (+ données ?) )
    // TODO : créer des composants pour article-detail (popup (+ détails ?) )


    if (isConnected && !openForm) {
        return (
            <article className={style['data']}>
    
                <p>Prénom : {auth.userFirstname}</p>
                <p>Nom : {auth.userLastname}</p>
                <p>Pseudo : {auth.userPseudo}</p>
    
                <p>Avatar : </p>
                {/* TODO : ajouter l'avatar de la DB */}
                {
                    auth.avatar ? (<img src="" alt="" />) : (<img src={defaultAvatar} alt="Avatar par défaut" />)
                }
    
                <p>Email : {auth.userEmail}</p>
                <p>Rue : {auth.userAddressStreet}</p>
                <p>Numéro : {auth.userAddressNumber}</p>
                <p>Ville : {auth.userAddressCity}</p>
                <p>Code postal : {auth.userAddressPostalCode}</p>
                <p>Pays : {auth.userAddressCountry}</p>
                
                <button onClick={onOpenForm}>Mettre à jour</button>
             </article>
        )
    }
    else if (isConnected && openForm) {
        return (
            <article className={style['data']}>
    
                <form onSubmit={handleSubmit(onValidForm)}>
                    <div className={style['form-group']}> 
                        <label htmlFor="firstname">Prénom</label> 
                        <input id='firstname' type='text' placeholder={auth.userFirstname} {...register('firstname')} /> 
                    </div> 
                    <div className={style['form-group']}> 
                        <label htmlFor="lastname">Nom</label> 
                        <input id='lastname' type='text' placeholder={auth.userLastname} {...register('lastname')} /> 
                    </div> 
                    <div className={style['form-group']}> 
                        <label htmlFor="pseudo">Pseudo</label> 
                        <input id='pseudo' type='text' placeholder={auth.userPseudo} {...register('pseudo')} /> 
                    </div> 
                    <div className={style['form-group']}> 
                        <label htmlFor="email">Email</label> 
                        <input id='email' type='email' placeholder={auth.userEmail} {...register('email')} /> 
                    </div> 
                    {/* <div className={style['form-group']}> 
                        <label htmlFor="avatar">Avatar</label> 
                        <input id='avatar' type='avatar' placeholder='Avatar' {...register('avatar')} /> 
                    </div>  */}
                    {/* <div className={style['form-group']}> 
                        <label htmlFor="password">Mot de passe</label> 
                        <input id='password' type={showPassword} placeholder='Mot de passe' {...register('password')} /> 
                        <button onClick={onShowPassord}>Voir</button>
                    </div>  */}
                    <div className={style['form-group']}> 
                        <label htmlFor="street">Rue</label> 
                        <input id='street' type='text' placeholder={auth.userAddressStreet} {...register('address_street')} /> 
                    </div> 
                    <div className={style['form-group']}> 
                        <label htmlFor="number">Numéro</label> 
                        <input id='number' type='text' placeholder={auth.userAddressNumber} {...register('address_number')} /> 
                    </div> 
                    <div className={style['form-group']}> 
                        <label htmlFor="city">Localité</label> 
                        <input id='city' type='text' placeholder={auth.userAddressCity} {...register('address_city')} /> 
                    </div> 
                    <div className={style['form-group']}> 
                        <label htmlFor="postalCode">Code postal</label> 
                        <input id='postalCode' type='text' placeholder={auth.userAddressPostalCode} {...register('address_postalCode')} /> 
                    </div> 
                    <div className={style['form-group']}> 
                        <label htmlFor="country">Pays</label> 
                        <input id='country' type='text' placeholder={auth.userAddressCountry} {...register('address_country')} /> 
                    </div> 

                    <button type="submit">Valider</button>

                </form>
                
             </article>
        )
    }
   

    
}

export default MyPersonalData;