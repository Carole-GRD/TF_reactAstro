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

    const auth = useSelector(state => state.auth);
    const userId = auth.userId;

    const [form, setForm] = useState('');

    const dispatch = useDispatch();

    const { register, handleSubmit, reset } = useForm();




    const onValidAvatar = async (data) => {
        console.log('avatar validé'); 
        const file = data.avatar[0];
        console.log(file);
        
        const formData = new FormData();
        formData.append('avatar', file);
        console.log(formData);

        await axios.patch(`http://localhost:8080/api/user/${userId}/avatar`, formData);
        
        dispatch(getUserById(userId));

        onSetOpenForm();
    }




    const onValidPassword = () => {
        console.log('mot de passe validé');
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



    if (form === '') {

        return (
            <section className={style['article']}>

                <div className={style['popup-btn']}>
                    <button onClick={() => { setForm('data') }}>Modifer vos données</button>
                    <button onClick={() => { setForm('avatar'); console.log('modifier l\'avatar'); }}>Modifier votre avatar</button>
                    <button onClick={() => { setForm('password'); console.log('modifier le mot de passe'); }}>Modifier votre mot de passe</button>
                    <button onClick={() => { onSetOpenForm() }}>Annuler</button>
                </div>

            </section>
        )

    }
    else if (form === 'avatar') {
        
        return (
            <article className={style['data']}>
        
                <form onSubmit={handleSubmit(onValidAvatar)}>
                    <div className={style['form-group']}> 
                        <label htmlFor="avatar">Avatar</label> 
                        {/* <input id='avatar' type='text' placeholder='Avatar' {...register('avatar')} />  */}
                        <input id='avatar' type='file'  {...register('avatar')} /> 
                        {/* <input id="avatar" type="file" onChange={e.target.value} /> */}
                    </div> 
                    <button type="submit">Valider</button>
                </form>
                
            </article>
        )

    }
    else if (form === 'password') {

        return (
            <article className={style['data']}>
        
                <form onSubmit={handleSubmit(onValidPassword)}>
                    <div className={style['form-group']}> 
                        <label htmlFor="avatar">Mot de passe</label> 
                        <input id='password' type='text' placeholder='Mot de passe' {...register('password')} /> 
                    </div> 
                    <button type="submit">Valider</button>
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
    
                    <button type="submit">Valider</button>
    
                </form>
                
            </article>
        )

    }
 
}


export default MyPersonalDataForm;