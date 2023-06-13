import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from 'axios';


import { getUserById } from "../../store/actions/auth.action";
import style from './basket.module.css';
import { useState } from "react";



// //////////////////////////
// TODO : update 'password'
// //////////////////////////



const MyPersonalDataForm = ( { onSetOpenForm } ) => {

    // /////////////////////////////////////////////////
    // ---------------   Store   ----------------------
    // /////////////////////////////////////////////////
    const auth = useSelector(state => state.auth);
    const userId = auth.userId;


    // /////////////////////////////////////////////////
    // ---------------   State   ----------------------
    // /////////////////////////////////////////////////
    const [form, setForm] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState('password');
    const [showNewPassword, setShowNewPassword] = useState('password');
    const [showConfirmPassword, setShowConfirmPassword] = useState('password');


    // /////////////////////////////////////////////////
    // ---------------   Hooks   ----------------------
    // /////////////////////////////////////////////////
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();

    

    // /////////////////////////////////////////////////
    // -------------   Fonctions   --------------------
    // /////////////////////////////////////////////////


    const onDisplay = (setShowPassword, showPassword) => {
        //  fonction qui affiche ou cache le mot de passe (type de l'input)
        if (showPassword === 'password') {
            setShowPassword('text'); 
        }
        else {
            setShowPassword('password'); 
        }
    }


    const onValidAvatar = async (data) => {
        const file = data.avatar[0];
        console.log(file);
        
        const formData = new FormData();
        formData.append('avatar', file);
        console.log(formData);

        await axios.patch(`http://localhost:8080/api/user/${userId}/avatar`, formData);
        
        dispatch(getUserById(userId));

        onSetOpenForm();
    }



    const onValidPassword = async (data) => {
        console.log('my-personal-data-form.jsx - modification du mot de passe (data) : ', data);

        await axios.patch(`http://localhost:8080/api/user/${userId}/password`, data);
        
        onSetOpenForm();
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
        
        await axios.put(`http://localhost:8080/api/user/${userId}`, data);
        
        dispatch(getUserById(userId));
        
        onSetOpenForm();

    }



    // /////////////////////////////////////////////////
    // -----------   Render (Rendu)   ------------------
    // /////////////////////////////////////////////////
    if (form === '') {
        
        // 3 boutons qui dirigent vers l'un des 3 fomrulaires présents ci-dessous (data, avatar ou password)
        // le 4e redirige vers le composant "my-personal-data" (si l'utilisateur ne veut finalement pas faire de modifications)
        return (
                <div className={style['popup-btn']}>
                    <button onClick={() => { setForm('data') }}>Modifer mes informations personnelles</button>
                    <button onClick={() => { setForm('avatar') }}>Modifier mon avatar</button>
                    <button onClick={() => { setForm('password') }}>Modifier mon mot de passe</button>
                    <button onClick={() => { onSetOpenForm() }}>Annuler</button>
                </div>
        )

    }
    else if (form === 'avatar') {
        
        return (
            <article className={style['data']}>
        
                <form onSubmit={handleSubmit(onValidAvatar)}>
                    <div className={style['form-group']}> 
                        <label htmlFor="avatar">Avatar</label> 
                        <input id='avatar' type='file'  {...register('avatar')} /> 
                    </div> 
                    <div className={style['popup-btn']}>
                        <button type="submit">Modifier mon avatar</button>
                        <button type="button" onClick={() => { onSetOpenForm() }}>Annuler</button>
                    </div>
                </form>
                
            </article>
        )

    }
    else if (form === 'password') {

        return (
            <article className={style['data']}>
        
                <form onSubmit={handleSubmit(onValidPassword)}>
                    <div className={style['form-group']}> 
                        <label htmlFor="currentPassword">Mot de passe actuel</label>
                        <div>
                            <input id='currentPassword' type={showCurrentPassword} {...register('currentPassword')} />  
                            <button 
                                onClick={() => {onDisplay(setShowCurrentPassword, showCurrentPassword)}}
                                type="button">
                                    Voir
                            </button> 
                        </div>
                    </div> 
                    <div className={style['form-group']}> 
                        <label htmlFor="newPassword">Nouveau mot de passe</label> 
                        <div>
                            <input id='newPassword' type={showNewPassword} {...register('newPassword')} /> 
                            <button 
                                onClick={() => {onDisplay(setShowNewPassword, showNewPassword)}}
                                type="button">
                                    Voir
                            </button> 
                        </div>
                    </div> 
                    <div className={style['form-group']}> 
                        <label htmlFor="confirmPassword">Confirmation du nouveau mot de passe</label> 
                        <div>
                            <input id='confirmPassword' type={showConfirmPassword} {...register('confirmPassword')} /> 
                            <button 
                                onClick={() => {onDisplay(setShowConfirmPassword, showConfirmPassword)}}
                                type="button">
                                    Voir
                            </button> 
                        </div>
                    </div> 
                    <div className={style['popup-btn']}>
                        <button type="submit">Modifier mon mot de passe</button>
                        <button type="button" onClick={() => { onSetOpenForm() }}>Annuler</button>
                    </div>
                </form>
                
            </article>
        )

    }
    else if (form === 'data') {

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
                    <div className={style['popup-btn']}>
                        <button type="submit">Modifier mes informations personnelles</button>
                        <button type="button" onClick={() => { onSetOpenForm() }}>Annuler</button>
                    </div>
                </form>
                
            </article>
        )

    }
 
}


export default MyPersonalDataForm;