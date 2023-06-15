import { useState } from "react";
import { useSelector } from "react-redux";


import style from './basket.module.css';
import defaultAvatar from '../../assets/avatar.jpg'; 
import MyPersonalDataForm from "./my-personal-data-form";




const MyPersonalData = () => {

    const URL__API__ASTRO_PUBLIC = import.meta.env.VITE_URL__API__ASTRO_PUBLIC;


    const auth = useSelector(state => state.auth);
    // console.log(auth.userAvatar);

    // ↓ "openForm" est une variable qui permet d'afficher le formulaire lorsque l'utilisateur souhaite modifier ses données
    const [openForm, setOpenForm] = useState(false);
    

    // const [showPassword, setShowPassword] = useState('password');


    const onOpenForm = () => {
        setOpenForm(!openForm);
    }

    
    const handleSetOpenForm = () => {
        setOpenForm(!openForm);
    }

    // ////////////////////////////////////////
    // const onShowPassord = (e) => {
    //     e.preventDefault();

    //     if (showPassword === 'password') {
    //         setShowPassword('text');
    //     }
    //     else {
    //         setShowPassword('password');
    //     }
    // }
    // ////////////////////////////////////////


    if (openForm) {
        return (
            <MyPersonalDataForm onSetOpenForm={handleSetOpenForm} />
        )
    }
    else {
        return (
            <article className={style['data']}>
    
                <p>Prénom : {auth.userFirstname}</p>
                <p>Nom : {auth.userLastname}</p>
                <p>Pseudo : {auth.userPseudo}</p>
    
                <p>Avatar : </p>
                {/* TODO : ajouter l'avatar de la DB */}
                {
                    auth.userAvatar ? (<img src={`${URL__API__ASTRO_PUBLIC}${auth.userAvatar}`} alt={`Avatar de ${auth.userFirstname} ${auth.userLastname}`} />) : (<img src={defaultAvatar} alt="Avatar par défaut" />)
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
    
}

export default MyPersonalData;